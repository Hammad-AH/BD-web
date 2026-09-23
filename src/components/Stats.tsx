import { useEffect, useRef, useState } from 'react'
function useCount(target:number, visible:boolean){
  const [v,setV]=useState(0)
  useEffect(()=>{
    if(!visible) return
    let raf:number; const dur=1800; const t0=performance.now()
    const tick=(now:number)=>{ const p=Math.min((now-t0)/dur,1); const e=1-Math.pow(1-p,3); setV(Math.floor(e*target)); if(p<1) raf=requestAnimationFrame(tick) }
    raf=requestAnimationFrame(tick); return ()=> cancelAnimationFrame(raf)
  },[target,visible])
  return v
}
function Stat({value,suffix,label,sub}:{value:number,suffix:string,label:string,sub:string}){
  const ref=useRef<HTMLDivElement>(null); const [vis,setVis]=useState(false)
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true) },{threshold:0.3}); if(ref.current) o.observe(ref.current); return ()=>o.disconnect() },[])
  const n=useCount(value,vis)
  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-heading font-extrabold text-[40px] md:text-[54px] leading-none tracking-[-0.03em] text-white">{n.toLocaleString()}<span className="text-blue-light">{suffix}</span></div>
      <div className="mt-2 font-heading font-bold text-[13px] md:text-[14px] tracking-wide text-white">{label}</div>
      <div className="mt-1 text-[12px] text-white/55 leading-5 max-w-[200px] md:max-w-none mx-auto md:mx-0">{sub}</div>
    </div>
  )
}
export default function Stats(){
  return (
    <section className="relative grad-brand-2 overflow-hidden">
      <div className="absolute inset-0" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/svg%3E")`,opacity:0.5}} />
      <div className="absolute inset-0 bg-[radial-gradient(600px_at_10%_0%,rgba(79,195,247,0.22),transparent_60%),radial-gradient(500px_at_100%_100%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative max-w-[1280px] mx-auto px-6 py-14 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        <Stat value={120+} suffix="+" label="Designs Delivered" sub="Digitizing, vector graphics & patches shipped" />
        <Stat value={40+} suffix="+" label="Happy Clients" sub="Apparel brands & embroidery shops" />
        <Stat value={4.9} suffix=" /5" label="Avg. Client Rating" sub="Based on 450+ verified reviews" />
        <Stat value={7} suffix="+" label="Years Crafting" sub="Wilcom E4.5 – manual only" />
      </div>
    </section>
  )
}
