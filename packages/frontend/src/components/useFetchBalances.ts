import { toValue, type MaybeRef } from 'vue'

interface BalanceSolutionResponse {
  result_matrix: number[][]
}

const BASE_URL = 'http://localhost:5000'

export async function fetchBalances(balances: MaybeRef<number[]>) {
  const response = await fetch(`${BASE_URL}/solve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ balances: toValue(balances) })
  })
  return (await response.json()) as BalanceSolutionResponse
}
