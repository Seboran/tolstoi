// Helper script to update screenshot paths in your markdown files
import { promises as fs } from 'fs'
import path from 'path'

/**
 * Removes accents and diacritics from a string
 * @param {string} str - The string to remove accents from
 * @returns {string} - The string without accents
 */
function removeAccents(str) {
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

async function updateScreenshotPaths() {
  try {
    // Ensure we're in the right directory
    const appDir = process.cwd()
    const mappingPath = path.join(appDir, 'project-screenshots-mapping.json')

    // Check if mapping file exists
    try {
      await fs.access(mappingPath)
    } catch (_error) {
      console.error(`Mapping file not found at: ${mappingPath}`)
      console.error('Make sure to run the screenshot generation script first')
      process.exit(1)
    }

    const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf-8'))

    for (const [filename, data] of Object.entries(mapping)) {
      const filePath = path.join(appDir, 'src/content/projects', filename)

      try {
        let content = await fs.readFile(filePath, 'utf-8')

        // Extract the title from the data
        const { title } = data

        // Generate screenshot filename without accents
        const noAccentFilename = `${removeAccents(title)}.png`
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
      } catch (error) {
        console.error(`Error updating ${filename}: ${error.message}`)
      }
    }

    console.log('All project files updated with screenshot paths!')
  } catch (error) {
    console.error(`Error in update script: ${error.message}`)
  }
}

// Execute the function
updateScreenshotPaths().catch((error) => {
  console.error('Failed to update screenshot paths:', error)
  process.exit(1)
})
