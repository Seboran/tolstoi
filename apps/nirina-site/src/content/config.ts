// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
  }),
})

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
}
