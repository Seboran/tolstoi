export type ListeMessagesMistral = {
  role: 'user' | 'assistant' | 'system' | 'tool'
  tool_call_id?: string
  content: string
}[]
