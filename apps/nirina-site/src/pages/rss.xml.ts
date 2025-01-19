import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getSortedPublishedPosts } from '../utils/getCollections'

export async function GET(context: APIContext) {
  const blog = await getSortedPublishedPosts()
  return rss({
    // `<title>` field in output xml
    title: 'Le blog de Nirina Rabeson',
    // `<description>` field in output xml
    description:
      'Site de Nirina Rabeson. Je parle de Javascript, de musique, de technologie le tout avec mon humour à moi et mes propres opinions.',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site!,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/posts/${post.id}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>fr-fr</language>`,
  })
}
