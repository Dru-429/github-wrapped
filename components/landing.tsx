'use client'

import Navbar from './landing_ui/Navbar';
import Hero from './landing_ui/Hero';
import Features from './landing_ui/Features';
import Footer from './landing_ui/Footer';

export default function LandingPage() {
  return (
    <main className='bg-grid min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8'>
        <Navbar />
        <Hero />
        <Features />  {/* Feature + Gallery + Reviews + Faq */}
        <Footer /> 
      </div>
    </main>
  )
}
