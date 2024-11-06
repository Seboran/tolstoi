import { InputMotsAEcrire } from './InputMotsAEcrire'

export default function Home() {
  const mots = ['amour', 'gloire', 'beauté', 'pâtée', 'champignons', 'brun']
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-[80ch]">
        <h1 className="text-xl">Clavier turbo rapide</h1>
        <p className="subtitle">
          Apprenez à taper rapidement avec ce super assistant !
        </p>
        <section>
          <div>
            <h3>Liste de mots</h3>
            <span>Temps restant: TODO</span>
          </div>
          <InputMotsAEcrire mots={mots} />
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        mettre des liens un jour
      </footer>
    </div>
  )
}
