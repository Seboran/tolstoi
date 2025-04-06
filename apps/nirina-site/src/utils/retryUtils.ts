// Utility functions for retry logic

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function shouldRetry(error: any): boolean {
  return (
    error.response?.status === 429 || (typeof error.status === 'number' && error.status === 429)
  )
}

export function getRetryDelay(attempt: number, baseDelay: number): number {
  return baseDelay * attempt
}

export async function callWithRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 500,
): Promise<T> {
  let attempt = 0
  while (attempt < retries) {
    try {
      return await fn()
    } catch (error: any) {
      if (shouldRetry(error)) {
        attempt++
        if (attempt < retries) {
          await sleep(getRetryDelay(attempt, baseDelay))
          continue
        }
      }
      throw error
    }
  }
  return await fn() // fallback
}
