import type { Profession } from '../types'
import { ProfessionCard } from './ProfessionCard'

type ProfessionCarouselProps = {
  professions: Profession[]
  currentSlide: number
  onSelectProfession: (profession: Profession) => void
}

export function ProfessionCarousel({
  professions,
  currentSlide,
  onSelectProfession,
}: ProfessionCarouselProps) {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* <button
        onClick={onPrevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button> */}

      <div>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="flex flex-row flex-wrap w-full gap-4">
            {professions.map((profession, index) => (
              <ProfessionCard key={index} profession={profession} onSelect={onSelectProfession} />
            ))}
          </div>
        </div>
      </div>

      {/* <button
        onClick={onNextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}
    </div>
  )
}
