import { useState, useRef } from 'react'

export default function BeforeAfterSlider({ before, after, alt }: { before: string, after: string, alt: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    if(!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((clientX - rect.left)/rect.width)*100
    setPos(Math.max(2, Math.min(98, x)))
  }

  return (
    <div ref={ref} className="relative w-full aspect-[4/3] rounded-xl overflow-hidden select-none cursor-ew-resize bg-bg-soft" 
      onMouseMove={e=> dragging.current && update(e.clientX)}
      onMouseDown={e=>{ dragging.current=true; update(e.clientX)}}
      onMouseUp={()=> dragging.current=false}
      onMouseLeave={()=> dragging.current=false}
      onTouchMove={e=> update(e.touches[0].clientX)}
      onTouchStart={e=> update(e.touches[0].clientX)}
    >
      <img src={after} alt={`${alt} after`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: `inset(0 ${100-pos}% 0 0)` }}>
        <img src={before} alt={`${alt} before`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold tracking-widest uppercase">Before</div>
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-navy-dark text-[10px] font-bold tracking-widest uppercase shadow">After</div>
      <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]" style={{ left: `${pos}%` }} />
      <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center" style={{ left: `calc(${pos}% - 16px)` }}>
        <div className="flex gap-0.5"><div className="w-0.5 h-3 bg-navy-dark rounded"/><div className="w-0.5 h-3 bg-navy-dark rounded"/></div>
      </div>
    </div>
  )
}
