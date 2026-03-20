import { Globe, BookOpen, Trophy, Brain, Sparkles, Users } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            free. fun.<br />effective.
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            Learning with NoBarriers is fun, and it really works! With our short, interactive lessons, earn points, level up, and develop real-world language skills.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
              <Sparkles className="text-yellow-500" size={20} />
              <span className="text-sm font-semibold text-yellow-700">Interactive</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
              <Trophy className="text-blue-500" size={20} />
              <span className="text-sm font-semibold text-blue-700">Gamified</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/10 rounded-3xl transform rotate-3" />
            <img
              src="/images/images/funny.png"
              alt="Students collaborating on language learning"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            a verified<br />method
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            We use research-based teaching methods combined with engaging content to create courses that effectively teach you sign language faster and easily!
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
              <Brain className="text-purple-500" size={20} />
              <span className="text-sm font-semibold text-purple-700">Research-based</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
              <BookOpen className="text-orange-500" size={20} />
              <span className="text-sm font-semibold text-orange-700">Comprehensive</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-3" />
            <img
              src="/images/images/verified platform.png"
              alt="Scientific approach to language education"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            stay<br />motivated
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            We make it easy to build a learning habit with game-like features, fun challenges, and reminders. Earn rewards, track your streak, and keep leveling up!
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
              <Trophy className="text-yellow-500" size={20} />
              <span className="text-sm font-semibold text-yellow-700">Streaks</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl">
              <Users className="text-red-500" size={20} />
              <span className="text-sm font-semibold text-red-700">Leaderboards</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/10 rounded-3xl transform rotate-2" />
            <img
              src="/images/images/motivation.jpg"
              alt="Motivated learners celebrating achievements"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            personalized<br />learning
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            Designed to adapt to your level and help you learn at your own pace, our lessons combine the best of AI and language science to create a unique experience just for you.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-xl">
              <Brain className="text-cyan-500" size={20} />
              <span className="text-sm font-semibold text-cyan-700">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
              <Globe className="text-yellow-500" size={20} />
              <span className="text-sm font-semibold text-yellow-700">Adaptive</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl transform -rotate-2" />
            <img
              src="/images/images/personalized.png"
              alt="Personalized language learning experience"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}