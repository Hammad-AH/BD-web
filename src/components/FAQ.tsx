import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
export interface FAQItem { id:number; question:string; answer:string; category?:string }
export default function FAQ({ faqs, dark=false }: { faqs:FAQItem[], dark?:boolean }){
  const [open,setOpen]=useState<number|null>(0)
  return (
    <div className="space-y-3">
      {faqs.map((f,i)=>{
        const active=open===i
        return (
          <div key={f.id||i} className={`rounded-[18px] border transition-all ${active ? (dark? 'bg-white/[0.08] border-white/15' : 'bg-white border-blue-accent/25 shadow-[0_10px_28px_rgba(21,101,192,0.10)]') : (dark? 'bg-white/[0.04] border-white/10 hover:bg-white/[0.06]' : 'bg-bg border-black/[0.04] hover:border-black/10 hover:bg-white')}`}>
            <button onClick={()=>setOpen(active?null:i)} className="w-full flex items-start justify-between gap-4 px-6 py-[18px] text-left">
              <span className={`font-heading font-semibold text-[15px] leading-snug ${dark?'text-white':'text-navy-dark'}`}>{f.question}</span>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${active?'bg-blue-accent text-white rotate-180 shadow-[0_4px_12px_rgba(46,155,224,0.4)]': dark?'bg-white/10 text-white/60':'bg-white border border-black/10 text-navy-dark'}`}><ChevronDown className="w-4 h-4"/></span>
            </button>
            <div className={`grid transition-all duration-300 ${active?'grid-rows-[1fr] opacity-100':'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><div className={`px-6 pb-5 text-[14px] leading-6 ${dark?'text-white/70':'text-body'}`}>{f.answer}</div></div></div>
          </div>
        )
      })}
    </div>
  )
}
