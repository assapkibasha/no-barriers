import Header from '../../src/components/landing/Header'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

const goalSlugs = [
  {
    slug: 'friend',
    theme: 'bg-gradient-to-br from-[#0f9aa8] via-[#0a7d88] to-[#07545d]',
    accent: 'text-[#ffe14a]',
  },
  {
    slug: 'business',
    theme: 'bg-gradient-to-br from-[#1f3ca6] via-[#1e2f8a] to-[#151f5f]',
    accent: 'text-[#ffd22e]',
  },
  {
    slug: 'school',
    theme: 'bg-gradient-to-br from-[#2850b7] via-[#233f9a] to-[#1a2d75]',
    accent: 'text-[#ffe14a]',
  },
  {
    slug: 'family',
    theme: 'bg-gradient-to-br from-[#0f8c96] via-[#0a7079] to-[#084e55]',
    accent: 'text-[#ffe14a]',
  },
  {
    slug: 'professional',
    theme: 'bg-gradient-to-br from-[#213da1] via-[#1b2f80] to-[#122058]',
    accent: 'text-[#ffd22e]',
  },
]

export default async function GetStartedPage() {
  const t = await getTranslations('pages.getStarted')

  return (
    <main className="min-h-screen bg-[#f5f5f5] lg:h-screen lg:overflow-hidden">
      <Header variant="teal" />
      <div className="mx-auto flex w-full max-w-[1500px] flex-col px-4 pb-8 pt-3 sm:px-6 lg:h-[calc(100vh-96px)] lg:px-8 lg:pb-4">
        <section className="mt-2 flex min-h-0 flex-1 flex-col">
          <h1 className="text-center text-3xl font-extrabold text-gray-800 sm:text-4xl">
            {t('headline')}
          </h1>

          <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {goalSlugs.map((goal) => (
              <Link
                key={goal.slug}
                href={`/get-started/${goal.slug}`}
                className={`group relative overflow-hidden rounded-2xl p-7 text-left text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl ${goal.theme}`}
              >
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-black/10" />

                <div className="relative z-10 flex h-full min-h-[220px] flex-col">
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">
                    {t(`goals.${goal.slug}.kicker`)}
                  </span>

                  <h2 className={`mt-2 text-3xl font-black uppercase leading-none tracking-tight xl:text-4xl ${goal.accent}`}>
                    Sign
                    <br />
                    Flow
                  </h2>

                  <p className="mt-3 text-lg font-extrabold leading-tight text-white xl:text-xl">{t(`goals.${goal.slug}.title`)}</p>
                  <p className="mt-2 text-sm text-white/90 xl:text-[15px]">{t(`goals.${goal.slug}.subtitle`)}</p>

                  <div className="mt-auto flex items-end justify-between pt-4">
                    <span className="inline-flex rotate-[-10deg] rounded-xl border-2 border-white/60 bg-lime-300 px-2 py-1 text-xs font-black uppercase tracking-wide text-green-900 shadow-md">
                      {t(`goals.${goal.slug}.promo`)}
                    </span>
                    <span className="rounded-full border border-white/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                      {t('tapToStart')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
