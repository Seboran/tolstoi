import { promises as fs } from 'fs'
import path from 'path'
import type { Page } from '@playwright/test'

// Define interfaces for our data structures
export interface ProjectInfo {
  title: string
  url: string
  screenshotPath: string
}

export interface ProjectMapping {
  [filename: string]: ProjectInfo
}

/**
 * Removes accents and diacritics from a string and formats it for filenames
 */
export function formatFilename(str: string): string {
  return (
    str
      .normalize('NFD')
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: We want to remove all diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove all accent marks
      .replace(/[^\w\s-]/g, '-') // Replace special characters with hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single one
      .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
      .toLowerCase()
  )
}

/**
 * Reads project markdown files and extracts title and URL information
 */
export async function getProjectsInfo(projectsDir: string): Promise<ProjectMapping> {
  const mapping: ProjectMapping = {}

  try {
    const files = await fs.readdir(projectsDir)
    console.log(`Found ${files.length} files in the projects directory`)

    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue

      const filePath = path.join(projectsDir, file)
      const content = await fs.readFile(filePath, 'utf-8')

      // Parse the frontmatter
      const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/)
      if (!frontmatterMatch || !frontmatterMatch[1]) continue

      const frontmatter = frontmatterMatch[1]

      // Extract the needed properties
      const urlMatch = frontmatter.match(/url:\s*["']?([^"'\n]+)["']?/)
      const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/)

      if (!urlMatch) continue

      // Extract the URL without quotes
      const url = urlMatch[1].trim()
      const title = titleMatch ? titleMatch[1].trim() : path.basename(file, path.extname(file))

      // Generate filename without accents
      const screenshotFilename = `${formatFilename(title)}.png`
      const screenshotRelativePath = `/images/project-screenshots/${screenshotFilename}`

      // Add to our mapping
      mapping[file] = {
        title,
        url,
        screenshotPath: screenshotRelativePath,
      }
    }

    return mapping
  } catch (error) {
    console.error(
      `Error reading project directory: ${error instanceof Error ? error.message : String(error)}`,
    )
    console.error(`Make sure the directory exists: ${projectsDir}`)
    return {}
  }
}

/**
 * Takes a screenshot of a project website
 */
export async function takeProjectScreenshot(
  page: Page,
  url: string,
  screenshotPath: string,
): Promise<boolean> {
  try {
    await page.goto(url, {
      timeout: 60000,
      waitUntil: 'networkidle',
    })

    // Set viewport size for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 })

    // Take the screenshot
    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
    })

    console.log(`✅ Screenshot saved: ${screenshotPath}`)
    return true
  } catch (error) {
    console.error(
      `❌ Error capturing screenshot for ${url}:`,
      error instanceof Error ? error.message : String(error),
    )
    return false
  }
}

/**
 * Updates a markdown file with the screenshot path
 */
export async function updateMarkdownFile(filePath: string, screenshotPath: string): Promise<void> {
  let content = await fs.readFile(filePath, 'utf-8')

  // Check if screenshot field already exists
  if (content.includes('screenshot:')) {
    // Update the existing field
    content = content.replace(/screenshot:\s*(.+)/, `screenshot: "${screenshotPath}"`)
  } else {
    // Add the screenshot field before the closing --- of frontmatter
    content = content.replace(/---/, `---\nscreenshot: "${screenshotPath}"`)
  }

  await fs.writeFile(filePath, content, 'utf-8')
}
