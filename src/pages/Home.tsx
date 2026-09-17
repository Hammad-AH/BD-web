import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Zap, ShieldCheck, Clock3, Users2, BadgeCheck, Sparkles, ArrowRight, Play, Scissors, Palette, Award, Printer, Shirt, MessageCircle } from 'lucide-react'
import BrandMark from '../components/BrandMark'
import { localPortfolioItems } from '../data/portfolio'
import Stats from '../components/Stats'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import type { FAQItem } from '../components/FAQ'
import type { Testimonial } from '../components/Testimonials'
import BeforeAfter from '../components/BeforeAfter'

const SVCS = [
  { slug:'embroidery-digitizing', title:'Embroidery Digitizing', desc:'Manual production-ready digitizing for DST, PES, JEF, EXP and EMB.', icon:Scissors, stat:'From $15' },
  { slug:'vector-artwork', title:'Vector Artwork', desc:'Clean manual redraws for print, signs, cutting and apparel production.', icon:Palette, stat:'From $12' },
  { slug:'custom-patches', title:'Custom Patches', desc:'Embroidered, woven, PVC, chenille and leather patch artwork.', icon:Award, stat:'Custom quote' },
  { slug:'dtf-dtg-sheets', title:'DTF & DTG Sheets', desc:'Production-ready gang sheets with clean layouts and color correction.', icon:Printer, stat:'Custom quote' },
  { slug:'custom-hats', title:'Custom Hats', desc:'3D puff, flat embroidery and patch-ready hat artwork with mockups.', icon:Shirt, stat:'Custom quote' },
  { slug:'vehicle-graphics-wraps', title:'Vehicle Graphics & Wraps', desc:'Custom livery, vinyl graphics, fleet branding and print-ready cut artwork.', icon:Zap, stat:'Custom quote' },
]
const WHY = [
  { icon:Zap, title:'Fast Turnaround', desc:'Clear turnaround times and quick communication so production keeps moving.' },
  { icon:ShieldCheck, title:'Production Focused', desc:'Artwork is prepared for real embroidery, print and apparel production.' },
  { icon:Users2, title:'Manual Artwork', desc:'No blind auto-tracing — artwork is reviewed and prepared with production in mind.' },
  { icon:Clock3, title:'Easy Communication', desc:'Send your artwork, tell us what you need and get a straightforward quote.' },
]
const HOME_FAQS: FAQItem[] = [
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
]

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Reyes',
    company: 'Ironclad Apparel Co.',
    role: 'Owner',
    rating: 5,
    content: 'Brode Designz digitized our logo for embroidery and the sew-out was perfect on the first try. Fast turnaround and great communication.',
  },
  {
    id: 2,
    name: 'Dana Whitfield',
    company: 'Whitfield Screen Printing',
    role: 'Production Manager',
    rating: 5,
    content: 'We send them all our vector redraw work now. Clean paths, accurate colors, and they always hit the deadline we need.',
  },
  {
    id: 3,
    name: 'Omar Haddad',
    company: 'Haddad Custom Caps',
    role: 'Founder',
    rating: 4,
    content: 'Solid digitizing quality for our hat orders. The 3D preview before production saved us from a couple of costly mistakes.',
  },
  {
    id: 4,
    name: 'Lauren Kim',
    company: 'Kim & Co. Promo',
    role: 'Creative Director',
    rating: 5,
    content: 'Custom patch artwork came back exactly as we asked, with useful suggestions on stitch density we hadn\'t thought of.',
  },
]

