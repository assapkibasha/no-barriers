import Header from './components/landing/Header'
import HeroSection from './components/landing/HeroSection'
import LanguageSelector from './components/landing/LanguageSelector'
import FeaturesSection from './components/landing/FeaturesSection'
import CtaSection from './components/landing/CtaSection'
import AboutSection from './components/landing/AboutSection'
import Footer from './components/landing/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <HeroSection />
      <LanguageSelector />
      <FeaturesSection />
      <CtaSection />
      <AboutSection />
      <Footer />
    </div>
  )
}
