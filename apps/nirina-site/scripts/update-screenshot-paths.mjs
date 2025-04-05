#!/usr/bin/env node

/**
 * This script updates all project markdown files with their screenshot paths.
 * It reads from the project-screenshots-mapping.json file generated by
 * the Playwright screenshot generator test.
 */

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { updateMarkdownFile } from '../utils/screenshot-utils.js'

// Get the app directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appDir = path.resolve(__dirname, '..')

async function updateProjectMarkdownFiles() {
  const mappingFilePath = path.join(appDir, 'project-screenshots-mapping.json')

  try {
    // Read the mapping file
    const mappingData = await fs.readFile(mappingFilePath, 'utf-8')
    const mapping = JSON.parse(mappingData)

    if (Object.keys(mapping).length === 0) {
      console.log('No projects found in the mapping file. Run the screenshot generator first.')
      process.exit(1)
    }

    // Projects directory
    const projectsDir = path.join(appDir, 'src/content/projects')

    // Update each markdown file
    let updatedCount = 0
    for (const [filename, data] of Object.entries(mapping)) {
      const { screenshotPath } = data
      const filePath = path.join(projectsDir, filename)

      try {
        // Check if file still exists
        await fs.access(filePath)

        // Update the file
        await updateMarkdownFile(filePath, screenshotPath)
        console.log(`✅ Updated: ${filename}`)
        updatedCount++
      } catch (error) {
        console.error(
          `❌ Failed to update ${filename}: ${error instanceof Error ? error.message : String(error)}`,
        )
      }
    }

    console.log(`
Update complete!
✅ ${updatedCount} of ${Object.keys(mapping).length} markdown files updated with screenshot paths.
    `)
  } catch (error) {
    console.error(`
❌ Error: ${error instanceof Error ? error.message : String(error)}
    
Make sure you've run the screenshot generator test first to create the mapping file.
Run: npx playwright test tests/project-screenshots-generator.spec.ts
    `)
    process.exit(1)
  }
}

updateProjectMarkdownFiles()
