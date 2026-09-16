import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, Mail as MailIcon, ArrowUpRight, Sparkles, Scissors, Palette, Award, Printer, Shirt } from 'lucide-react'
import BrandMark from './BrandMark'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  { label:'Embroidery Digitizing', slug:'embroidery-digitizing', desc:'DST, PES, EMB – production-ready', icon:Scissors },
  { label:'Vector Artwork', slug:'vector-artwork', desc:'AI, EPS, SVG – manual redraw', icon:Palette },
  { label:'Custom Patches', slug:'custom-patches', desc:'Embroidered, woven, PVC, chenille', icon:Award },
  { label:'DTF & DTG Sheets', slug:'dtf-dtg-sheets', desc:'Gang sheets – color corrected', icon:Printer },
  { label:'Custom Hats', slug:'custom-hats', desc:'3D puff, flat, patch – mockups', icon:Shirt },
]

export default function Header(){
  const [drawer, setDrawer] = useState(false)
  const [svcOpen, setSvcOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  const nav = useNavigate()
  useEffect(()=>{ const s=()=>setScrolled(window.scrollY>10); window.addEventListener('scroll',s); return ()=>window.removeEventListener('scroll',s) },[])
  useEffect(()=>{ setDrawer(false); setSvcOpen(false) },[loc.pathname])
  useEffect(()=>{ document.body.style.overflow = drawer ? 'hidden' : '' },[drawer])
  return (
    <>
      <div className="h-0 md:h-9 bg-navy-dark text-white/70 text-[11px] tracking-wide hidden md:flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Fast turnaround • Manual artwork • Serving clients worldwide</span>
          </div>
          <div className="flex gap-5 font-medium">
            <a href="mailto:info@brodedesignz.com" className="hover:text-white">info@brodedesignz.com</a>
            <span className="text-white/20">|</span>
            <a href="tel:+18325551234" className="hover:text-white">(832) 555-1234</a>
          </div>
        </div>
      </div>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(10,26,51,0.07)] border-b border-black/[0.04]' : 'bg-white border-b border-black/[0.03]'}`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[68px] md:h-[76px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="relative w-[46px] h-[46px] md:w-[48px] md:h-[48px] rounded-[14px] overflow-hidden shadow-[0_4px_14px_rgba(21,101,192,0.22)] ring-1 ring-black/5 group-hover:shadow-[0_6px_20px_rgba(21,101,192,0.32)] transition-all">
              <img src="/logo.jpg" alt="Brode Designz BD monogram" className="w-full h-full object-cover scale-[1.02]" />
            </div>
            <div className="leading-[1.05]">
              <div className="font-brand font-extrabold text-[18px] md:text-[19px] tracking-tight text-navy-dark">Brode Designz</div>
              <div className="flex items-center gap-1.5 mt-0.5"><div className="h-[2px] w-6 rounded-full grad-brand"/><div className="text-[9.5px] tracking-[0.22em] font-bold text-blue-accent uppercase"></div></div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5 ml-6">
            {[
              {to:'/', label:'Home'},
            ].map(l=> <NavLink key={l.to} to={l.to} className={({isActive})=>`px-[18px] h-[38px] rounded-full inline-flex items-center text-[14px] font-semibold transition ${isActive?'bg-navy-dark text-white shadow-[0_2px_10px_rgba(10,26,51,0.18)]':'text-navy-dark/80 hover:bg-bg hover:text-navy-dark'}`}>{l.label}</NavLink>)}
            <div className="relative" onMouseEnter={()=>setSvcOpen(true)} onMouseLeave={()=>setSvcOpen(false)}>
              <button className={`h-[38px] px-[18px] rounded-full inline-flex items-center gap-1.5 text-[14px] font-semibold transition focus-ring ${loc.pathname.startsWith('/services')?'bg-navy-dark text-white':'text-navy-dark/80 hover:bg-bg hover:text-navy-dark'}`} aria-expanded={svcOpen} aria-haspopup="true">
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${svcOpen?'rotate-180':''}`}/>
              </button>
              <AnimatePresence>
                {svcOpen && (
                  <motion.div initial={{opacity:0,y:12,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:0.98}} transition={{duration:0.22,ease:[0.16,1,0.3,1]}} className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[340px] bg-white rounded-[20px] shadow-[0_20px_60px_rgba(10,26,51,0.18),0_0_0_1px_rgba(10,26,51,0.06)] overflow-hidden">
                    <div className="p-2.5">
                      {SERVICES.map(s=>(
                        <Link key={s.slug} to={`/services/${s.slug}`} className="flex gap-3.5 px-3.5 py-3.5 rounded-[14px] hover:bg-bg group transition">
                          <div className="w-10 h-10 rounded-[12px] bg-bg-2 border border-black/[0.04] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition"><s.icon className="w-[19px] h-[19px] text-navy-dark"/></div>
                          <div className="min-w-0"><div className="font-heading font-bold text-[14px] text-navy-dark group-hover:text-blue-mid transition">{s.label}</div><div className="text-[12px] text-body mt-0.5 leading-4">{s.desc}</div></div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-3 pb-3"><Link to="/services" className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-navy-dark text-white text-[13px] font-bold hover:bg-navy-mid transition">View all services <ArrowUpRight className="w-4 h-4"/></Link></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {[{to:'/portfolio',label:'Portfolio'},{to:'/about',label:'About'},{to:'/contact',label:'Contact'}].map(l=> <NavLink key={l.to} to={l.to} className={({isActive})=>`px-[18px] h-[38px] rounded-full inline-flex items-center text-[14px] font-semibold transition ${isActive?'bg-navy-dark text-white shadow-[0_2px_10px_rgba(10,26,51,0.18)]':'text-navy-dark/80 hover:bg-bg hover:text-navy-dark'}`}>{l.label}</NavLink>)}
          </nav>

          <div className="flex items-center gap-2.5 ml-auto lg:ml-0">
            <div className="hidden xl:flex items-center gap-2 pl-4 ml-2 border-l border-black/10">
              <div className="text-right leading-tight"><div className="text-[11px] font-bold tracking-widest uppercase text-body-2">Email Us</div><a href="mailto:info@brodedesignz.com" className="font-heading font-bold text-[14px] text-navy-dark hover:text-blue-mid">info@brodedesignz.com</a></div>
              <div className="w-10 h-10 rounded-full bg-bg-2 border border-black/5 flex items-center justify-center text-navy-dark"><MailIcon className="w-4 h-4"/></div>
            </div>
            <Link to="/get-a-quote" className="hidden md:inline-flex items-center gap-2 h-[42px] px-6 rounded-full btn-primary text-[14px] font-bold tracking-wide focus-ring">
              <Sparkles className="w-4 h-4"/> Get a Quote
            </Link>
            <button onClick={()=>setDrawer(!drawer)} className="lg:hidden w-11 h-11 rounded-full bg-navy-dark text-white flex items-center justify-center focus-ring flex-shrink-0" aria-label="Toggle menu">{drawer ? <X className="w-[18px] h-[18px]"/> : <Menu className="w-[18px] h-[18px]"/>}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawer && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] lg:hidden">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-navy-dark/45 backdrop-blur-[6px]" onClick={()=>setDrawer(false)} />
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping:32, stiffness:380}} className="absolute right-0 top-0 h-full w-[86%] max-w-[380px] bg-white shadow-2xl flex flex-col">
              <div className="h-[68px] px-6 flex items-center justify-between border-b border-black/5 flex-shrink-0">
                <div className="flex items-center gap-3"><img src="/logo.jpg" alt="" className="w-9 h-9 rounded-[10px] object-cover"/><span className="font-brand font-extrabold text-[16px]">Brode Designz</span></div>
                <button onClick={()=>setDrawer(false)} className="w-9 h-9 rounded-full bg-bg flex items-center justify-center"><X className="w-5 h-5"/></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                <Link to="/" className="flex items-center justify-between py-3.5 text-[17px] font-semibold text-navy-dark border-b border-black/5">Home</Link>
                <div className="py-1">
                  <button onClick={()=>setSvcOpen(!svcOpen)} className="flex items-center justify-between w-full py-3.5 text-[17px] font-semibold text-navy-dark border-b border-black/5">Services <ChevronDown className={`w-5 h-5 transition ${svcOpen?'rotate-180':''}`}/></button>
                  <AnimatePresence>
                    {svcOpen && (
                      <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                        <div className="pl-3 ml-2 border-l-[2.5px] border-blue-accent/25 my-3 space-y-1">
                          {SERVICES.map(s=> <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-center gap-3 py-3 text-[14.5px] font-medium text-body hover:text-navy-dark"><s.icon className="w-4 h-4 text-navy-dark"/>{s.label}</Link>)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {[{to:'/services',label:'All Services'},{to:'/portfolio',label:'Portfolio'},{to:'/about',label:'About Us'},{to:'/faq',label:'FAQ'},{to:'/contact',label:'Contact'}].map(l=> <Link key={l.to} to={l.to} className="flex items-center justify-between py-3.5 text-[17px] font-semibold text-navy-dark border-b border-black/5">{l.label}</Link>)}
              </div>
              <div className="p-6 border-t border-black/5 space-y-3 bg-bg/60">
                <a href="mailto:info@brodedesignz.com" className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-white border border-black/10 text-navy-dark font-bold text-[14px]"><MailIcon className="w-4 h-4"/> Email Us</a>
                <Link to="/get-a-quote" className="flex items-center justify-center gap-2 w-full h-12 rounded-full btn-primary font-bold text-[14px]"><Sparkles className="w-4 h-4"/> Get a Free Quote</Link>
                <p className="text-center text-[11px] text-body-2">Fast replies • Worldwide service</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky quote */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 safe-bottom">
        <div className="m-3 rounded-[18px] bg-navy-dark/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] p-2 flex gap-2">
          <a href="tel:+18325551234" className="flex-1 h-[48px] rounded-full bg-white/10 border border-white/15 text-white font-bold text-[14px] flex items-center justify-center gap-2">Call Now</a>
          <button onClick={()=>nav('/get-a-quote')} className="flex-[1.4] h-[48px] rounded-full bg-white text-navy-dark font-extrabold text-[14px] flex items-center justify-center gap-2">Get Quote <ArrowUpRight className="w-4 h-4"/></button>
        </div>
      </div>
      <div className="h-[0px] lg:hidden" />
    </>
  )
}