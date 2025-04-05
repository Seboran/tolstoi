#!/usr/bin/env node

/**
 * This script runs the entire screenshot generation and update process
 * in one command.
 */

import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the app directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appDir = path.resolve(__dirname, '..')

console.log('🔍 Starting project screenshot generation process...')

try {
  // Run the Playwright test to generate screenshots
  console.log('\n📸 Generating screenshots with Playwright...')
  execSync('npx playwright test tests/project-screenshots-generator.spec.ts', {
    cwd: appDir,
    stdio: 'inherit',
  })

  // Update the markdown files with screenshot paths
  console.log('\n✏️ Updating markdown files with screenshot paths...')
  execSync('node scripts/update-screenshot-paths.mjs', {
    cwd: appDir,
    stdio: 'inherit',
  })

  console.log('\n✅ Process complete! All screenshots generated and markdown files updated.')
} catch (error) {
  console.error(`\n❌ Error: ${error.message}`)
  process.exit(1)
}
