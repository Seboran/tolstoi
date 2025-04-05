// Helper script to update screenshot paths in your markdown files
import { promises as fs } from 'fs'
import path from 'path'

async function updateScreenshotPaths() {
  const mapping = JSON.parse(await fs.readFile('./project-screenshots-mapping.json', 'utf-8'))

  for (const [filename, data] of Object.entries(mapping)) {
    const filePath = path.join('./src/content/projects', filename)
    let content = await fs.readFile(filePath, 'utf-8')

    // Check if screenshot field already exists
    if (content.includes('screenshot:')) {
      // Update the existing field
      content = content.replace(/screenshot:s*(.+)/, `screenshot: "${data.screenshotPath}"`)
    } else {
      // Add the screenshot field before the closing --- of frontmatter
      content = content.replace(/---/, `---\nscreenshot: "${data.screenshotPath}"`)
    }

    await fs.writeFile(filePath, content, 'utf-8')
    console.log(`Updated ${filename}`)
  }

  console.log('All project files updated with screenshot paths!')
}

updateScreenshotPaths().catch(console.error)
