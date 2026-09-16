import { useEffect, useMemo, useState } from 'react'
import { X, ArrowUpRight, Clock3, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BeforeAfter from '../components/BeforeAfter'
import { localPortfolioItems } from '../data/portfolio'

type PortfolioItem = {
  id: string | number
  title: string
  description?: string
  before_image?: string
  after_image?: string
  image?: string
  category?: string
  service_type?: string
}

function DesignCard({ item, onOpen }: { item: PortfolioItem; onOpen: (item: PortfolioItem) => void }) {
  const service = item.service_type || item.category || 'Design'
  return (
    <article className="group cursor-pointer" onClick={() => onOpen(item)} onKeyDown={e => { if(e.key === 'Enter' || e.key === ' ') onOpen(item) }} tabIndex={0} role="button">
      {item.before_image && item.after_image ? (
        <BeforeAfter before={item.before_image} after={item.after_image} alt={item.title} />
      ) : (
        <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-white border border-black/5 shadow-[0_8px_24px_rgba(10,26,51,0.06)] flex items-center justify-center p-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain transition duration-500 group-hover:scale-[1.025]"
            loading="lazy"
          />
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-navy-dark text-[10px] font-bold tracking-widest uppercase shadow border border-black/5">
            {service}
          </span>
        </div>
      )}
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-heading font-bold text-[15px] text-navy-dark leading-tight">{item.title}</h2>
          <p className="text-[12.5px] text-body mt-1 leading-5">{item.description || 'Production-ready artwork prepared for professional use.'}</p>
        </div>
        {item.before_image && item.after_image && (
          <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-bg border border-black/5 text-navy-dark/70 whitespace-nowrap">
            {service}
          </span>
        )}
      </div>
    </article>
  )
}

export default function Portfolio() {
  const [apiItems, setApiItems] = useState<PortfolioItem[]>([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    document.title = 'Portfolio – Brode Designz | Embroidery & Vector Artwork'
    fetch('/api/portfolio')
      .then(r => r.ok ? r.json() : [])
      .then(d => setApiItems(Array.isArray(d) ? d : []))
      .catch(() => setApiItems([]))
      .finally(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [])

  const items = useMemo(() => {
    const local = localPortfolioItems.map(item => ({ ...item }))
    const merged = [...local, ...apiItems]
    return merged.filter((item, index, arr) => index === arr.findIndex(x => x.id === item.id || (x.title === item.title && x.service_type === item.service_type)))
  }, [apiItems])

  const cats = useMemo(() => {
    const discovered = items
      .map(i => i.category || i.service_type)
      .filter(Boolean) as string[]
    return ['All', ...Array.from(new Set(discovered))]
  }, [items])

  const filtered = filter === 'All'
    ? items
    : items.filter(i => i.category === filter || i.service_type === filter)

  return (
    <div>
      <section className="grad-brand-2 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(800px_at_80%_0%,rgba(79,195,247,0.22),transparent)]" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-light text-[11px] font-bold tracking-widest uppercase">
            Portfolio • {localPortfolioItems.length}+ Works
          </div>
          <h1 className="font-heading font-extrabold text-[38px] md:text-[56px] leading-[0.92] tracking-[-0.03em] text-white mt-5">
            Our Work
          </h1>
          <p className="mt-4 text-white/65 max-w-2xl mx-auto text-[15px] md:text-[17px] leading-7">
            A selection of embroidery digitizing and vector artwork created for professional production.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`h-9 px-4 rounded-full text-[13px] font-semibold border transition focus-ring ${
                  filter === c
                    ? 'bg-white text-navy-dark border-white shadow'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-[18px] bg-bg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(item => <DesignCard key={`${item.id}`} item={item} onOpen={setSelected} />)}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 text-body text-[14px]">No items in this category yet.</div>
        )}
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[100] bg-navy-dark/75 backdrop-blur-md p-4 md:p-8 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}>
            <motion.div className="w-full max-w-[980px] max-h-[92vh] overflow-y-auto rounded-[26px] bg-white shadow-2xl" initial={{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:.98}} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-4 p-5 md:p-6 border-b border-black/5">
                <div><div className="text-[10px] font-bold tracking-[.18em] uppercase text-blue-mid">{selected.service_type || selected.category}</div><h3 className="font-heading font-extrabold text-[23px] md:text-[30px] text-navy-dark mt-1">{selected.title}</h3></div>
                <button type="button" onClick={() => setSelected(null)} className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-navy-dark hover:bg-blue-pale" aria-label="Close project details"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-5 md:p-7">
                {selected.before_image && selected.after_image ? <BeforeAfter before={selected.before_image} after={selected.after_image} alt={selected.title}/> : <div className="rounded-[20px] bg-bg p-3 overflow-hidden"><img src={selected.image} alt={selected.title} className="w-full max-h-[520px] object-contain rounded-[14px]"/></div>}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="rounded-[16px] bg-bg p-5"><Clock3 className="w-5 h-5 text-blue-mid"/><div className="font-heading font-bold mt-3">Typical turnaround</div><div className="text-[13px] text-body mt-1">12–24 hours for standard jobs</div></div>
                  <div className="rounded-[16px] bg-bg p-5"><CheckCircle2 className="w-5 h-5 text-emerald-600"/><div className="font-heading font-bold mt-3">What we delivered</div><div className="text-[13px] text-body mt-1">{selected.description || 'Production-ready artwork prepared for the requested service.'}</div></div>
                  <div className="rounded-[16px] bg-bg p-5"><ArrowUpRight className="w-5 h-5 text-blue-mid"/><div className="font-heading font-bold mt-3">Need something similar?</div><div className="text-[13px] text-body mt-1">Send your artwork and request a custom quote.</div></div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3"><a href="/get-a-quote" className="h-11 px-6 rounded-full btn-primary inline-flex items-center gap-2 font-bold text-[13px]">Get a Custom Quote <ArrowUpRight className="w-4 h-4"/></a><button type="button" onClick={() => setSelected(null)} className="h-11 px-6 rounded-full btn-ghost font-bold text-[13px]">Close</button></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
