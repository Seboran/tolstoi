import { getEntry } from 'astro:content'
import type { APIRoute } from 'astro'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { createImageGenerator } from '../../../components/opengraph/createImage'
import { generateOGImage } from '../../../components/opengraph/generateOGImage'

/**
 * Open Graph Image Generation API Endpoint
 *
 * This endpoint dynamically generates Open Graph (OG) images for social media sharing.
 * It takes the post ID as a route parameter.
 *
 * @endpoint /api/og/[id]
 *
 * @param {string} id - Required post ID to generate the OG image for
 *
 * @example
 * // Usage
 * /api/og/my-post-slug
 */
export const GET: APIRoute = async ({ params, request }): Promise<Response> => {
  // Extract ID from route parameter
  const { id } = params

  if (!id) {
    return new Response('Missing required parameter: id', {
      status: 400,
    })
  }

  const entry = await getEntry('posts', id)

  if (!entry) {
    return new Response('Article not found', {
      status: 404,
    })
  }

  const { title, author, date: dateParam } = entry.data

  // Get the base URL from the request
  const url = new URL(request.url)
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
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        // Add Netlify-specific cache headers
        'CDN-Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        'Netlify-CDN-Cache-Control':
          'public, durable, max-age=31536000, s-maxage=31536000, immutable',
        // Add cache tag for easier cache invalidation if needed
        'Cache-Tag': 'og-images',
      },
    })
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}

export const prerender = false
