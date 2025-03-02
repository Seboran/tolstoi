import fs from 'fs/promises'
import type { JSX } from 'react'
import satori from 'satori'
import sharp from 'sharp'

export async function SVG(component: JSX.Element) {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: await fs.readFile('./src/images/opengraph/fonts/DMSerifText-Regular.ttf'),
        weight: 400,
      },
    ],
  })
}

export async function PNG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer()
}