function ClientReviewForm(){

  const [open,setOpen] = useState(false)

  const [submitting,setSubmitting] = useState(false)

  const [message,setMessage] = useState('')

  const [form,setForm] = useState({
    name:'',
    company:'',
    email:'',
    rating:5,
    review:'',
    image:null as File|null
  })


  const submitReview = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    setSubmitting(true)
    setMessage('')

    try{

      const fd = new FormData()

      fd.append('name',form.name)
      fd.append('company',form.company)
      fd.append('email',form.email)
      fd.append('rating',String(form.rating))
      fd.append('review',form.review)

      if(form.image){
        fd.append('image',form.image)
      }

      const response = await fetch('/api/testimonials',{
        method:'POST',
        body:fd
      })

      if(!response.ok){
        throw new Error('Review submission failed')
      }

      setForm({
        name:'',
        company:'',
        email:'',
        rating:5,
        review:'',
        image:null
      })

      setMessage(
        'Thank you. Your review has been submitted for approval.'
      )

    }catch{

      setMessage(
        'We could not submit your review right now. Please try again or contact us.'
      )

    }finally{

      setSubmitting(false)

    }

  }


  return (

    <div className="mt-8 rounded-[22px] bg-white border border-black/5 shadow-[0_10px_30px_rgba(10,26,51,.06)] p-6 md:p-8">

      <div className="flex flex-col md:flex-row items-center justify-between gap-5">

        <div>

          <h3 className="font-heading font-bold text-[20px] text-navy-dark">
            Are you a Brode Designz client?
          </h3>

          <p className="text-[13.5px] leading-6 text-body mt-1">
            Trusted clients can share their experience, rating and a profile or company image.
          </p>

        </div>


        <button
          type="button"
          onClick={()=>{
            setOpen(!open)
            setMessage('')
          }}
          className="h-11 px-6 rounded-full btn-dark text-[14px] font-bold inline-flex items-center gap-2 whitespace-nowrap"
        >
          {open ? 'Close Review Form' : 'Leave a Review'}

          <ArrowUpRight className="w-4 h-4"/>

        </button>

      </div>


      {open && (

        <form
          onSubmit={submitReview}
          className="mt-7 pt-7 border-t border-black/5"
        >

          <div className="grid md:grid-cols-2 gap-5">


            {/* Name */}
            <label className="block">

              <span className="text-[12px] font-bold text-navy-dark">
                Full Name
              </span>

              <input
                required
                value={form.name}
                onChange={e=>setForm({
                  ...form,
                  name:e.target.value
                })}
                className="mt-2 w-full h-11 rounded-[12px] border border-black/10 bg-bg px-4 text-[13px] outline-none focus:border-blue-mid"
                placeholder="Your name"
              />

            </label>


            {/* Company */}
            <label className="block">

              <span className="text-[12px] font-bold text-navy-dark">
                Company / Business
              </span>

              <input
                value={form.company}
                onChange={e=>setForm({
                  ...form,
                  company:e.target.value
                })}
                className="mt-2 w-full h-11 rounded-[12px] border border-black/10 bg-bg px-4 text-[13px] outline-none focus:border-blue-mid"
                placeholder="Company name"
              />

            </label>


            {/* Email */}
            <label className="block">

              <span className="text-[12px] font-bold text-navy-dark">
                Email
              </span>

              <input
                required
                type="email"
                value={form.email}
                onChange={e=>setForm({
                  ...form,
                  email:e.target.value
                })}
                className="mt-2 w-full h-11 rounded-[12px] border border-black/10 bg-bg px-4 text-[13px] outline-none focus:border-blue-mid"
                placeholder="you@company.com"
              />

            </label>


            {/* Rating */}
            <label className="block">

              <span className="text-[12px] font-bold text-navy-dark">
                Rating
              </span>

              <select
                value={form.rating}
                onChange={e=>setForm({
                  ...form,
                  rating:Number(e.target.value)
                })}
                className="mt-2 w-full h-11 rounded-[12px] border border-black/10 bg-bg px-4 text-[13px] outline-none focus:border-blue-mid"
              >

                <option value={5}>
                  ★★★★★ — 5 Stars
                </option>

                <option value={4}>
                  ★★★★☆ — 4 Stars
                </option>

                <option value={3}>
                  ★★★☆☆ — 3 Stars
                </option>

                <option value={2}>
                  ★★☆☆☆ — 2 Stars
                </option>

                <option value={1}>
                  ★☆☆☆☆ — 1 Star
                </option>

              </select>

            </label>

          </div>


          {/* Review */}
          <label className="block mt-5">

            <span className="text-[12px] font-bold text-navy-dark">
              Your Review
            </span>

            <textarea
              required
              rows={5}
              value={form.review}
              onChange={e=>setForm({
                ...form,
                review:e.target.value
              })}
              className="mt-2 w-full rounded-[12px] border border-black/10 bg-bg px-4 py-3 text-[13px] leading-6 outline-none focus:border-blue-mid resize-none"
              placeholder="Tell us about your experience with Brode Designz..."
            />

          </label>


          {/* Image */}
          <label className="block mt-5">

            <span className="text-[12px] font-bold text-navy-dark">
              Profile / Company Image
              <span className="font-normal text-body">
                {' '} (optional)
              </span>
            </span>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={e=>setForm({
                ...form,
                image:e.target.files?.[0] || null
              })}
              className="mt-2 block w-full text-[12px] text-body file:mr-4 file:rounded-full file:border-0 file:bg-navy-dark file:px-4 file:py-2 file:text-white file:font-semibold"
            />

          </label>


          {/* Submit */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">

            <button
              type="submit"
              disabled={submitting}
              className="h-11 px-7 rounded-full grad-brand text-white font-bold text-[14px] disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>

            <p className="text-[12px] text-body">
              Reviews are checked before they appear publicly.
            </p>

          </div>


          {/* Message */}
          {message && (

            <div className="mt-4 rounded-[12px] bg-bg border border-black/5 px-4 py-3 text-[13px] text-navy-dark">
              {message}
            </div>

          )}

        </form>

      )}

    </div>

  )
}

