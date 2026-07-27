import Header from '../../src/components/landing/Header'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { courses } from '../../src/data/courses'

const goalSlugs = ['friend', 'business', 'school', 'family', 'professional']

const courseStyles: Record<string, { icon: string; bg: string }> = {
  beginner: { icon: '🤟', bg: 'bg-brand' },
  everyday: { icon: '🏠', bg: 'bg-unit' },
  intermediate: { icon: '⏰', bg: 'bg-ink' },
}

export default async function GetStartedPage() {
  const t = await getTranslations('pages.getStarted')
  const tCourses = await getTranslations('courses')
  const tUnits = await getTranslations('units')

  return (
    <main className="min-h-screen bg-paper">
      <Header variant="teal" />

      {/* ── Hero: value statement + photo collage | signup goal cards ── */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">{t('heroSubtitle')}</p>

          {/* Photo collage on organic shapes */}
          <div className="relative mt-12 h-72 w-full max-w-md sm:h-80" aria-hidden="true">
            <div className="absolute left-6 top-2 h-56 w-44 rotate-6 bg-brand/20 [border-radius:45%_55%_60%_40%/50%_45%_55%_50%]" />
            <div className="absolute bottom-0 right-16 h-40 w-40 -rotate-6 bg-reward/20 [border-radius:55%_45%_40%_60%/45%_50%_50%_55%]" />
            <img
              src="/images/images/child and grama.png"
              alt=""
              className="absolute left-0 bottom-2 h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <img
              src="/images/images/girl in front.png"
              alt=""
              className="absolute left-24 top-0 h-44 w-40 rotate-3 rounded-[2rem] border-4 border-white object-cover shadow-lg"
            />
            <img
              src="/images/images/smilling.jpg"
              alt=""
              className="absolute right-4 top-16 h-40 w-40 -rotate-3 rounded-[2rem] border-4 border-white object-cover shadow-lg"
            />
            <span className="absolute right-2 top-2 text-3xl text-reward">✳</span>
            <span className="absolute bottom-6 right-0 h-4 w-4 rotate-12 border-2 border-heart" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-ink">{t('headline')}</h2>
          <div className="mt-6 flex flex-col gap-4">
            {goalSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/get-started/${slug}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-white px-6 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
              >
                <span>
                  <span className="block font-display text-base font-extrabold text-ink">
                    {t(`goals.${slug}.title`)}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-soft">
                    {t(`goals.${slug}.subtitle`)}
                  </span>
                </span>
                <span className="ml-4 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            {t('alreadyHave')}{' '}
            <Link href="/login" className="font-bold text-brand underline underline-offset-2 hover:text-ink">
              {t('logIn')}
            </Link>
          </p>
        </div>
      </section>

      {/* ── Course catalog teaser ── */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-ink">{t('catalogTitle')}</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id}>
                <div className="flex items-center gap-3 border-b border-line pb-4">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full text-xl text-white ${courseStyles[course.id]?.bg ?? 'bg-brand'}`}
                    aria-hidden="true"
                  >
                    {courseStyles[course.id]?.icon ?? '🤟'}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-ink">
                      {tCourses(`${course.id}.title`)}
                    </h3>
                  </div>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {course.units.map((unit) => (
                    <li key={unit}>
                      <Link
                        href="/register"
                        className="text-sm font-semibold text-ink-soft transition-colors hover:text-brand"
                      >
                        {tUnits(unit)}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/register" className="text-sm font-extrabold text-brand hover:underline">
                      {t('seeAll')}
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why NoBarriers works ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-ink">{t('whyTitle')}</h2>
        <div className="mt-12 grid grid-cols-1 gap-12 text-center sm:grid-cols-3">
          {([
            { key: 'why1', icon: '🎯', blob: 'bg-brand-soft' },
            { key: 'why2', icon: '🖐️', blob: 'bg-unit-soft' },
            { key: 'why3', icon: '🔥', blob: 'bg-reward-soft' },
          ] as const).map(({ key, icon, blob }) => (
            <div key={key} className="mx-auto max-w-xs">
              <span
                className={`mx-auto grid h-20 w-20 place-items-center text-3xl ${blob} [border-radius:55%_45%_50%_50%/50%_55%_45%_50%]`}
                aria-hidden="true"
              >
                {icon}
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{t(`${key}Title`)}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{t(`${key}Text`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Families & schools band ── */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto h-64 w-full max-w-sm" aria-hidden="true">
            <div className="absolute left-10 top-4 h-48 w-48 rotate-12 bg-unit/15 [border-radius:50%_50%_45%_55%/55%_45%_55%_45%]" />
            <img
              src="/images/images/funny.png"
              alt=""
              className="absolute left-0 top-10 h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <img
              src="/images/motivation.jpg"
              alt=""
              className="absolute right-6 top-0 h-44 w-44 rotate-3 rounded-[2rem] border-4 border-white object-cover shadow-lg"
            />
            <span className="absolute bottom-2 right-2 text-2xl text-brand">✳</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{t('bandKicker')}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink">{t('bandTitle')}</h2>
            <p className="mt-4 max-w-md text-ink-soft">{t('bandText')}</p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-full bg-brand px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-brand-hover"
            >
              {t('bandCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Join today ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-ink">{t('joinTitle')}</h2>
        <div className="mx-auto mt-8 flex w-full max-w-xs flex-col gap-3">
          <Link
            href="/register"
            className="rounded-full bg-brand py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-brand-hover"
          >
            {t('joinStart')}
          </Link>
          <Link
            href="/login"
            className="rounded-full border-2 border-ink py-3 text-sm font-extrabold uppercase tracking-wide text-ink transition-all hover:bg-ink hover:text-white"
          >
            {t('logIn')}
          </Link>
        </div>
      </section>
    </main>
  )
}
