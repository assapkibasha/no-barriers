import Link from 'next/link'
import LearnSidebar from '../../src/components/learn/LearnSidebar'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5] dark:bg-gray-950">
      <LearnSidebar />
      <main className="ml-64 flex flex-1 justify-center px-12 py-12">
        <div className="w-full max-w-4xl text-gray-800 dark:text-gray-100">
          <h1 className="mb-10 text-3xl font-extrabold">About Us</h1>
          
          {/* Sub Navbar */}
          <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-b-2 border-gray-200 dark:border-gray-800 pb-0 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span className="-mb-[2px] border-b-4 border-teal-500 pb-3 text-teal-600 dark:text-teal-400 cursor-pointer">Mission</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">Approach</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">Team</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">Careers</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">Research</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">Press</span>
            <span className="cursor-pointer pb-3 hover:text-gray-600 dark:hover:text-gray-300 transition">Contact Us</span>
          </div>

          {/* Content Block 1 */}
          <div className="mb-16 flex flex-col items-center gap-12 border-b border-gray-200 dark:border-gray-800 pb-16 md:flex-row">
            <div className="flex w-full justify-center md:w-1/3">
              {/* Box placeholder for image 1 */}
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-yellow-400 text-6xl shadow-lg dark:bg-yellow-500">🏫</div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="mb-4 text-2xl font-extrabold">Personalized education.</h2>
              <p className="mb-4 font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                Everyone learns in different ways. For the first time in history, we can analyze how millions of people learn at once to create the most effective educational system possible and tailor it to each student.
              </p>
              <p className="font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                Our ultimate goal is to give everyone access to a private tutor experience through technology.
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
              <h2 className="mb-4 text-2xl font-extrabold">Making learning fun.</h2>
              <p className="font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                It's hard to stay motivated when learning online, so we made NoBarriers so fun that people would prefer picking up new skills over playing a game.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
