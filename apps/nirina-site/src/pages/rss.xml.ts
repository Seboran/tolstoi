import { getEntry } from 'astro:content'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIContext } from 'astro'
import * as fs from 'fs/promises'
import * as path from 'path'
import { getSortedPublishedPosts } from '../utils/getCollections'

export async function GET(context: APIContext) {
  // Determine the dist directory path - adjust if your build output is in a different location
  const distDir = path.join(process.cwd(), 'dist', '_astro')

  const blog = await getSortedPublishedPosts()
  const remapToRss: RSSFeedItem[] = await Promise.all(
    blog.map(async (post) => {
      const entry = await getEntry(post)
      // Fix image URLs in the rendered HTML
      const processedContent = await fixAstroImages(
        entry.rendered?.html,
        new URL(context.site!),
        distDir,
      )

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt,
        link: `/posts/${post.id}/`,
        content: processedContent,
      }
    }),
  )

  return rss({
    // `<title>` field in output xml
    title: 'Le blog de Nirina Rabeson',
    // `<description>` field in output xml
    description:
      'Site de Nirina Rabeson. Je parle de Javascript, de musique, de technologie le tout avec mon humour à moi et mes propres opinions.',
    // Pull in your project "site" from the endpoint context
    site: context.site!,
    // Array of `<item>`s in output xml
    items: remapToRss,
    // (optional) inject custom xml
    customData: `<language>fr-fr</language>`,
    stylesheet: '/rss/styles.xsl',
  })
}

// Find optimized image path by looking in the dist directory
async function findOptimizedImage(
  filename: string,
  distDir: string = './dist/_astro',
): Promise<string | null> {
  try {
    // Read the contents of the _astro directory
    const files = await fs.readdir(distDir)

    // Look for files that match our pattern: filename.HASH.webp
    const optimizedImage = files.find(
      (file) => file.startsWith(filename + '.') && file.endsWith('.webp'),
    )

    if (optimizedImage) {
      return `/_astro/${optimizedImage}`
    }

    return null
  } catch (error) {
    console.error('Error finding optimized image:', error)
    return null
  }
}

// Cache of image paths to avoid repeated file system lookups
const imagePathCache = new Map<string, string>()

// Function to fix Astro image placeholders in HTML content
async function fixAstroImages(
  html: string | undefined,
  site: URL,
  distDir: string,
): Promise<string> {
  if (!html) return ''

  const imgTagPromises: Promise<string>[] = []
  let lastIndex = 0
  const result: string[] = []

  // Use regex to find all image placeholders
  const regex = /<img\s+__ASTRO_IMAGE_="([^"]+)"[^>]*>/g
  let match

  while ((match = regex.exec(html)) !== null) {
    const [fullMatch, encodedData] = match

    // Add text before the match
    result.push(html.substring(lastIndex, match.index))
    lastIndex = match.index + fullMatch.length

    // Process this image tag asynchronously
    const processedTag = (async () => {
      try {
        // Decode HTML entities in the encoded data
        const decodedData = encodedData
          .replace(/&amp;#x22;/g, '"')
          .replace(/&amp;#x27;/g, "'")
          .replace(/&#x22;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')

        // Extract image source using regex
        const srcRegex = /"src"\s*:\s*"([^"]+)"/
        const srcMatch = decodedData.match(srcRegex)
        if (!srcMatch) return fullMatch

        const src = srcMatch[1]

        // Extract alt text if available
        const altRegex = /"alt"\s*:\s*"([^"]*)"/
        const altMatch = decodedData.match(altRegex)
        const alt = altMatch ? altMatch[1] : ''

        // Extract filename without extension
        const filename = path.basename(src).split('.')[0]

        // Try to find the optimized image path (using cache if available)
        let optimizedPath: string | null
        if (imagePathCache.has(filename)) {
          optimizedPath = imagePathCache.get(filename)!
        } else {
          optimizedPath = await findOptimizedImage(filename, distDir)
          if (optimizedPath) {
            imagePathCache.set(filename, optimizedPath)
          }
        }

        // Use the optimized path if found, otherwise fall back to the original path
        let finalSrc: string
        if (optimizedPath) {
          finalSrc = `${site.origin}${optimizedPath}`
        } else {
          // Fallback to original path (should be accessible if you've configured static assets correctly)
          finalSrc = src.startsWith('/') ? `${site.origin}${src}` : `${site.origin}/content/${src}`
          console.warn(`Optimized version not found for: ${src}, using: ${finalSrc}`)
        }

        return `<img src="${finalSrc}" alt="${alt}" />`
      } catch (e) {
        console.error('Error processing Astro image:', e)
        return fullMatch
      }
    })()

    imgTagPromises.push(processedTag)
  }

  // Add remaining text after last match
  result.push(html.substring(lastIndex))

  // Resolve all image processing promises and combine results
  const processedTags = await Promise.all(imgTagPromises)

  // Reconstruct the HTML by interleaving original text with processed tags
  let finalHtml = ''
  for (let i = 0; i < result.length; i++) {
    finalHtml += result[i]
    if (i < processedTags.length) {
      finalHtml += processedTags[i]
    }
  }

  return finalHtml
}
