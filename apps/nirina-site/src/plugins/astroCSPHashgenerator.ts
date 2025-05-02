import * as crypto from 'crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import * as path from 'path'
import type { AstroIntegration } from 'astro'
import { parse } from 'node-html-parser'

const CSP_JSON_PATH = path.join(process.cwd(), 'csp.generated.json')

const updateCSPJson = async (scriptHashes: string[], styleHashes: string[]): Promise<void> => {
  try {
    // Store only the unique hashes
    const uniqueScriptHashes = Array.from(new Set(scriptHashes))
    const uniqueStyleHashes = Array.from(new Set(styleHashes))

    const cspConfig = { scriptHashes: uniqueScriptHashes, styleHashes: uniqueStyleHashes }
    await writeFile(CSP_JSON_PATH, JSON.stringify(cspConfig, null, 2), 'utf-8')
    console.log(`CSP configuration written to ${CSP_JSON_PATH}`)
  } catch (error) {
    console.error(`Error writing CSP JSON file: ${error}`)
  }
}

const createCspHash = async (scriptContent: string): Promise<string> => {
  const hash = crypto.createHash('sha256').update(scriptContent).digest('base64')
  return `'sha256-${hash}'`
}

export const astroCSPHashGenerator: AstroIntegration = {
  name: 'astro-csp-hash-generator',
  hooks: {
    'astro:build:done': async ({ dir, pages, logger }) => {
      const scriptHashes: string[] = []
      const styleHashes: string[] = []
      logger.info('Starting CSP Hash Generation...') // Add log

      for (const page of pages) {
        if (page.pathname.includes('404')) {
          continue
        }
        const filePath = fileURLToPath(`${dir.href}${page.pathname}index.html`)

        try {
          const root = parse(await readFile(filePath, { encoding: 'utf-8' }))
          const scripts = root.querySelectorAll('script')

          for (const script of scripts) {
            const hash = await createCspHash(script.textContent || '')
            scriptHashes.push(hash)
          }

          // Process style tags
          const styles = root.querySelectorAll('style')
          for (const style of styles) {
            const styleContent = style.textContent || ''
            // Log the content being hashed (first 100 chars)
            const hash = await createCspHash(styleContent)
            styleHashes.push(hash)
          }
        } catch (error) {
          logger.error(`Cannot read file ${filePath}: ${error}`)
        }
      }

      if (scriptHashes.length > 0 || styleHashes.length > 0) {
        logger.info('Updating CSP JSON file...') // Add log
        await updateCSPJson(scriptHashes, styleHashes)
      } else {
        logger.info('No script or style hashes found to update CSP JSON.') // Add log
      }
    },
  },
}
