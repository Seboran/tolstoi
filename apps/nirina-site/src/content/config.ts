// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    cover_url: z.string().optional(),
    alt_cover_image: z.string().optional(),
  }),
})

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
}
