import Link from 'next/link'
import { professions } from '../data/professions'
import { ProfessionCard } from './ProfessionCard'

export function ProfessionCarousel() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <div>
        <div className="flex transition-transform duration-300 ease-in-out">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full flex-shrink-0">
            {professions.map((profession, index) => (
              <Link key={index} href={`/${profession.title}`}>
                <ProfessionCard key={index} profession={profession} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
