'use client'
import { useState, type KeyboardEvent } from 'react'

export function InputMotsAEcrire() {
  const [textCopie, setTextCopié] = useState('')
  const [derniereLettre, setDerniereLettre] = useState('')

  function filterKeyDownAndSetDerniereLettre(
    e: KeyboardEvent<HTMLInputElement>,
  ) {
    if (!e.ctrlKey && !e.metaKey && !e.altKey && e.which != 8) {
      setDerniereLettre(e.key)
    }
  }
  return (
    <>
      <label>
        Votre saisie
        <input
          name="zone-text"
          onChange={(e) => setTextCopié(e.target.value)}
          onKeyDown={(e) => filterKeyDownAndSetDerniereLettre(e)}
          className="w-full text-black"
        />
        <div>{textCopie}</div>
        <div>{derniereLettre}</div>
      </label>
    </>
  )
}
