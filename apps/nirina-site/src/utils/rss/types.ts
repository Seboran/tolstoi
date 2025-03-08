/**
 * Configuration for image path finding
 */
export interface ImageFinderOptions {
  distDir: string
  fileExtension?: string
}

/**
 * Image data extracted from Astro placeholders
 */
export interface ImageData {
  src: string
  alt: string
}
