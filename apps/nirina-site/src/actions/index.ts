import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { addEmailSupabase } from '../utils/saveEmail'

export const server = {
  subscribeNewsletter: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      consent: z.enum(['on']),
    }),
    handler: async (input) => await addEmailSupabase(input),
  }),
}
