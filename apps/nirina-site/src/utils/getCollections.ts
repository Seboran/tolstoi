import { getCollection } from 'astro:content'

async function getPublishedPosts() {
  return await getCollection('posts', ({ data }) => !data.draft || import.meta.env.DEV)
}

export async function getSortedPublishedPosts() {
  return (await getPublishedPosts()).sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}
