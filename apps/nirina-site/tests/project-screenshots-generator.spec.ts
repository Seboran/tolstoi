import { promises as fs } from 'fs'
import path from 'path'
import { test } from '@playwright/test'

// Define interfaces for our data structures
interface ProjectInfo {
  title: string
  url: string
  screenshotPath: string
}

interface ProjectMapping {
  [filename: string]: ProjectInfo
}

// This script will use a direct approach to generate screenshots for your projects

test.skip('Generate project screenshots for use in ProjetCard', async ({ page }) => {
  // Ensure we're working with the correct app path
  const appDir = path.join(process.cwd(), 'apps/nirina-site')

  // Path to save screenshots - this will be accessible from your components
  const screenshotsDir = path.join(appDir, 'public/images/project-screenshots')
  await fs.mkdir(screenshotsDir, { recursive: true })

  // Create a mapping file to help update your markdown files
  const mappingFilePath = path.join(appDir, 'project-screenshots-mapping.json')
  const mapping: ProjectMapping = {}

  // Read all project markdown files directly - fixing the path
  const projectsDir = path.join(appDir, 'src/content/projects')
  console.log(`Looking for project files in: ${projectsDir}`)

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

      // Fix: Preserve accented characters while still making a valid filename
      // Only replace spaces and special punctuation characters with hyphens
      const screenshotFilename = `${title
        .toLowerCase()
        .normalize('NFD') // Normalize to separate base characters and diacritics where possible
        .replace(/[\s\(\)\[\]\{\}\.\,\;\:\'\"\!\?\@\#\$\%\^\&\*\=\+\\\/\<\>\|]+/g, '-') // Replace spaces and special chars with hyphens
        .replace(/\-+/g, '-') // Replace multiple hyphens with a single one
        .replace(/^\-|\-$/g, '')}.png` // Remove leading and trailing hyphens

      const screenshotPath = path.join(screenshotsDir, screenshotFilename)
      const screenshotRelativePath = `/images/project-screenshots/${screenshotFilename}`

      // Add to our mapping
      mapping[file] = {
        title,
        url,
        screenshotPath: screenshotRelativePath,
      }

      console.log(`Processing ${title}: ${url}`)
      console.log(`Screenshot will be saved as: ${screenshotFilename}`)

      try {
        // Navigate to the URL and take a screenshot - using the clean URL directly
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
      } catch (error: unknown) {
        console.error(
          `❌ Error capturing screenshot for ${url}:`,
          error instanceof Error ? error.message : String(error),
        )
      }
    }

    // Save the mapping file
    await fs.writeFile(mappingFilePath, JSON.stringify(mapping, null, 2))
    console.log(`Mapping file saved to: ${mappingFilePath}`)

    // Generate a helper script for updating markdown files
    const helperScriptPath = path.join(appDir, 'update-screenshot-paths.mjs')
    await fs.writeFile(
      helperScriptPath,
      `
  // Helper script to update screenshot paths in your markdown files
  import { promises as fs } from 'fs';
  import path from 'path';

  async function updateScreenshotPaths() {
    const mapping = JSON.parse(await fs.readFile('./project-screenshots-mapping.json', 'utf-8'));
    
    for (const [filename, data] of Object.entries(mapping)) {
      const filePath = path.join('./src/content/projects', filename);
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Check if screenshot field already exists
      if (content.includes('screenshot:')) {
        // Update the existing field
        content = content.replace(
          /screenshot:\s*(.+)/,
          \`screenshot: "\${data.screenshotPath}"\`
        );
      } else {
        // Add the screenshot field before the closing --- of frontmatter
        content = content.replace(
          /---/,
          \`---\\nscreenshot: "\${data.screenshotPath}"\`
        );
      }
      
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(\`Updated \${filename}\`);
    }
    
    console.log('All project files updated with screenshot paths!');
  }

  updateScreenshotPaths().catch(console.error);
    `,
    )

    console.log(`
  Screenshot generation complete! 
  ${Object.keys(mapping).length} projects processed.

  To update your markdown files with the screenshot paths, run:
  node ${helperScriptPath}
    `)
  } catch (error: unknown) {
    console.error(
      `Error reading project directory: ${error instanceof Error ? error.message : String(error)}`,
    )
    console.error(`Make sure the directory exists: ${projectsDir}`)
  }
})
