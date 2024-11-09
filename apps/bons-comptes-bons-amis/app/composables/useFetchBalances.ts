import { toValue, type MaybeRef } from 'vue'

export interface BalanceSolutionResponse {
  result_matrix: number[][]
}

// TODO : trouver une plus jolie façon de local dev
/* v8 ignore next 1 */
const SOLVE_API = import.meta.env.DEV ? 'http://localhost:5328/api/v2/solve' : `/api/v2/solve`

/* v8 ignore next 10 */
export async function fetchBalances(balances: MaybeRef<number[]>) {
  const data = await $fetch<BalanceSolutionResponse>(SOLVE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ balances: toValue(balances) })
  })
  return data
}
