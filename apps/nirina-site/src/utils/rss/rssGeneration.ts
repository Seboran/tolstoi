import { getEntry } from 'astro:content'
import type { RSSFeedItem } from '@astrojs/rss'
import type { getSortedPublishedPosts } from '../getCollections'
import { createHtmlProcessor } from './htmlProcessing'

/**
 * Process post content to fix image URLs for RSS feed
 */
export function createContentProcessor(site: URL, distDir: string) {
  const processHtml = createHtmlProcessor(site, {
    distDir,
    fileExtension: '.webp',
  })

  return async function processContent(html: string | undefined): Promise<string> {
    return processHtml(html)
  }
}

/**
 * Generate RSS feed items from blog posts
 */
export async function generateRssItems(
  blog: Awaited<ReturnType<typeof getSortedPublishedPosts>>,
  site: URL,
  distDir: string,
): Promise<RSSFeedItem[]> {
  const processContent = createContentProcessor(site, distDir)

  return Promise.all(
    blog.map(async (post) => {
      const entry = await getEntry(post)
      const processedContent = await processContent(entry.rendered?.html)

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt,
        link: `/posts/${post.id}/`,
        content: processedContent,
      }
    }),
  )
}
