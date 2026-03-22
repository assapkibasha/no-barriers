import Link from 'next/link'
import LearnSidebar from '../../src/components/learn/LearnSidebar'
import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('pages.about')

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] dark:bg-gray-950">
      <LearnSidebar />
      <main className="ml-64 flex flex-1 justify-center px-12 py-12">
        <div className="w-full max-w-4xl text-gray-800 dark:text-gray-100">
          <h1 className="mb-10 text-3xl font-extrabold">{t('title')}</h1>

          {/* Sub Navbar */}
          <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-b-2 border-gray-200 dark:border-gray-800 pb-0 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span className="-mb-[2px] border-b-4 border-teal-500 pb-3 text-teal-600 dark:text-teal-400 cursor-pointer">{t('tabMission')}</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">{t('tabApproach')}</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">{t('tabTeam')}</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">{t('tabCareers')}</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">{t('tabResearch')}</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">{t('tabPress')}</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">{t('tabContact')}</span>
          </div>

          {/* Content Block 1 */}
          <div className="mb-16 flex flex-col items-center gap-12 border-b border-gray-200 dark:border-gray-800 pb-16 md:flex-row">
            <div className="flex w-full justify-center md:w-1/3">
              {/* Box placeholder for image 1 */}
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-yellow-400 text-6xl shadow-lg dark:bg-yellow-500">🏫</div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="mb-4 text-2xl font-extrabold">{t('block1Title')}</h2>
              <p className="mb-4 font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                {t('block1Body1')}
              </p>
              <p className="font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                {t('block1Body2')}
              </p>
            </div>
          </div>

          {/* Content Block 2 */}
          <div className="flex flex-col items-center gap-12 border-b border-gray-200 dark:border-gray-800 pb-16 md:flex-row-reverse">
            <div className="flex w-full justify-center md:w-1/3">
              {/* Box placeholder for image 2 */}
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-red-400 text-6xl shadow-lg dark:bg-red-500">🍔</div>
            </div>
            <div className="w-full text-left md:w-2/3">
              <h2 className="mb-4 text-2xl font-extrabold">{t('block2Title')}</h2>
              <p className="font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                {t('block2Body')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
