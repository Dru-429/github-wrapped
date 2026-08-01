'use client'

import { useState } from 'react'
import Navbar from './landing_ui/Navbar';
import Hero from './landing_ui/Hero';
import Features from './landing_ui/Features';
import Footer from './landing_ui/Footer';
import TemplateEditor from './editor/templateEditor';
import ImageUpload from './editor/sections/ImageUpload';
import type { ReadmeTemplate } from './editor/editor-state'

export default function LandingPage() {
  const [template, setTemplate] = useState<ReadmeTemplate>({})

  return (
    <main className='bg-grid min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8'>
        <Navbar />
        <Hero />
        <ImageUpload setTemplateAction={setTemplate} />
        <TemplateEditor template={template} setTemplateAction={setTemplate} />
        <Features />  {/* Feature + Gallery + Reviews + Faq */}
        <Footer />
      </div>
    </main>
  )
}
