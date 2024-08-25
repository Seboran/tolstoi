import '@testing-library/jest-dom/vitest'

import { mockIPC } from '@tauri-apps/api/mocks'

mockIPC((cmd, _args) => {
  // simulated rust command called "add" that just adds two numbers
  if (cmd === 'list_entries') {
    const entries: string[] = [
      'blblbl\nlogin: nini.fr',
      '7!_ddd\nlogin: adoubadi\nurl: example.com'
    ]
    return entries
  }
})
