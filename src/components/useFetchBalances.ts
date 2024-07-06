import { toValue, type MaybeRef } from 'vue'

interface BalanceSolutionResponse {
  result_matrix: number[][]
}

export async function fetchBalances(balances: MaybeRef<number[]>) {
  const response = await fetch(`/api/solve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ balances: toValue(balances) })
  })
  return (await response.json()) as BalanceSolutionResponse
}
