'use client'
import { ChangeEvent, useState } from 'react'

export function InputMotsAEcrire() {
  const mots = ['amour', 'gloire', 'beauté', 'pâtée', 'champignons', 'brun']

  const [textCopie, setTextCopié] = useState('')
  const [derniereLettre, setDerniereLettre] = useState('')

  const [showErreur, setShowErreur] = useState(false)

  function filterKeyDownAndSetDerniereLettre(e: ChangeEvent<HTMLInputElement>) {
    const motEcrit = e.target.value
    if (
      mots
        .join(' ')
        .at(motEcrit.length - 1)
        ?.toLowerCase() === (motEcrit.at(-1) ?? '').toLowerCase()
    ) {
      setShowErreur(false)
      setTextCopié(motEcrit)
    } else {
      setShowErreur(true)
    }
    setDerniereLettre(motEcrit.at(-1) ?? '')
  }
  return (
    <>
      <label>
        Votre saisie
        <div className="flex flex-row gap-2">
          {mots.map((mot) => (
            <div key={mot}>{mot}</div>
          ))}
        </div>
        <input
          name="zone-text"
          value={textCopie}
          onChange={(e) => filterKeyDownAndSetDerniereLettre(e)}
          className="w-full text-black"
        />
        <div>Texte copié :{textCopie}</div>
        <div>Dernière lettre : {derniereLettre}</div>
        {showErreur ? <div>Erreur de saisie !</div> : null}
      </label>
    </>
  )
}
