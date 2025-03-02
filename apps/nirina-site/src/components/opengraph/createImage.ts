import type { JSX } from 'react'
import satori from 'satori'
import sharp from 'sharp'
import { getIconCode, loadEmoji } from '../../utils/twemoji'

export async function SVG(component: JSX.Element, baseUrl: string) {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: await (await fetch(`${baseUrl}/DMSerifText-Regular.ttf`)).arrayBuffer(),
        weight: 400,
      },
    ],
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === 'emoji') {
        // if segment is an emoji
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return `data:image/svg+xml;base64,${btoa(await loadEmoji('twemoji', getIconCode(segment)))}`
      }

      // if segment is normal text
      return code
    },
  })
}

export async function PNG(component: JSX.Element, baseUrl: string) {
  return await sharp(Buffer.from(await SVG(component, baseUrl)))
    .png()
    .toBuffer()
}
