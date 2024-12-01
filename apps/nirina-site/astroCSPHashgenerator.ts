import type { AstroIntegration } from 'astro'
import { parse } from 'node-html-parser'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import * as crypto from 'crypto'

const NETLIFY_CONFIG_PATH = './netlify.toml' // Adjust this path as necessary

const createCspHash = async (scriptContent: string): Promise<string> => {
  const hash = crypto
    .createHash('sha256')
    .update(scriptContent)
    .digest('base64')
  return `'sha256-${hash}'`
}

const updateNetlifyCSP = async (hashes: string[]): Promise<void> => {
  try {
    // Read the Netlify configuration file
    const configContent = await readFile(NETLIFY_CONFIG_PATH, 'utf-8')

    // Extract and update the CSP header
    const updatedConfig = configContent.replace(
      /Content-Security-Policy\s*=\s*"([^"]+)"/,
      (match, currentCsp) => {
        const cspParts = currentCsp.split(';').map((part: any) => part.trim())
        const scriptSrcIndex = cspParts.findIndex((part: any) =>
          part.startsWith('script-src'),
        )

        if (scriptSrcIndex !== -1) {
          cspParts[scriptSrcIndex] = `script-src 'self' ${hashes.join(' ')}`
        } else {
          cspParts.push(`script-src 'self' ${hashes.join(' ')}`)
        }

        return `Content-Security-Policy = "${cspParts.join('; ')}"`
      },
    )

    // Write the updated configuration back to the file
    await writeFile(NETLIFY_CONFIG_PATH, updatedConfig, 'utf-8')
    console.log(
      'Netlify configuration updated successfully with new CSP hashes.',
    )
  } catch (error) {
    console.error(`Error updating Netlify configuration: ${error}`)
  }
}

export const astroCSPHashGenerator: AstroIntegration = {
  name: 'astro-csp-hash-generator',
  hooks: {
    'astro:build:done': async ({ dir, pages, logger }) => {
      const hashes: string[] = []

      for (const page of pages) {
        const filePath = fileURLToPath(`${dir.href}${page.pathname}index.html`)

        try {
          const root = parse(await readFile(filePath, { encoding: 'utf-8' }))
          const scripts = root.querySelectorAll('script')

          for (const script of scripts) {
            const hash = await createCspHash(script.textContent || '')
            hashes.push(hash)
          }
        } catch (error) {
          logger.error(`Cannot read file ${filePath}: ${error}`)
        }
      }

      if (hashes.length > 0) {
        await updateNetlifyCSP(hashes)
      }

      logger.info(`Generated hashes: ${hashes.join(' ')}`)
    },
  },
}
