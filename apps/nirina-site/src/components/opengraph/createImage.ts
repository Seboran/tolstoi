import type { JSX } from 'react'
import satori, { type SatoriOptions } from 'satori'
import sharp from 'sharp'
import { getIconCode, loadEmoji } from '../../utils/twemoji'

/**
 * Creates an image generator with the specified base URL
 * @param baseUrl - Base URL for loading assets like fonts
 * @returns Object containing PNG and SVG generation functions
 */
export function createImageGenerator({ baseUrl }: { baseUrl: string }) {
  /**
   * Generates a PNG image from a React component
   * @param component - The React component to render as PNG
   * @returns Promise resolving to PNG buffer
   * @throws Error if PNG generation fails
   */
  async function generatePNG(component: JSX.Element) {
    try {
      const svg = await generateSVG(component)
      return await sharp(Buffer.from(svg)).png().toBuffer()
    } catch (error) {
      console.error('PNG generation error:', error)
      throw new Error(
        `Failed to generate PNG: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  /**
   * Generates an SVG image from a React component
   * @param component - The React component to render as SVG
   * @returns Promise resolving to SVG string
   * @throws Error if SVG generation fails
   */
  async function generateSVG(component: JSX.Element) {
    try {
      const fontUrl = `${baseUrl}/DMSerifText-Regular.ttf`
      const fontData = await loadFontData(fontUrl)

      const options: SatoriOptions = {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            weight: 400,
          },
        ],
        loadAdditionalAsset: createAssetLoader(),
      }

      return await satori(component, options)
    } catch (error) {
      console.error('SVG generation error:', error)
      throw new Error(
        `Failed to generate SVG: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  return {
    PNG: generatePNG,
    SVG: generateSVG,
  }
}

/**
 * Loads font data from the specified URL
 * @param fontUrl - The URL to load the font from
 * @returns Promise resolving to font data
 * @throws Error if font loading fails
 */
async function loadFontData(fontUrl: string): Promise<ArrayBuffer> {
  try {
    const fontResponse = await fetch(fontUrl)
    if (!fontResponse.ok) {
      throw new Error(`Failed to load font: ${fontResponse.status} ${fontResponse.statusText}`)
    }
    return await fontResponse.arrayBuffer()
  } catch (error) {
    console.error('Font loading error:', error)
    throw new Error(
      `Failed to load font from ${fontUrl}: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

/**
 * Creates an asset loader function for satori
 * @returns Asset loader function
 */
function createAssetLoader() {
  return async (code: string, segment: string) => {
    try {
      if (code === 'emoji') {
        // if segment is an emoji
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return `data:image/svg+xml;base64,${btoa(await loadEmoji('twemoji', getIconCode(segment)))}`
      }

      // if segment is normal text
      return code
    } catch (error) {
      console.error('Error loading asset:', error)
      // Return empty string as fallback for emojis
      return code === 'emoji' ? '' : code
    }
  }
}
