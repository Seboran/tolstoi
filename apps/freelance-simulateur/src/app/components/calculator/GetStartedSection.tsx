import React from 'react'

export function GetStartedSection() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Vous souhaitez vous lancer ?</h3>
      <p className="text-gray-600 mb-6">
        Bon courage ! Ce calcul est purement informatif et n'est pas un conseil financier. Vous
        pouvez voir le détail du calcul effectué ici :{' '}
        <a
          className="mt-6 text-blue-600 hover:text-blue-700 font-medium"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/seboran/tolstoi/blob/main/apps/freelance-simulateur/src/app/utils/calculator.ts"
        >
          le code source du calcul sur GitHub (lien externe)
        </a>
      </p>
    </div>
  )
}
