import { InputMotsAEcrire } from './InputMotsAEcrire'

export default function Home() {
  const mots = ['amour', 'gloire', 'beauté', 'pâtée', 'champignons', 'brun']
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex max-w-[80ch] flex-col items-center gap-8 sm:items-start">
        <h1 className="text-xl">Clavier turbo rapide</h1>
        <p className="subtitle">Apprenez à taper rapidement avec ce super assistant !</p>
        <section>
          <div>
            <h3>Liste de mots</h3>
            <span>Temps restant: TODO</span>
          </div>
          <InputMotsAEcrire mots={mots} />
        </section>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        mettre des liens un jour
      </footer>
    </div>
  )
}
