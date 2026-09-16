import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
export interface FAQ { id:number; question:string; answer:string; category?:string }

export default function FAQAccordion({ faqs, variant='light' }: { faqs: FAQ[], variant?: 'light'|'dark' }) {
  const [open, setOpen] = useState<number|null>(0)
  return (
    <div className="space-y-3">
      {faqs.map((f,i)=>(
        <div key={f.id||i} className={`rounded-2xl border transition ${open===i ? (variant==='dark' ? 'bg-white/[0.06] border-white/15' : 'bg-white border-blue-accent/20 shadow-[0_8px_24px_rgba(21,101,192,0.08)]') : (variant==='dark' ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]' : 'bg-bg-soft border-black/5 hover:border-black/10')}`}>
          <button onClick={()=> setOpen(open===i?null:i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
            <span className={`font-semibold text-[15px] leading-snug ${variant==='dark' ? 'text-white' : 'text-navy-dark'}`}>{f.question}</span>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center transition flex-shrink-0 ${open===i ? 'bg-blue-accent text-white rotate-180' : variant==='dark' ? 'bg-white/10 text-white/60' : 'bg-white border border-black/10 text-navy-dark'}`}><ChevronDown className="w-4 h-4"/></span>
          </button>
          {open===i && (
            <div className={`px-6 pb-6 text-[14px] leading-6 ${variant==='dark' ? 'text-white/70' : 'text-body'}`}>{f.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}
