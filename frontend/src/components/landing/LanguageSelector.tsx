'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { languages } from './data'

export default function LanguageSelector() {
  const [langOffset, setLangOffset] = useState(0)
  const visibleCount = 7
  const maxOffset = Math.max(0, languages.length - visibleCount)

  return (
    <section id="languages" className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setLangOffset(Math.max(0, langOffset - 1))}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-400"
            disabled={langOffset === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-4 sm:gap-6 overflow-hidden">
            {languages.slice(langOffset, langOffset + visibleCount).map((lang) => (
              <button
                key={lang.name}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-600 font-semibold text-sm whitespace-nowrap"
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="hidden sm:inline uppercase text-xs tracking-wider">{lang.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setLangOffset(Math.min(maxOffset, langOffset + 1))}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-400"
            disabled={langOffset >= maxOffset}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}