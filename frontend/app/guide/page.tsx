'use client'

import LearnSidebar from '../../src/components/learn/LearnSidebar'
import LearnRightPanel from '../../src/components/learn/LearnRightPanel'
import { useTranslations } from 'next-intl'

export default function GuidePage() {
  const t = useTranslations('pages.guide')

  const sections = [
    {
      id: 'learn',
      icon: '📖',
      color: 'bg-teal-500',
      lightBg: 'bg-teal-50 dark:bg-teal-900/30',
      borderColor: 'border-teal-200 dark:border-teal-800',
    },
    {
      id: 'practice',
      icon: '🔁',
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      id: 'profile',
      icon: '👤',
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
    }
  ]

  return (
    <div className="flex min-h-screen">
      <LearnSidebar />

      <main className="mb-24 flex flex-1 flex-col items-center px-4 py-8 md:mb-0 md:ml-64 sm:px-6">
        <div className="w-full max-w-2xl space-y-8">

          <div className="flex flex-col items-center text-center space-y-3 mb-10">
            <h1 className="text-3xl font-black text-teal-600 dark:text-teal-400">
              {t('welcome')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md font-medium">
              {t('intro')}
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`rounded-3xl border-2 ${section.borderColor} ${section.lightBg} p-6 md:p-8 transition-transform hover:scale-[1.01]`}
              >
                <div className="flex items-center gap-5 mb-5">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${section.color} text-white text-3xl shadow-lg border-b-4 border-black/20`}>
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                      {t(`sections.${section.id}.title`)}
                    </h2>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mt-1">
                      {t(`sections.${section.id}.description`)}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {[0, 1, 2].map((idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/60 dark:bg-black/20 text-[10px] shadow-sm">
                        ⭐
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                        {t(`sections.${section.id}.details.${idx}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border-2 border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20 p-6 text-center shadow-sm">
            <h3 className="text-lg font-black text-yellow-800 dark:text-yellow-500 mb-2 uppercase tracking-widest">
              {t('proTipTitle')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {t('proTipBody')}
            </p>
          </div>

        </div>
      </main>

      <div className="sticky top-0 mr-4 hidden h-screen w-80 flex-shrink-0 overflow-y-auto py-8 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:block">
        <LearnRightPanel />
      </div>
    </div>
  )
}
