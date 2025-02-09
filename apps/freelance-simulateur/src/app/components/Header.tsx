import { Linkedin } from 'lucide-react'

export function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
        Briller
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/Seboran/monorepo/tree/main/apps/freelance-simulateur"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img height="30" width={30} src="https://cdn.simpleicons.org/github" />
        </a>
        <a
          href="https://bsky.app/profile/nirinarabeson.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img height="30" width={30} src="https://cdn.simpleicons.org/bluesky" />
        </a>
        <a
          href="https://www.linkedin.com/in/nirinarabeson/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="w-8 h-8" />
        </a>
      </div>
    </header>
  )
}
