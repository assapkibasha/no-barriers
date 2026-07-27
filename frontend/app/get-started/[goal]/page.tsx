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
    <main className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link href="/get-started" className="text-sm font-bold uppercase tracking-wide text-brand hover:text-ink">
          {t('back')}
        </Link>
        <div className="mt-8 rounded-3xl border border-line bg-white p-10 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink">{t(`goals.${params.goal}.title`)}</h1>
          <p className="mt-4 text-lg text-ink-soft">{t(`goals.${params.goal}.description`)}</p>
          <Link
            href="/learn"
            className="mt-8 inline-block rounded-full bg-brand px-8 py-4 text-base font-extrabold uppercase tracking-wide text-white transition-all hover:bg-brand-hover"
          >
            {t('startLearning')}
          </Link>
        </div>
      </div>
    </main>
  )
}
