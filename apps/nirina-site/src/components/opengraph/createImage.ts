import type { JSX } from 'react'
import satori from 'satori'
import sharp from 'sharp'

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
  })
}

export async function PNG(component: JSX.Element, baseUrl: string) {
  return await sharp(Buffer.from(await SVG(component, baseUrl)))
    .png()
    .toBuffer()
}
