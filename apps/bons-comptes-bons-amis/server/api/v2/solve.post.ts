import { z } from 'zod'

export interface BalanceSolutionResponse {
  result_matrix: number[][]
}

const SOLVE_API = process.env.SOLVER_URL ?? 'http://localhost:5328/api/v2/solve'

const balancesSchema = z.array(z.number())

export default defineEventHandler<{ body: number[] }>(async (event) => {
  const balances = await readValidatedBody(event, (body) => balancesSchema.parse(body)) // or `.parse` to directly throw an error
  const data = await $fetch<BalanceSolutionResponse>(SOLVE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ balances })
  })
  return data.result_matrix
})
