import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
export interface Testimonial { id:number; name:string; company?:string; role?:string; rating:number; content:string }
export default function Testimonials({ items }: { items:Testimonial[] }){
  const [idx,setIdx]=useState(0)
  useEffect(()=>{ const t=setInterval(()=> setIdx(p=> (p+1)%Math.max(1,items.length)), 5000); return ()=>clearInterval(t) },[items.length])
  if(!items.length) return null
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[24px]">
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{transform:`translateX(-${idx*100}%)`}}>
          {items.map(it=>(
            <div key={it.id} className="min-w-full p-1">
              <div className="bg-white rounded-[22px] p-8 md:p-10 border border-black/5 shadow-[0_16px_44px_rgba(10,26,51,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-pale to-transparent rounded-full blur-2xl pointer-events-none" />
                <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-accent/12" />
                <div className="flex gap-1 mb-5">{Array.from({length:5}).map((_,i)=><Star key={i} className={`w-[18px] h-[18px] ${i<it.rating?'fill-amber-400 text-amber-400':'text-black/10'}`}/>)}</div>
                <p className="font-heading font-semibold text-[18px] md:text-[20px] leading-[1.45] text-navy-dark relative">“{it.content}”</p>
                <div className="flex items-center gap-3.5 mt-8">
                  <div className="w-11 h-11 rounded-full grad-brand text-white font-bold text-[13px] flex items-center justify-center">{it.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <div><div className="font-heading font-bold text-[14px] text-navy-dark">{it.name}</div><div className="text-[12.5px] text-body">{it.role}{it.company?` • ${it.company}`:''}</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2.5 mt-6">
        {items.map((_,i)=> <button key={i} aria-label={`Go to testimonial ${i+1}`} onClick={()=>setIdx(i)} className={`h-2 rounded-full transition-all ${i===idx?'w-8 bg-navy-dark':'w-2 bg-black/15 hover:bg-black/25'}`} />)}
      </div>
    </div>
  )
}
