import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '../../../src/components/landing/Header'

const goalContent: Record<string, { title: string; description: string }> = {
  friend: {
    title: 'Learn Sign Language to Converse with a Friend',
    description: 'Start with greetings, daily phrases, and relaxed social conversations.',
  },
  business: {
    title: 'Learn Business Sign Language',
    description: 'Focus on meetings, workplace vocabulary, and professional interactions.',
  },
  school: {
    title: 'Learn Sign Language for School',
    description: 'Build classroom communication skills for lessons, group work, and activities.',
  },
  family: {
    title: 'Learn Sign Language for Family',
    description: 'Practice communication used at home to strengthen everyday family connection.',
  },
  professional: {
    title: 'Learn Professional Sign Language',
    description: 'Train in formal communication for interviews, presentations, and career growth.',
  },
}

export default function GoalPage({ params }: { params: { goal: string } }) {
  const content = goalContent[params.goal]

  if (!content) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link href="/get-started" className="text-sm font-bold uppercase tracking-wide text-yellow-600">
          Back
        </Link>
        <div className="mt-8 rounded-3xl border-2 border-gray-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">{content.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{content.description}</p>
          <Link
            href="/learn"
            className="mt-8 inline-block rounded-2xl bg-teal-600 px-8 py-4 text-base font-extrabold uppercase tracking-wide text-white transition-all hover:bg-teal-700"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </main>
  )
}
