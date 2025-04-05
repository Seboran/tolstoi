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

/**
 * Removes accents and diacritics from a string
 * @param str - The string to remove accents from
 * @returns The string without accents
 */
function removeAccents(str: string): string {
  return (
    str
      .normalize('NFD') // Normalize to decomposed form
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: We want to remove all diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove all accent marks
      .replace(/[^\w\s-]/g, '-') // Replace special characters with hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single one
      .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
      .toLowerCase()
  )
}

// This script will use a direct approach to generate screenshots for your projects

test('Generate project screenshots for use in ProjetCard', async ({ page }) => {
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

      // Generate filename without accents
      const screenshotFilename = `${removeAccents(title)}.png`

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

    // Copy the updated screenshot helper script to the app directory
    const fixedScriptContent = `
// Helper script to update screenshot paths in your markdown files
import { promises as fs } from 'fs'
import path from 'path'

/**
 * Removes accents and diacritics from a string
 * @param {string} str - The string to remove accents from
 * @returns {string} - The string without accents
 */
function removeAccents(str) {
  return str
    .normalize('NFD')                // Normalize to decomposed form
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: We want to remove all diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove all accent marks
    .replace(/[^\\w\\s-]/g, '-')       // Replace special characters with hyphens
    .replace(/\\s+/g, '-')            // Replace spaces with hyphens
    .replace(/-+/g, '-')             // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, '')         // Remove leading and trailing hyphens
    .toLowerCase();
}

async function updateScreenshotPaths() {
  try {
    // Ensure we're in the right directory
    const appDir = process.cwd();
    const mappingPath = path.join(appDir, 'project-screenshots-mapping.json');
    
    // Check if mapping file exists
    try {
      await fs.access(mappingPath);
    } catch (error) {
      console.error(\`Mapping file not found at: \${mappingPath}\`);
      console.error('Make sure to run the screenshot generation script first');
      process.exit(1);
    }
    
    const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf-8'));
    
    for (const [filename, data] of Object.entries(mapping)) {
      const filePath = path.join(appDir, 'src/content/projects', filename);
      
      try {
        let content = await fs.readFile(filePath, 'utf-8');
        
        // Extract the title from the data
        const { title } = data;
        
        // Generate screenshot filename without accents
        const noAccentFilename = \`\${removeAccents(title)}.png\`;
        const screenshotPath = \`/images/project-screenshots/\${noAccentFilename}\`;
        
        // Check if screenshot field already exists
        if (content.includes('screenshot:')) {
          // Update the existing field
          content = content.replace(
            /screenshot:\\s*(.+)/,
            \`screenshot: "\${screenshotPath}"\`
          );
        } else {
          // Add the screenshot field before the closing --- of frontmatter
          content = content.replace(
            /---/,
            \`---\\nscreenshot: "\${screenshotPath}"\`
          );
        }
        
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(\`Updated \${filename} with screenshot path: \${screenshotPath}\`);
      } catch (error) {
        console.error(\`Error updating \${filename}: \${error.message}\`);
      }
    }
    
    console.log('All project files updated with screenshot paths!');
  } catch (error) {
    console.error(\`Error in update script: \${error.message}\`);
  }
}

// Execute the function
updateScreenshotPaths().catch(error => {
  console.error('Failed to update screenshot paths:', error);
  process.exit(1);
});
`

    const helperScriptPath = path.join(appDir, 'update-screenshot-paths.mjs')
    await fs.writeFile(helperScriptPath, fixedScriptContent)

    console.log(`
Screenshot generation complete! 
${Object.keys(mapping).length} projects processed.

To update your markdown files with the screenshot paths, run:
node ${helperScriptPath}
    `)

    // Now also directly update the markdown files with the new screenshot paths
    console.log('Automatically updating markdown files with screenshot paths...')

    for (const [filename, data] of Object.entries(mapping)) {
      const filePath = path.join(projectsDir, filename)
      let content = await fs.readFile(filePath, 'utf-8')

      // Generate screenshot filename without accents
      const noAccentFilename = `${removeAccents(data.title)}.png`
      const screenshotPath = `/images/project-screenshots/${noAccentFilename}`

      // Check if screenshot field already exists
      if (content.includes('screenshot:')) {
        // Update the existing field
        content = content.replace(/screenshot:\s*(.+)/, `screenshot: "${screenshotPath}"`)
      } else {
        // Add the screenshot field before the closing --- of frontmatter
        content = content.replace(/---/, `---\nscreenshot: "${screenshotPath}"`)
      }

      await fs.writeFile(filePath, content, 'utf-8')
      console.log(`Updated ${filename} with screenshot path: ${screenshotPath}`)
    }

    console.log(
      '✅ All markdown files have been automatically updated with proper screenshot paths!',
    )
  } catch (error: unknown) {
    console.error(
      `Error reading project directory: ${error instanceof Error ? error.message : String(error)}`,
    )
    console.error(`Make sure the directory exists: ${projectsDir}`)
  }
})
