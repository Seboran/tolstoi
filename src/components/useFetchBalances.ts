import { toValue, type MaybeRef } from 'vue'

interface BalanceSolutionResponse {
  result_matrix: number[][]
}

// TODO : trouver une plus jolie façon de local dev
const SOLVE_API = import.meta.env.DEV ? 'http://localhost:5328/api/solve' : `/api/solve`

export async function fetchBalances(balances: MaybeRef<number[]>) {
  const response = await fetch(SOLVE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ balances: toValue(balances) })
  })
  return (await response.json()) as BalanceSolutionResponse
}
