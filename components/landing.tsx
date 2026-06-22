'use client'

import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Features from './landing/Features';
import Footer from './landing/Footer';
import Reviews from './landing/Reviews';


export default function LandingPage() {
  return (
    <main className='bg-grid min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8'>
        <Navbar />
        <Hero />
        <Features />
        <Footer /> 
      </div>
    </main>
  )
}
