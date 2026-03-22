import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '../../../src/components/landing/Header'
import { getTranslations } from 'next-intl/server'

const validGoals = ['friend', 'business', 'school', 'family', 'professional']

export default async function GoalPage({ params }: { params: { goal: string } }) {
  if (!validGoals.includes(params.goal)) {
    notFound()
  }

  const t = await getTranslations('pages.getStartedGoal')

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link href="/get-started" className="text-sm font-bold uppercase tracking-wide text-yellow-600">
          {t('back')}
        </Link>
        <div className="mt-8 rounded-3xl border-2 border-gray-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">{t(`goals.${params.goal}.title`)}</h1>
          <p className="mt-4 text-lg text-gray-600">{t(`goals.${params.goal}.description`)}</p>
          <Link
            href="/learn"
            className="mt-8 inline-block rounded-2xl bg-teal-600 px-8 py-4 text-base font-extrabold uppercase tracking-wide text-white transition-all hover:bg-teal-700"
          >
            {t('startLearning')}
          </Link>
        </div>
      </div>
    </main>
  )
}
