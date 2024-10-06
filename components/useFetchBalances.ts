import { toValue, type MaybeRef } from 'vue'

export interface BalanceSolutionResponse {
  result_matrix: number[][]
}

// TODO : trouver une plus jolie façon de local dev
const SOLVE_API = import.meta.env.DEV ? 'http://localhost:5328/api/v2/solve' : `/api/v2/solve`

export async function fetchBalances(balances: MaybeRef<number[]>) {
  const { data } = await useFetch<BalanceSolutionResponse>(SOLVE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ balances: toValue(balances) })
  })
  return data.value
}
