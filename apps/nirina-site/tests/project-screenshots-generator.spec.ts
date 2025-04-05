import { promises as fs } from 'fs'
import path from 'path'
import { test } from '@playwright/test'
import { formatFilename, getProjectsInfo, takeProjectScreenshot } from '../utils/screenshot-utils'

test('Generate project screenshots', async ({ page }) => {
  // Ensure we're working with the correct app path
  const appDir = path.join(process.cwd(), 'apps/nirina-site')

  // Set up directories
  const projectsDir = path.join(appDir, 'src/content/projects')
  const screenshotsDir = path.join(appDir, 'public/images/project-screenshots')

  console.log(`Looking for project files in: ${projectsDir}`)
  await fs.mkdir(screenshotsDir, { recursive: true })

  // Get all project information
  const mapping = await getProjectsInfo(projectsDir)

  if (Object.keys(mapping).length === 0) {
    test.fail(true, 'No valid projects found - please check your project directory')
    return
  }

  // Take screenshots for each project
  let successCount = 0
  for (const [_filename, data] of Object.entries(mapping)) {
    const { title, url } = data
    const screenshotFilename = `${formatFilename(title)}.png`
    const screenshotPath = path.join(screenshotsDir, screenshotFilename)

    console.log(`Processing ${title}: ${url}`)
    const success = await takeProjectScreenshot(page, url, screenshotPath)
    if (success) successCount++
  }

  // Save the mapping file for later use
  const mappingFilePath = path.join(appDir, 'project-screenshots-mapping.json')
  await fs.writeFile(mappingFilePath, JSON.stringify(mapping, null, 2))

  console.log(`
Screenshot generation complete!
✅ ${successCount} of ${Object.keys(mapping).length} projects successfully processed.
📄 Mapping file saved to: ${mappingFilePath}

To update your markdown files with the screenshot paths, run:
node scripts/update-screenshot-paths.mjs
  `)
})
