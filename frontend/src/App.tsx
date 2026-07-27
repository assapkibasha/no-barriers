import Header from './components/landing/Header'
import HeroSection from './components/landing/HeroSection'
import LanguageSelector from './components/landing/LanguageSelector'
import FeaturesSection from './components/landing/FeaturesSection'
import StatsBand from './components/landing/StatsBand'
import AboutSection from './components/landing/AboutSection'
import FaqSection from './components/landing/FaqSection'
import CtaSection from './components/landing/CtaSection'
import Footer from './components/landing/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Header />
      <HeroSection />
      <LanguageSelector />
      <FeaturesSection />
      <StatsBand />
      <AboutSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
