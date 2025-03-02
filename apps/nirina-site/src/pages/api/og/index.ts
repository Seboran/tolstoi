import type { APIRoute } from 'astro'
import dayjs from 'dayjs'
import { createImageGenerator } from '../../../components/opengraph/createImage'
import { generateOGImage } from '../../../components/opengraph/generateOGImage'
import 'dayjs/locale/fr'

/**
 * Open Graph Image Generation API Endpoint
 *
 * This endpoint dynamically generates Open Graph (OG) images for social media sharing.
 * It takes all parameters as query parameters.
 *
 * @endpoint /api/og
 *
 * @queryParam {string} title - Required title to display on the OG image
 * @queryParam {string} author - Required author name to display
 * @queryParam {string} date - Required publication date (ISO format: YYYY-MM-DD)
 *                             Will be formatted according to French standards (DD/MM/YYYY)
 *
 * @returns {Response} A PNG image with appropriate cache headers
 *
 * @example
 * // Usage (all parameters are required)
 * /api/og?title=My%20Blog%20Post%20Title&author=John%20Doe&date=2023-01-01
 */

export const GET: APIRoute = async ({ request }) => {
  // Extract query parameters
  const url = new URL(request.url)
  const title = url.searchParams.get('title')
  const author = url.searchParams.get('author')
  const dateParam = url.searchParams.get('date')

  // Get the base URL from the request
  const baseUrl = url.origin

  // Create image generator with baseUrl
  const { PNG } = createImageGenerator({ baseUrl })

  // Construct hero image URL
  const heroImageURL = `${baseUrl}/picture_nirina_rabeson.png`

  // Check for required parameters
  if (!title || !author || !dateParam) {
    return new Response('Missing required parameters: title, author and date are required', {
      status: 400,
    })
  }

  try {
    // Format the date in French style (DD/MM/YYYY)
    dayjs.locale('fr')
    const formattedDate = dayjs(dateParam).format('D MMMM YYYY')

    const png = await generateOGImage(
      decodeURIComponent(title),
      decodeURIComponent(author),
      formattedDate,
      PNG,
      heroImageURL,
    )

    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}

export const prerender = false
