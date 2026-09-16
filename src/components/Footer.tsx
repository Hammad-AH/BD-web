import { Link } from 'react-router-dom'
import { Mail, MapPin, Instagram, Facebook, Linkedin, Twitter, ArrowUpRight, Clock } from 'lucide-react'
import { useState } from 'react'

const SERVICES = [
  { label:'Embroidery Digitizing', slug:'embroidery-digitizing' },
  { label:'Vector Artwork', slug:'vector-artwork' },
  { label:'Custom Patches', slug:'custom-patches' },
  { label:'DTF & DTG Sheets', slug:'dtf-dtg-sheets' },
  { label:'Custom Hats', slug:'custom-hats' },
]

export default function Footer(){
  const [email,setEmail] = useState('')
  const [done,setDone]=useState(false)
  return (
    <footer className="relative bg-[#060F24] text-white/60 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(800px at 15% -10%, rgba(46,155,224,0.18), transparent 60%), radial-gradient(700px at 90% 80%, rgba(21,101,192,0.22), transparent 70%), radial-gradient(500px at 50% 0%, rgba(79,195,247,0.12), transparent 60%)`}} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-accent/40 to-transparent" />
      <div className="relative max-w-[1280px] mx-auto px-6 pt-16 md:pt-20 pb-10">
        <div className="rounded-[26px] grad-brand-2 p-[1px] mb-14">
          <div className="rounded-[25px] bg-[#0A1933]/90 backdrop-blur px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-widest uppercase text-blue-light mb-3">Let's Talk</div><h3 className="font-heading font-extrabold text-[22px] md:text-[30px] leading-[1.05] text-white">Ready to bring your design to life?</h3><p className="text-white/60 text-[14px] mt-2 max-w-xl">Get a free quote in 2 hours — no bots, free revisions, lifetime backup.</p></div>
            <div className="flex gap-3 flex-shrink-0"><Link to="/get-a-quote" className="px-7 h-12 rounded-full bg-white text-navy-dark font-bold text-[14px] inline-flex items-center gap-2 hover:bg-blue-light transition">Get a Quote <ArrowUpRight className="w-4 h-4"/></Link><Link to="/portfolio" className="hidden sm:inline-flex px-7 h-12 rounded-full border border-white/25 text-white font-semibold text-[14px] items-center hover:bg-white/10 transition">View Work</Link></div>
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[14px] overflow-hidden ring-1 ring-white/10 shadow-lg"><img src="/logo.jpg" alt="" className="w-full h-full object-cover"/></div>
              <div><div className="font-heading font-extrabold text-white text-[18px] leading-none">Brode Designz</div><div className="flex items-center gap-1.5 mt-1"><div className="w-5 h-[2px] rounded-full bg-blue-light"/><div className="text-[9.5px] tracking-[0.22em] font-bold text-blue-light uppercase">Craft Stitch Create</div></div></div>
            </div>
            <p className="mt-5 text-[14px] leading-7 text-white/55 max-w-[390px]">
  Brode Designz is a professional design company specializing in embroidery digitizing, vector artwork, custom patches, and apparel graphics. We work with clients, businesses, and brands worldwide, helping them turn their logos and creative ideas into high-quality designs ready for embroidery, printing, and production.
</p>
            <div className="flex gap-2 mt-7">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/adam.brodedesignz/?hl=en"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
  >
    <Instagram className="w-4 h-4" />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/profile.php?id=100095026577995"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
  >
    <Facebook className="w-4 h-4" />
  </a>

  {/* LinkedIn */}
  <a
    href="#"
    aria-label="LinkedIn"
    className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
  >
    <Linkedin className="w-4 h-4" />
  </a>

  {/* Twitter */}
  <a
    href="#"
    aria-label="Twitter"
    className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
  >
    <Twitter className="w-4 h-4" />
  </a>
</div>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-heading font-bold text-white text-[12px] tracking-[0.14em] uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3 text-[14px]">{['Home','Services','Portfolio','About Us','FAQ','Contact','Get a Quote'].map(l=>{ const path = l==='Home'?'/': l==='Get a Quote'?'/get-a-quote': l==='About Us'?'/about': `/${l.toLowerCase().replace(' ','-')}`; return <li key={l}><Link to={path} className="hover:text-white transition flex items-center gap-1.5 group">{l} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"/></Link></li> })}</ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-white text-[12px] tracking-[0.14em] uppercase mb-5">Services</h4>
            <ul className="space-y-3 text-[14px]">{SERVICES.map(s=> <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-white transition">{s.label}</Link></li>)}</ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-white text-[12px] tracking-[0.14em] uppercase mb-5">Get In Touch</h4>
            <ul className="space-y-3.5 text-[14px]">
              <li className="flex gap-3"><span className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin className="w-4 h-4 text-blue-light"/></span><span>Serving clients worldwide<br/><span className="text-[11px] text-white/40">Remote production support</span></span></li>
              <li className="flex gap-3 items-center"><span className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0"><Mail className="w-4 h-4 text-blue-light"/></span><a href="mailto:info@brodedesignz.com" className="hover:text-white">info@brodedesignz.com</a></li>
              <li className="flex gap-3 items-center"><span className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0"><Clock className="w-4 h-4 text-blue-light"/></span>Fast replies • Worldwide service</li>
            </ul>
{/* Payment Methods */}
<div className="mt-8">
  <p className="text-[12px] font-bold tracking-[0.12em] uppercase text-white mb-5">
    Secure Payment Methods
  </p>

  <div className="flex items-center flex-wrap gap-x-7 gap-y-5">
    <img
      src="/images/payments/paypal.png"
      alt="PayPal"
      className="h-9 w-auto max-w-[85px] object-contain"
    />

    <img
      src="/images/payments/visa.png"
      alt="Visa"
      className="h-8 w-auto max-w-[70px] object-contain"
    />

    <img
      src="/images/payments/apple-pay.png"
      alt="Apple Pay"
      className="h-9 w-auto max-w-[85px] object-contain"
    />

    <img
      src="/images/payments/google-pay.png"
      alt="Google Pay"
      className="h-9 w-auto max-w-[90px] object-contain"
    />

    <img
      src="/images/payments/mastercard.png"
      alt="Mastercard"
      className="h-9 w-auto max-w-[90px] object-contain"
    />
  </div>
</div>
   <div className="mt-9">
              <p className="text-[11px] font-bold tracking-widest uppercase text-white/80 mb-2.5">Newsletter — Deals & Tips</p>
              <div className="flex gap-2 rounded-full bg-white/[0.06] border border-white/10 p-1.5 max-w-[380px]">
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="flex-1 bg-transparent px-4 text-[13px] text-white placeholder:text-white/35 focus:outline-none" />
                <button onClick={()=>{if(email){setDone(true); setEmail('')}}} className="px-5 h-9 rounded-full bg-white text-navy-dark font-bold text-[13px] hover:bg-blue-light transition flex-shrink-0">{done?'✓': 'Join'}</button>
              </div>
              {done && <p className="text-[11px] text-blue-light mt-2.5">Thanks! You're in.</p>}
            </div>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/[0.07] flex flex-col md:flex-row justify-between gap-3 text-[12px] text-white/35">
          <span>© {new Date().getFullYear()} Brode Designz. All rights reserved.</span>
          <span className="flex gap-6"><a href="#" className="hover:text-white/70">Privacy</a><a href="#" className="hover:text-white/70">Terms</a><a href="#" className="hover:text-white/70">NDA Policy</a></span>
        </div>
      </div>
    </footer>
  )
}
