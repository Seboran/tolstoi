import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
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

const projetsCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    technologies: z.array(z.string()),
  }),
})

export const collections = {
  posts: postsCollection,
  projets: projetsCollection,
}
