import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfter({ before, after, alt }: { before:string, after:string, alt:string }){
  const [pos, setPos] = useState(52)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const update = (clientX:number)=>{ if(!ref.current) return; const rect=ref.current.getBoundingClientRect(); const x=((clientX-rect.left)/rect.width)*100; setPos(Math.max(4,Math.min(96,x))) }
  return (
    <div ref={ref} className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-bg select-none cursor-ew-resize group border border-black/5 shadow-[0_8px_24px_rgba(10,26,51,0.06)]"
      onMouseMove={e=> dragging.current && update(e.clientX)}
      onMouseDown={e=>{dragging.current=true; update(e.clientX)}}
      onMouseUp={()=>dragging.current=false}
      onMouseLeave={()=>dragging.current=false}
      onTouchMove={e=> update(e.touches[0].clientX)}
      onTouchStart={e=> update(e.touches[0].clientX)}
    >
      <img src={after} alt={`${alt} after`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable={false} />
      <div className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]" style={{clipPath:`inset(0 ${100-pos}% 0 0)`}}>
        <img src={before} alt={`${alt} before`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable={false} />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur text-white text-[10px] font-bold tracking-widest uppercase border border-white/10">Before</div>
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-navy-dark text-[10px] font-bold tracking-widest uppercase shadow border border-black/5">After</div>
      <div className="absolute top-0 bottom-0 w-[2.5px] bg-white/95 shadow-[0_0_14px_rgba(0,0,0,0.35)]" style={{left:`${pos}%`}} />
      <motion.div className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white slider-handle flex items-center justify-center border border-black/5" style={{left:`calc(${pos}% - 18px)`}} whileHover={{scale:1.08}} whileTap={{scale:0.96}}>
        <div className="flex gap-[3px]"><div className="w-[2px] h-3.5 bg-navy-dark rounded-full"/><div className="w-[2px] h-3.5 bg-navy-dark rounded-full"/></div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
    </div>
  )
}
