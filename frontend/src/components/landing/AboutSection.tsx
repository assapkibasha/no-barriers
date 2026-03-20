import { stats } from './data'

export default function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="No Barriers logo"
            className="h-[160px] w-[160px] object-contain invert"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = 'https://placehold.co/80x80/png'
            }}
          />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          About <span className="text-yellow-500">NoBarriers</span>
        </h2>
        <p className="text-lg text-gray-500">
          NoBarriers is on a mission to make language learning accessible to everyone, everywhere. We believe that language should never be a barrier to opportunity, connection, or understanding. Our platform uses cutting-edge technology and proven teaching methods to help you achieve fluency faster.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center space-y-2">
            <div className="text-4xl sm:text-5xl font-extrabold text-yellow-500">{stat.number}</div>
            <div className="text-gray-500 font-semibold uppercase tracking-wider text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
