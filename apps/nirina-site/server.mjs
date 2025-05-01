// server.js
import * as http from 'http'
import { readFile } from 'node:fs/promises' // Import readFile
import { handler as ssrHandler } from './dist/server/entry.mjs'

const PORT = 4321

// Read CSP config outside the request handler for efficiency
let cspConfig = { scriptHashes: [], styleHashes: [] }
try {
  const data = await readFile('./csp.generated.json', 'utf-8')
  cspConfig = JSON.parse(data)
  console.log('Successfully loaded csp.generated.json') // Add log
} catch (err) {
  console.error('Failed to read csp.generated.json, using default CSP:', err)
  // Define a fallback CSP if the file is missing or invalid
  // Fallback might be too restrictive, ensure hashes are generated and read correctly.
  cspConfig = { scriptHashes: ["'self'"], styleHashes: ["'self'", 'fonts.googleapis.com'] }
}

// Construct the CSP string parts using the loaded hashes, ensuring uniqueness
const scriptSources = new Set(["'self'", ...cspConfig.scriptHashes])
// TODO: remove 'unsafe-inline' to style-src but not break fonts
const styleSources = new Set([
  "'self'",
  'fonts.googleapis.com',
  ...cspConfig.styleHashes,
  "'unsafe-inline'",
])

const scriptSrc = Array.from(scriptSources).join(' ')
const styleSrc = Array.from(styleSources).join(' ')

// Log the generated directives for debugging
console.log('Generated script-src:', scriptSrc)
console.log('Generated style-src:', styleSrc) // Should now include 'unsafe-inline'

const finalCSP = `default-src https: *.apple.com; object-src 'none'; script-src ${scriptSrc}; style-src ${styleSrc}; img-src https: * data:; connect-src 'self'; font-src 'self' fonts.gstatic.com; frame-ancestors 'none';` // Added frame-ancestors back
console.log('Final CSP:', finalCSP) // Log the final CSP string

// Create a plain Node.js HTTP server.
const server = http.createServer(async (req, res) => {
  try {
    // Add security headers before sending the response.
    res.setHeader('Content-Security-Policy', finalCSP) // Set the CSP header
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY') // Keep this for older browser compatibility, though frame-ancestors in CSP is preferred
    res.setHeader('X-XSS-Protection', '1; mode=block') // Deprecated but doesn't hurt
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains') // Ensure this is only sent over HTTPS in production
    res.setHeader('Referrer-Policy', 'no-referrer') // Add Referrer-Policy header back

    await ssrHandler(req, res)
  } catch (error) {
    // Handle errors by sending an error response.
    console.error('Error during SSR:', error)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Internal Server Error')
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
