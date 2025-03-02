import { PNG } from './createImage'
import OG from './OG'

export async function generateOGImage(
  title: string,
  author: string,
  publishedDate: string
) {
  return await PNG(
    <OG title={title} author={author} publishedDate={publishedDate} />
  )
}
