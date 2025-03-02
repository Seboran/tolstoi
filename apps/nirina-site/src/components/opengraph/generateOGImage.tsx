import type { JSX } from 'react'
import OG from './OG'

type PNGGenerator = (component: JSX.Element) => Promise<Buffer>

export async function generateOGImage(
  title: string,
  author: string,
  publishedDate: string,
  pngGenerator: PNGGenerator,
) {
  return await pngGenerator(<OG title={title} author={author} publishedDate={publishedDate} />)
}
