import * as path from 'path'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getSortedPublishedPosts } from '../utils/getCollections'
import { generateRssItems } from '../utils/rss/rssGeneration'

export async function GET(context: APIContext) {
  // Determine the dist directory path
  const distDir = path.join(process.cwd(), 'dist', '_astro')

  // Get blog posts
  const blog = await getSortedPublishedPosts()

  // Generate RSS feed items with processed content
  const siteUrl = new URL(context.site!)
  const rssItems = await generateRssItems(blog, siteUrl, distDir)

  // Generate and return the RSS feed
  return rss({
    title: 'Le blog de Nirina Rabeson',
    description:
      'Site de Nirina Rabeson. Je parle de Javascript, de musique, de technologie le tout avec mon humour à moi et mes propres opinions.',
    site: context.site!,
    items: rssItems,
    customData: `<language>fr-fr</language>`,
    stylesheet: '/rss/styles.xsl',
  })
}
