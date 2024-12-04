// Import utilities from `astro:content`
import { glob } from 'astro/loaders'
import { z, defineCollection } from 'astro:content'
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/content/posts',
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    excerpt: z.string().optional(),
    cover_url: z.string().optional(),
    alt_cover_image: z.string().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
  }),
})

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
}
