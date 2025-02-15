import { professions } from '../data/professions'
import ProfessionCalculator from './ProfessionCalculator'

export default async function ProfessionPage({
  params,
}: {
  params: Promise<{ metier: string }>
}) {
  const { metier } = await params
  const profession = professions.find((p) => p.title === decodeURIComponent(metier)) || null

  if (!profession) {
    return <div>Profession not found</div>
  }

  return <ProfessionCalculator profession={profession} />
}
