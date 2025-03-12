import type { APIRoute } from 'astro'
import { createImageGenerator } from '../../../../components/opengraph/createImage'
import { generateOGImage } from '../../../../components/opengraph/generateOGImage'

export const GET: APIRoute = async ({ params, request }): Promise<Response> => {
  const { title } = params

  if (!title) {
    return new Response('Missing required parameter: title', { status: 400 })
  }

  const url = new URL(request.url)
  const baseUrl = url.origin
  const { PNG } = createImageGenerator({ baseUrl })
  const heroImageURL = `${baseUrl}/picture_nirina_rabeson.png`

  try {
    const png = await generateOGImage({
      title: decodeURIComponent(title),
      author: undefined,
      publishedDate: undefined,
      pngGenerator: PNG,
      heroImageURL,
    })
    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        'Netlify-CDN-Cache-Control':
          'public, durable, max-age=31536000, s-maxage=31536000, immutable',
        'Cache-Tag': 'og-images',
      },
    })
  } catch (error) {
    console.error('Error generating social card image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}

export const prerender = false
