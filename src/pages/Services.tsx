import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import BrandMark from '../components/BrandMark'
const SERVICES = [
  { slug:'embroidery-digitizing', title:'Embroidery Digitizing', icon:'embroidery' as const, desc:'Manual production-ready digitizing for DST, PES, JEF, EXP and EMB. 3D puff, applique, small lettering and cap work.', points:['Manual digitizing','3D preview + stitch count','Machine-ready formats'], stat:'From $15' },
  { slug:'vector-artwork', title:'Vector Artwork', icon:'vector' as const, desc:'Manual vector redraws for clean print, cut and sign production. AI, EPS, SVG, PDF and more.', points:['Manual rebuild','Unlimited resolution','Print & cut ready'], stat:'From $12' },
  { slug:'custom-patches', title:'Custom Patches', icon:'patches' as const, desc:'Embroidered, woven, PVC, chenille and leather patch artwork with clean production specifications.', points:['Digital mockup','Multiple backing options','Bulk support'], stat:'Custom quote' },
  { slug:'dtf-dtg-sheets', title:'DTF & DTG Sheets', icon:'dtf' as const, desc:'Gang sheets prepared for apparel printing with clean layouts, color correction and production-ready files.', points:['Color corrected','300 DPI artwork','Gang-sheet optimized'], stat:'Custom quote' },
  { slug:'custom-hats', title:'Custom Hats', icon:'hats' as const, desc:'3D puff, flat embroidery and patch-ready hat artwork with front, side and back mockups.', points:['Hat mockups','3D puff options','Production-ready files'], stat:'Custom quote' },
  { slug:'vehicle-graphics-wraps', title:'Vehicle Graphics & Wraps', icon:'vector' as const, desc:'Custom vinyl graphics, fleet branding, livery concepts and cut-ready vehicle artwork.', points:['Wrap concepts','Print & cut artwork','Fleet branding'], stat:'Custom quote' },
]
export default function Services(){
  useEffect(()=>{ document.title='Services – Brode Designz | Digitizing, Vector, Patches, DTF, Hats' },[])
  return (
    <div>
      <section className="grad-brand-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(800px_at_80%_0%,rgba(79,195,247,0.22),transparent)]"/>
        <div className="relative max-w-[1280px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl"><div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-light text-[11px] font-bold tracking-widest uppercase">Our Expertise</div><h1 className="font-heading font-extrabold text-[36px] md:text-[56px] leading-[0.92] tracking-[-0.03em] text-white mt-5">Production art that sews perfect <span className="text-blue-light">first time</span></h1><p className="mt-5 text-white/70 text-[15px] md:text-[17px] leading-7 max-w-xl">One dedicated studio for all your apparel graphics – digitizing, vector, patches, DTF and hats. Same team, consistent quality, no hand-off headaches.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/get-a-quote" className="h-11 px-6 rounded-full bg-white text-navy-dark font-bold text-[14px] inline-flex items-center gap-2">Get a Free Quote <ArrowUpRight className="w-4 h-4"/></Link><Link to="/portfolio" className="h-11 px-6 rounded-full border border-white/20 text-white font-semibold text-[14px] inline-flex items-center gap-2 hover:bg-white/10">View Portfolio</Link></div></div>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(s=> (
            <div key={s.slug} className="rounded-[24px] border border-black/5 bg-white p-8 card-hover flex flex-col group relative overflow-hidden">
              <div className="flex justify-between items-start"><BrandMark brand={s.icon} size={48}/><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-bg border border-black/5 text-navy-dark/70">{s.stat}</span></div>
              <h3 className="font-heading font-bold text-[20px] mt-6 leading-tight">{s.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-6 text-body flex-1">{s.desc}</p>
              <ul className="mt-5 space-y-2">{s.points.map(p=><li key={p} className="flex gap-2 text-[13px] font-medium text-navy-dark"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"/>{p}</li>)}</ul>
              <Link to={`/services/${s.slug}`} className="mt-7 h-10 rounded-full bg-navy-dark text-white text-[13px] font-bold inline-flex items-center justify-center gap-1.5 group-hover:bg-blue-mid transition">Learn More <ArrowUpRight className="w-4 h-4"/></Link>
              <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-blue-pale blur-xl opacity-0 group-hover:opacity-100 transition"/>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 pb-16 md:pb-24"><div className="max-w-[1280px] mx-auto rounded-[28px] grad-brand-2 p-[1px]"><div className="rounded-[27px] bg-[#0A1933] px-8 md:px-12 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-white"><div><h3 className="font-heading font-extrabold text-[24px] md:text-[30px] leading-tight text-white">Not sure which service you need?</h3><p className="text-white/60 text-[14px] mt-2 max-w-xl">Upload any file – we'll recommend the best workflow and send you a free quote in 2h. No bots, no templates.</p></div><Link to="/get-a-quote" className="h-12 px-8 rounded-full bg-white text-navy-dark font-bold text-[14px] inline-flex items-center gap-2 hover:bg-blue-light transition flex-shrink-0">Get a Free Quote <ArrowUpRight className="w-4 h-4"/></Link></div></div></section>
    </div>
  )
}
