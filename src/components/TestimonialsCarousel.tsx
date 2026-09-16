import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
export interface Testimonial { id:number; name:string; company?:string; role?:string; rating:number; content:string; avatar?:string }

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [idx, setIdx] = useState(0)
  useEffect(()=>{
    const t=setInterval(()=> setIdx(p=> (p+1)%testimonials.length), 4500)
    return ()=> clearInterval(t)
  },[testimonials.length])
  if(!testimonials.length) return null
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{transform:`translateX(-${idx*100}%)`}}>
          {testimonials.map(t=>(
            <div key={t.id} className="min-w-full px-2">
              <div className="bg-white rounded-[24px] p-8 md:p-10 border border-black/5 shadow-[0_12px_32px_rgba(10,26,51,0.07)] relative">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-blue-accent/15" />
                <div className="flex gap-1 mb-4">{Array.from({length:5}).map((_,i)=><Star key={i} className={`w-4 h-4 ${i<t.rating?'fill-amber-400 text-amber-400':'text-black/10'}`} />)}</div>
                <p className="text-[16px] md:text-[18px] leading-7 text-navy-dark font-medium">"{t.content}"</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-11 h-11 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-[13px]">{t.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <div>
                    <div className="font-heading font-bold text-[14px] text-navy-dark">{t.name}</div>
                    <div className="text-[12px] text-body">{t.role}{t.company?` • ${t.company}`:''}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_,i)=>(
          <button key={i} onClick={()=>setIdx(i)} className={`transition-all rounded-full ${i===idx?'w-8 h-2 bg-navy-dark':'w-2 h-2 bg-black/15 hover:bg-black/25'}`} />
        ))}
      </div>
    </div>
  )
}
