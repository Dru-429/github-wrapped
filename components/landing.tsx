'use client'

import Navbar from './landing_ui/Navbar';
import Hero from './landing_ui/Hero';
import Working from './landing_ui/Working';
import Features from './landing_ui/Features';
import Footer from './landing_ui/Footer';
import Gallery from './landing_ui/Gallery';
import Reviews from './landing_ui/Reviews';
import Faq from './landing_ui/Faq';
import { TerminalReadme } from './landing_ui/Ternimal';

export default function LandingPage() {

  return (
    <main className='bg-grid min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8'>
        <Navbar />
        <Hero />
        <Working />
        <TerminalReadme />
        <Features />  {/* Feature + Gallery + Reviews + Faq */}
        <Gallery /> 
        <Reviews />
        <Faq />
        <Footer />
      </div>
    </main>
  )
}