export default function Home(){
  const [portfolio,setPortfolio]=useState<any[]>([])
  const [faqs,setFaqs]=useState<FAQItem[]>([])
  const [tests,setTests]=useState<Testimonial[]>([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
  document.title='Brode Designz – Embroidery Digitizing, Vector Art & Custom Patches | Houston, TX'

  Promise.all([
    fetch('/api/portfolio').then(r=>r.json()).catch(()=>[]),
    fetch('/api/testimonials').then(r=>r.json()).catch(()=>[])
  ])
    .then(([p,t])=>{
      setPortfolio(p)
      setFaqs(HOME_FAQS)
      setTests(t)
    })
    .finally(()=>setLoading(false))
},[])

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 grad-brand-2" />
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`}} />
        <div className="absolute inset-0 bg-[radial-gradient(900px_at_80%_-20%,rgba(79,195,247,0.28),transparent_60%),radial-gradient(700px_at_0%_90%,rgba(10,26,51,0.55),transparent_60%)]" />
        <div className="relative max-w-[1280px] mx-auto px-6 pt-12 md:pt-20 pb-12 md:pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:[0.16,1,0.3,1]}} className="lg:col-span-7 text-white">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.10] border border-white/15 backdrop-blur text-[11px] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)] animate-pulse"/> Manual artwork • Production-ready files • Worldwide service
            </div>
            <h1 className="font-heading font-extrabold text-[36px] sm:text-[44px] md:text-[60px] leading-[0.92] tracking-[-0.035em] mt-6 text-white">We turn rough art into <br/><span className="text-blue-light">production-perfect</span><br/>stitches, vectors & patches</h1>
            <p className="mt-5 text-[16px] md:text-[18px] leading-7 text-white/70 max-w-[560px]">Embroidery digitizing, manual vector artwork, custom patches, DTF/DTG sheets and custom hats — prepared for real production, not just a pretty screen preview.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/get-a-quote" className="h-[48px] px-7 rounded-full bg-white text-navy-dark font-bold text-[14.5px] inline-flex items-center gap-2 hover:bg-blue-light transition shadow-[0_10px_30px_rgba(0,0,0,0.25)] focus-ring">Get a Free Quote <ArrowUpRight className="w-[18px] h-[18px]"/></Link>
              <Link to="/portfolio" className="h-[48px] px-7 rounded-full border border-white/25 bg-white/5 backdrop-blur text-white font-semibold text-[14.5px] inline-flex items-center gap-2 hover:bg-white/10 transition focus-ring"><Play className="w-4 h-4 fill-white"/> View Our Work</Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-8 text-[13px] font-medium text-white/65">
              <span className="inline-flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white"/></span> Free 3D preview & revisions</span>
              <span className="inline-flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white"/></span> DST, PES, AI, SVG, EPS, PDF</span>
              <span className="inline-flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white"/></span> NDA • Lifetime backup</span>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,y:22,scale:0.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.7,delay:0.12,ease:[0.16,1,0.3,1]}} className="lg:col-span-5 relative">
            <div className="relative rounded-[26px] bg-white p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="rounded-[18px] overflow-hidden aspect-[4/3.2] bg-bg-2 relative">
                <div className="w-full h-full p-2">
  <video
    src="/videos/tajima-embroidery.mp4"
    poster="/portfolio/tajima-hero.jpg"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover rounded-[12px]"
  />
</div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                  <div className="flex-1 rounded-[12px] bg-white/90 backdrop-blur px-3 py-2.5 border border-black/5 shadow"><div className="text-[10px] font-bold tracking-widest uppercase text-body-2">File Quality</div><div className="font-heading font-bold text-[13px] text-navy-dark flex items-center gap-1"><BadgeCheck className="w-4 h-4 text-emerald-600"/> Production Ready</div></div>
                  <div className="flex-1 rounded-[12px] bg-navy-dark text-white px-3 py-2.5 shadow"><div className="text-[10px] font-bold tracking-widest uppercase text-white/50">Sew Test</div><div className="font-heading font-bold text-[13px]">✓ Passed</div></div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-[16px] px-4 py-3 shadow-[0_12px_32px_rgba(10,26,51,0.18)] border border-black/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><Zap className="w-5 h-5"/></div>
                <div><div className="font-heading font-bold text-[13px] text-navy-dark leading-none">Avg. 6h delivery</div><div className="text-[11px] text-body mt-1">Fastest in industry</div></div>
              </div>
              <div className="absolute -top-4 -right-3 bg-navy-dark text-white rounded-[16px] px-4 py-3 shadow-[0_16px_36px_rgba(0,0,0,0.3)]">
                <div className="text-[10px] font-bold tracking-widest uppercase text-white/50">What we deliver</div>
                <div className="font-heading font-extrabold text-[16px] leading-none mt-1">Production-ready files</div>
                <div className="text-[11px] text-white/60 mt-1">Embroidery • Vector • Patches</div>
              </div>
            </div>
            <div className="mt-8 rounded-[16px] bg-white/10 border border-white/10 backdrop-blur px-4 py-3 flex items-center gap-4 text-white/80 text-[11px] font-semibold tracking-wide">
              <span className="flex items-center gap-2"><BrandMark brand="wilcom" size={26}/> Wilcom</span>
              <span className="flex items-center gap-2"><BrandMark brand="illustrator" size={26}/> Illustrator</span>
              <span className="hidden sm:flex items-center gap-2"><BrandMark brand="corel" size={26}/> CorelDRAW</span>
              <span className="hidden md:flex items-center gap-2"><BrandMark brand="photoshop" size={26}/> Photoshop</span>
            </div>
          </motion.div>
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-navy-dark via-blue-mid to-blue-light" />
      </section>

      {/* Logos / Trust */}
      <section className="bg-bg border-y border-black/[0.04] py-7 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-body-2">Tools & Formats We Master:</div>
          <div className="flex flex-wrap gap-6 md:gap-10 text-[13px] font-semibold text-navy-dark/65">
            {[
  ['Wilcom E4.5','wilcom'],['Illustrator CC','illustrator'],['CorelDRAW','corel'],['Photoshop','photoshop']
].map(([label,brand])=> <span key={label} className="inline-flex items-center gap-2"><BrandMark brand={brand as any} size={30}/>{label}</span>)}
          </div>
        </div>
      </section>

      {/* About Value */}
      <section className="py-16 md:py-24 px-6 max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="rounded-[28px] p-[1px] grad-brand-2">
            <div className="rounded-[27px] overflow-hidden bg-white">
              <div className="grid grid-cols-2 gap-2 p-2 bg-bg-2"><img src="/portfolio/tajima-1.jpg" alt="Tajima embroidery machine close-up" className="w-full aspect-square object-cover rounded-[14px]" loading="lazy"/><img src="/portfolio/tajima-2.jpg" alt="Row of Tajima embroidery heads in production" className="w-full aspect-square object-cover rounded-[14px]" loading="lazy"/><img src="/portfolio/tajima-3.jpg" alt="Embroidery thread color spools" className="w-full aspect-square object-cover rounded-[14px]" loading="lazy"/><img src="/portfolio/tajima-4.jpg" alt="Tajima machine stitching a design" className="w-full aspect-square object-cover rounded-[14px]" loading="lazy"/></div>
            </div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-[18px] bg-white/92 backdrop-blur-xl border border-black/5 shadow-[0_16px_40px_rgba(10,26,51,0.16)] px-5 py-4 grid grid-cols-3 gap-4">
            {[['99.2%', 'Approval'],['<2h', 'Avg Reply'],['100%', 'Secure']].map(([k,v])=> <div key={v} className="text-center"><div className="font-heading font-extrabold text-[18px] tracking-tight text-navy-dark">{k}</div><div className="text-[10px] font-bold tracking-widest uppercase text-body-2 mt-0.5">{v}</div></div>)}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-pale text-blue-mid text-[11px] font-bold tracking-widest uppercase"><Sparkles className="w-3.5 h-3.5"/> Why Brode Designz</div>
          <h2 className="font-heading font-extrabold text-[28px] md:text-[42px] leading-[1.05] mt-4">Craftsmanship + <span className="grad-text">Modern Tech</span> = Perfect Sew Every Time</h2>
          <p className="mt-4 text-[15px] leading-7 text-body max-w-[560px]">Brode Designz focuses on clean, production-ready artwork. We handle embroidery digitizing and manual vector redraws with the details that matter in real apparel production — stitch direction, density, clean paths, sizing and output formats.</p>
          <ul className="mt-7 space-y-3.5">
            {['Manual Wilcom E4.5 – no auto-digitize, ever','Free stitch 3D preview + sew-out report before production','Dedicated account manager for bulk shops (Slack / WhatsApp)','Lifetime encrypted backup – re-order in 60 seconds'].map(it=> <li key={it} className="flex gap-3 text-[14px]"><span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-4 h-4"/></span><span className="font-medium text-navy-dark leading-snug">{it}</span></li>)}
          </ul>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-full btn-ghost text-[14px] font-semibold focus-ring">Our story <ArrowRight className="w-4 h-4"/></Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-bg py-16 md:py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
            <div className="max-w-xl"><div className="inline-flex px-3 py-1 rounded-full bg-navy-dark text-white text-[11px] font-bold tracking-widest uppercase">What We Do</div><h2 className="font-heading font-extrabold text-[30px] md:text-[44px] leading-[1.05] mt-4">One studio for every production file you need</h2><p className="text-[15px] leading-6 text-body mt-3">From digitizing to patches to gang sheets – consistent quality, one invoice, one contact.</p></div>
            <Link to="/services" className="hidden md:inline-flex items-center gap-2 h-11 px-6 rounded-full btn-dark text-[14px] font-semibold">View all services <ArrowUpRight className="w-4 h-4"/></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {SVCS.map(s=> (
              <Link key={s.slug} to={`/services/${s.slug}`} className="group relative bg-white rounded-[22px] p-7 border border-black/[0.05] card-hover overflow-hidden flex flex-col">
                <div className="flex justify-between items-start"><div className="w-12 h-12 rounded-[14px] bg-bg-2 border border-black/[0.04] flex items-center justify-center group-hover:scale-105 transition"><s.icon className="w-6 h-6 text-navy-dark"/></div><span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-bg border border-black/5 text-navy-dark/70">{s.stat}</span></div>
                <h3 className="font-heading font-bold text-[18px] mt-5 text-navy-dark group-hover:text-blue-mid transition">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-body flex-1">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-navy-dark group-hover:gap-2.5 transition-all">Learn more <ArrowUpRight className="w-4 h-4"/></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-pale to-transparent blur-xl opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* Portfolio Highlights */}
      <section className="py-16 md:py-24 px-6 max-w-[1280px] mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div><div className="inline-flex px-3 py-1 rounded-full bg-blue-pale text-blue-mid text-[11px] font-bold tracking-widest uppercase">Portfolio</div><h2 className="font-heading font-extrabold text-[28px] md:text-[42px] leading-[1.05] mt-4">Before / After transformation that sells itself</h2><p className="text-[14px] text-body mt-2 max-w-xl">Drag the handle – see how we turn rough client files into production-perfect stitch & print.</p></div>
          <Link to="/portfolio" className="inline-flex items-center gap-2 h-11 px-6 rounded-full btn-ghost text-[14px] font-semibold">View full portfolio <ArrowUpRight className="w-4 h-4"/></Link>
        </div>
        {loading ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({length:6}).map((_,i)=> <div key={i} className="aspect-[4/3] rounded-[18px] bg-bg animate-pulse"/> )}</div> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {(portfolio.length ? portfolio.slice(0,6) : localPortfolioItems.slice(0,6)).map((it:any)=> (
              <div key={it.id} className="group rounded-[18px] overflow-hidden border border-black/5 bg-white shadow-[0_8px_28px_rgba(10,26,51,.06)]">
                <div className="aspect-[4/3] overflow-hidden bg-bg-2">
                  {it.before_image && it.after_image ? <BeforeAfter before={it.before_image} after={it.after_image} alt={it.title}/> : <img src={it.image || it.after_image || it.before_image} alt={it.title} className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition duration-500" loading="lazy"/>}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3"><div><div className="font-heading font-bold text-[14.5px] text-navy-dark leading-tight">{it.title}</div><div className="text-[12px] text-body mt-1">{it.description || 'Production-ready artwork sample.'}</div></div><span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full bg-bg border border-black/5 text-navy-dark/70 whitespace-nowrap">{it.service_type || it.category}</span></div>
                  <div className="mt-3 text-[11.5px] font-semibold text-blue-mid">Click in Portfolio for project details →</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="relative bg-navy-dark overflow-hidden py-16 md:py-24 px-6">
        <div className="absolute inset-0" style={{background:`radial-gradient(700px at 20% 10%, rgba(46,155,224,0.28), transparent 60%), radial-gradient(600px at 90% 90%, rgba(21,101,192,0.30), transparent 60%)`}} />
        <div className="relative max-w-[1280px] mx-auto">
          <div className="max-w-2xl"><h2 className="font-heading font-extrabold text-[30px] md:text-[44px] leading-[1.05] text-white">Built for apparel brands that can't afford a bad sew</h2><p className="mt-4 text-white/60 text-[15px] leading-7">We obsess over underlay, pull compensation, sequencing – so your production line doesn't stop for fixes.</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-12">
            {WHY.map(w=>{ const Icon=w.icon; return (<div key={w.title} className="rounded-[20px] bg-white/[0.06] border border-white/10 p-7 backdrop-blur hover:bg-white/[0.08] transition group"><div className="w-11 h-11 rounded-[12px] bg-white text-navy-dark flex items-center justify-center group-hover:scale-105 transition"><Icon className="w-5 h-5"/></div><h4 className="font-heading font-bold text-white mt-5 text-[16px]">{w.title}</h4><p className="mt-2 text-[13.5px] leading-6 text-white/60">{w.desc}</p></div>)})}
          </div>
          <div className="mt-10 p-[1px] rounded-[18px] bg-gradient-to-r from-white/15 via-blue-light/20 to-transparent"><div className="rounded-[17px] bg-white/[0.04] backdrop-blur px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/70"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-navy-dark flex items-center justify-center font-bold text-[12px]">✓</div><span><strong className="text-white">No bots</strong> – every file manually checked by a senior digitizer before delivery</span></div><Link to="/get-a-quote" className="h-9 px-5 rounded-full bg-white text-navy-dark font-bold text-[13px] inline-flex items-center gap-1.5">Talk to an expert <ArrowUpRight className="w-4 h-4"/></Link></div></div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 px-6 bg-bg border-y border-black/[0.04]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-heading font-extrabold text-[26px] md:text-[36px] text-center">From upload to production in 4 steps</h2>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6 mt-12 relative">
            <div className="hidden md:block absolute top-[20px] left-[14%] right-[14%] h-[2px] bg-gradient-to-r from-navy-dark/15 via-blue-mid/25 to-blue-light/30" />
            {[
              {n:'1', t:'Send Artwork', d:'Upload PNG, JPG, AI, PDF – even a photo of existing stitch.'},
              {n:'2', t:'We Digitize / Vectorize', d:'Manual Wilcom / Illustrator work – senior artist assigned.'},
              {n:'3', t:'Proof & Revise', d:'3D preview + sew-out report. Free tweaks until you love it.'},
              {n:'4', t:'Production File', d:'DST, PES, AI, SVG + lifetime backup. Ready to run.'},
            ].map(s=> (
              <div key={s.n} className="text-center relative">
                <div className="w-10 h-10 rounded-full grad-brand text-white font-extrabold flex items-center justify-center mx-auto shadow-[0_6px_18px_rgba(21,101,192,0.35)] ring-4 ring-white">{s.n}</div>
                <h4 className="font-heading font-bold mt-5 text-[15px]">{s.t}</h4>
                <p className="text-[13px] leading-6 text-body mt-1.5 max-w-[240px] mx-auto">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
<section className="py-16 md:py-24 px-6 max-w-[1280px] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start">

  <div className="lg:sticky lg:top-[100px]">

    <div className="inline-flex px-3 py-1 rounded-full bg-bg border border-black/5 text-navy-dark text-[11px] font-bold tracking-widest uppercase">
      FAQ
    </div>

    <h2 className="font-heading font-extrabold text-[30px] md:text-[38px] leading-[1.08] mt-4">
      Got questions? We've got stitches.
    </h2>

    <p className="mt-4 text-[14.5px] leading-6 text-body">
      Real questions from shops like yours – pricing, turnaround, formats, revisions. Can't find it? We reply in &lt;2h.
    </p>

    <div className="mt-8 rounded-[18px] bg-navy-dark p-6 text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(400px_at_100%_0%,rgba(79,195,247,0.25),transparent)]" />

      <div className="relative">

        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <MessageCircle className="w-5 h-5 text-blue-light"/>
        </div>

        <h4 className="font-heading font-bold text-white">
          Still stuck?
        </h4>

        <p className="text-[13px] leading-6 text-white/60 mt-1">
          Chat live – real humans, no bots. 24/7.
        </p>

        <Link
          to="/contact"
          className="mt-4 inline-flex h-9 px-5 rounded-full bg-white text-navy-dark font-bold text-[13px] items-center"
        >
          Contact Us
        </Link>

      </div>
    </div>

  </div>

  <div>
    {loading ? (
      <div className="space-y-3">
        {Array.from({length:5}).map((_,i)=>(
          <div
            key={i}
            className="h-16 rounded-[18px] bg-bg animate-pulse"
          />
        ))}
      </div>
    ) : (
      <FAQ faqs={HOME_FAQS} />
    )}
  </div>

</section>

 {/* Testimonials */}
<section className="bg-bg py-16 md:py-24 px-6 border-y border-black/[0.04]">
  <div className="max-w-[1080px] mx-auto">

    <div className="text-center max-w-2xl mx-auto mb-10">
      <div className="inline-flex px-3 py-1 rounded-full bg-navy-dark text-white text-[11px] font-bold tracking-widest uppercase">
        Testimonials
      </div>

      <h2 className="font-heading font-extrabold text-[30px] md:text-[42px] leading-[1.05] mt-4">
        Client reviews
      </h2>

      <p className="mt-3 text-[14.5px] text-body">
        See what clients say about working with Brode Designz.
      </p>
    </div>

    {loading && (
      <div className="h-52 rounded-[22px] bg-white animate-pulse" />
    )}

    {!loading && tests.length > 0 && (
      <Testimonials items={tests} />
    )}

    {!loading && tests.length === 0 && (
      <Testimonials items={SEED_TESTIMONIALS} />
    )}

    {/* Leave A Review */}
    <ClientReviewForm />

  </div>
</section>

{/* Final CTA */}
<section className="relative overflow-hidden">
  <div className="absolute inset-0 grad-brand-2" />

  <div className="absolute inset-0 bg-[radial-gradient(900px_at_85%_-10%,rgba(79,195,247,0.32),transparent_60%)]" />

  <div className="relative max-w-[1280px] mx-auto px-6 py-16 md:py-20">
    <div className="rounded-[28px] bg-white/[0.06] border border-white/15 backdrop-blur-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-widest uppercase text-blue-light">
          Free Quote • 2h Response
        </div>

        <h2 className="font-heading font-extrabold text-[28px] md:text-[40px] leading-[1.05] text-white mt-4 max-w-xl">
          Get your production file tonight — not next week.
        </h2>

        <p className="mt-3 text-white/65 text-[15px] leading-6 max-w-xl">
          Send your artwork now. We'll review and send accurate pricing + turnaround. No obligation.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full md:w-auto">
        <Link
          to="/get-a-quote"
          className="h-[52px] px-8 rounded-full bg-white text-navy-dark font-extrabold text-[15px] inline-flex items-center justify-center gap-2 hover:bg-blue-light transition shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
        >
          Get My Free Quote
          <ArrowUpRight className="w-5 h-5" />
        </Link>

        <p className="text-center text-[11px] text-white/50">
          ✓ Free preview • ✓ Free revisions • ✓ NDA secure
        </p>
      </div>

    </div>
  </div>
</section>
    </div>
  )
}
