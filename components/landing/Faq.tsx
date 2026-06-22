/* FAQ    */
'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { faqData } from './data'


export default function Faq() {
  return (
    <section id='faq' className='mb-10 mt-8 p-6 md:p-12'>
      <div className='mx-auto max-w-3xl '>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className='font-display text-center text-5xl font-black tracking-tight text-ink md:text-6xl'
        >
          Faq's
        </motion.h2>
        <p className='mt-3 text-center text-sm text-muted-foreground md:text-base'>
          The stuff everyone asks before clicking the button.
        </p>

        <Accordion type='single' collapsible className='mt-8 w-full'>
          {faqData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <AccordionItem
                value={`item-${item.id}`}
                className='relative boxy-sm mt-3 rounded-sm border-2 border-ink bg-cream px-4'
              >
                <AccordionTrigger className='font-display text-left text-lg font-bold text-ink hover:no-underline md:text-xl'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-base leading-relaxed text-ink/80'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
