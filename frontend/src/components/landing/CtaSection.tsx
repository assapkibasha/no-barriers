import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="bg-yellow-700 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Ready to break down language barriers?
        </h2>
        <p className="text-yellow-100 text-lg max-w-2xl mx-auto">
          Join millions of learners worldwide and start your language journey today. It's free, it's fun, and it works.
        </p>
        <Link
          href="/get-started"
          className="inline-block px-12 py-5 bg-white text-yellow-500 text-xl font-extrabold rounded-2xl hover:bg-green-50 shadow-2xl transition-all transform hover:scale-105 uppercase tracking-wide"
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  )
}
