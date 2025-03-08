import * as fs from 'fs/promises'
import type { ImageData, ImageFinderOptions } from './types'

/**
 * Creates a cached image finder function
 */
export function createImageFinder(options: ImageFinderOptions) {
  // Cache for optimized image paths
  const cache = new Map<string, string>()

  return async function findOptimizedImagePath(filename: string): Promise<string | null> {
    // Check cache first for performance
    if (cache.has(filename)) {
      return cache.get(filename)!
    }

    try {
      const files = await fs.readdir(options.distDir)
      const fileExt = options.fileExtension || '.webp'

      const optimizedImage = files.find(
        (file) => file.startsWith(filename + '.') && file.endsWith(fileExt),
      )

      if (optimizedImage) {
        const imagePath = `/_astro/${optimizedImage}`
        cache.set(filename, imagePath)
        return imagePath
      }

      return null
    } catch (error) {
      console.error(`Error finding optimized image for ${filename}:`, error)
      return null
    }
  }
}

/**
 * Extracts image data from encoded Astro data
 */
export function extractImageData(encodedData: string): ImageData | null {
  try {
    const decodedData = decodeHtmlEntities(encodedData)

    const srcMatch = decodedData.match(/"src"\s*:\s*"([^"]+)"/)
    const altMatch = decodedData.match(/"alt"\s*:\s*"([^"]*)"/)

    if (!srcMatch) return null

    return {
      src: srcMatch[1],
      alt: altMatch ? altMatch[1] : '',
    }
  } catch (error) {
    console.error('Error extracting image data:', error)
    return null
  }
}

/**
 * Helper to decode HTML entities
 */
export function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&amp;#x22;/g, '"')
    .replace(/&amp;#x27;/g, "'")
    .replace(/&#x22;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
}

/**
 * Generates image URLs with proper paths
 */
export function createImageUrlGenerator(site: URL) {
  return function generateImageUrl(src: string, optimizedPath: string | null): string {
    if (optimizedPath) {
      return `${site.origin}${optimizedPath}`
    }

    // Fallback to original path
    return src.startsWith('/') ? `${site.origin}${src}` : `${site.origin}/content/${src}`
  }
}
