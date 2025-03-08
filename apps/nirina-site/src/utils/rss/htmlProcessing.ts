import * as path from 'path'
import { createImageFinder, createImageUrlGenerator, extractImageData } from './imageUtils'
import type { ImageFinderOptions } from './types'

/**
 * Process a single Astro image tag to create a proper image tag for RSS
 */
export function createImageTagProcessor(
  findOptimizedImage: ReturnType<typeof createImageFinder>,
  generateImageUrl: ReturnType<typeof createImageUrlGenerator>,
) {
  return async function processImageTag(originalTag: string, encodedData: string): Promise<string> {
    try {
      const imageData = extractImageData(encodedData)
      if (!imageData) return originalTag

      const { src, alt } = imageData
      const filename = path.basename(src).split('.')[0]

      // Find the optimized path
      const optimizedPath = await findOptimizedImage(filename)

      // Generate final URL
      const finalSrc = generateImageUrl(src, optimizedPath)

      if (!optimizedPath) {
        console.warn(`Optimized version not found for: ${src}, using: ${finalSrc}`)
      }

      return `<img src="${finalSrc}" alt="${alt}" />`
    } catch (error) {
      console.error('Error processing image tag:', error)
      return originalTag
    }
  }
}

/**
 * Creates a function that processes HTML content to replace Astro image placeholders
 */
export function createHtmlProcessor(site: URL, options: ImageFinderOptions) {
  const findOptimizedImage = createImageFinder(options)
  const generateImageUrl = createImageUrlGenerator(site)
  const processImageTag = createImageTagProcessor(findOptimizedImage, generateImageUrl)

  return async function processHtml(html: string | undefined): Promise<string> {
    if (!html) return ''

    const imgTagPromises: Promise<string>[] = []
    let lastIndex = 0
    const textSegments: string[] = []

    // Find all image placeholders
    const regex = /<img\s+__ASTRO_IMAGE_="([^"]+)"[^>]*>/g
    let match

    while ((match = regex.exec(html)) !== null) {
      const [fullMatch, encodedData] = match

      // Add text before the match
      textSegments.push(html.substring(lastIndex, match.index))
      lastIndex = match.index + fullMatch.length

      // Process this image tag asynchronously
      imgTagPromises.push(processImageTag(fullMatch, encodedData))
    }

    // Add remaining text after last match
    textSegments.push(html.substring(lastIndex))

    // Resolve all image processing promises
    const processedTags = await Promise.all(imgTagPromises)

    // Reconstruct the HTML
    return reconstructHtml(textSegments, processedTags)
  }
}

/**
 * Combines HTML segments and processed tags
 */
function reconstructHtml(textSegments: string[], processedTags: string[]): string {
  let finalHtml = ''

  for (let i = 0; i < textSegments.length; i++) {
    finalHtml += textSegments[i]
    if (i < processedTags.length) {
      finalHtml += processedTags[i]
    }
  }

  return finalHtml
}
