import Header from '../../src/components/landing/Header'
import HeroSection from '../../src/components/landing/HeroSection'
import LanguageSelector from '../../src/components/landing/LanguageSelector'
import FeaturesSection from '../../src/components/landing/FeaturesSection'
import StatsBand from '../../src/components/landing/StatsBand'
import AboutSection from '../../src/components/landing/AboutSection'
import FaqSection from '../../src/components/landing/FaqSection'
import CtaSection from '../../src/components/landing/CtaSection'
import Footer from '../../src/components/landing/Footer'

export const metadata = { title: 'Our Original Website | NoBarriers' }

export default function OldWebsitePage() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Header homeHref="/old-website" />
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
