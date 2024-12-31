import { toValue, type MaybeRef } from 'vue'
import type { BalanceSolutionResponse } from '~~/server/api/v2/solve.post'

/* v8 ignore next 10 */
export async function fetchBalances(balances: MaybeRef<number[]>) {
  const data = await $fetch<BalanceSolutionResponse['result_matrix']>('/api/v2/solve', {
    method: 'post',
    body: toValue(balances),
  })
  return data
}
