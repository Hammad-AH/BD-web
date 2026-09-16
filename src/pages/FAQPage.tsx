import { useEffect, useState } from 'react'

import FAQ from '../components/FAQ'

import type { FAQItem } from '../components/FAQ'

import { Search } from 'lucide-react'

export default function FAQPage(){

  const [faqs,setFaqs]=useState<FAQItem[]>([])

  const [q,setQ]=useState('')

  const [cat,setCat]=useState('All')

  useEffect(()=>{
    document.title='FAQ – Brode Designz | Frequently Asked Questions'
    window.scrollTo(0,0)

    setFaqs([
      {
        id: 1,
        question: 'What is embroidery digitizing?',
        answer: 'Embroidery digitizing converts your logo or artwork into a stitch file that can be used by an embroidery machine.',
        category: 'Embroidery'
      },
      {
        id: 2,
        question: 'What embroidery file formats do you provide?',
        answer: 'We provide commonly used formats such as DST, PES, EXP and JEF based on your machine requirements.',
        category: 'Embroidery'
      },
      {
        id: 3,
        question: 'How long does embroidery digitizing take?',
        answer: 'Most standard designs are completed within a few hours. Turnaround depends on the size, stitch count and complexity of the design.',
        category: 'Embroidery'
      },
      {
        id: 4,
        question: 'Can you convert JPG or PNG artwork into vector?',
        answer: 'Yes. We can recreate raster artwork as clean, editable vector artwork suitable for printing, signage and production.',
        category: 'Vector'
      },
      {
        id: 5,
        question: 'What vector file formats do you provide?',
        answer: 'Common formats include AI, EPS, SVG and PDF. Other formats can also be provided when required.',
        category: 'Vector'
      },
      {
        id: 6,
        question: 'Do you create custom patches?',
        answer: 'Yes. We prepare artwork for embroidered, woven, chenille, PVC and other custom patch applications.',
        category: 'Patches'
      },
      {
        id: 7,
        question: 'Can you digitize designs for caps and hats?',
        answer: 'Yes. We create cap and hat embroidery designs, including standard cap designs and 3D puff digitizing.',
        category: 'Embroidery'
      },
      {
        id: 8,
        question: 'Do you offer revisions?',
        answer: 'Yes. Revisions are available when adjustments are needed to make the final artwork suitable for production.',
        category: 'General'
      },
      {
        id: 9,
        question: 'How can I send you my design?',
        answer: 'You can send your artwork through email or the quote request form. JPG, PNG, PDF, AI, EPS and other common formats are accepted.',
        category: 'General'
      },
      {
        id: 10,
        question: 'Do you work with clients worldwide?',
        answer: 'Yes. Brode Designz works with clients and businesses worldwide through remote production support.',
        category: 'General'
      }
    ])
  },[])

  const cats=['All', ...Array.from(new Set(faqs.map(f=>f.category).filter(Boolean) as string[]))]

  const filtered=faqs.filter(f=>{
    const mS=!q || f.question.toLowerCase().includes(q.toLowerCase()) || f.answer.toLowerCase().includes(q.toLowerCase())

    const mC=cat==='All'||f.category===cat

    return mS&&mC
  })

  return (
    <div>
      <section className="grad-brand-2 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(800px_at_50%_0%,rgba(79,195,247,0.22),transparent)]"/>

        <div className="relative max-w-[900px] mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-light text-[11px] font-bold tracking-widest uppercase">Support • 24/7 Human</div>

          <h1 className="font-heading font-extrabold text-[38px] md:text-[56px] leading-[0.92] text-white mt-5">Frequently Asked Questions</h1>

          <p className="mt-4 text-white/65 text-[15px] md:text-[17px] leading-7 max-w-xl mx-auto">Everything you need to know about digitizing, vector, patches and delivery. Still stuck? We reply in under 2h.</p>

          <div className="mt-8 relative max-w-[480px] mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"/>

            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search... e.g. turnaround, DST, revisions" className="w-full pl-12 pr-4 h-[48px] rounded-full bg-white/10 border border-white/20 backdrop-blur text-white placeholder:text-white/45 text-[14px] focus:outline-none focus:border-blue-light focus:bg-white/15 transition"/>

          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map(c=> <button key={c} onClick={()=>setCat(c)} className={`h-9 px-4 rounded-full text-[13px] font-semibold border transition ${cat===c?'bg-navy-dark text-white border-navy-dark':'bg-bg text-navy-dark border-black/5 hover:border-black/15'}`}>{c}</button>)}
        </div>

        {filtered.length ? <FAQ faqs={filtered}/> : <div className="text-center py-20 text-body text-[14px]">No FAQs found for that search in {cat}.</div>}

        <div className="mt-12 p-6 rounded-[18px] bg-bg border border-black/5 text-center">
          <p className="font-heading font-bold text-navy-dark">Still need help?</p>
          <p className="text-[13px] text-body mt-1">Email info@brodedesignz.com or call (832) 555-1234 — we respond within 2 hours, 24/7.</p>
        </div>
      </section>
    </div>
  )
}