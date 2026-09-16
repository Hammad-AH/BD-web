import { useEffect, useRef, useState } from 'react'
function useCountUp(target: number, isVisible: boolean) {
  const [val, setVal] = useState(0)
  useEffect(()=>{
    if(!isVisible) return
    let start = 0
    const duration = 1600
    const startTime = performance.now()
    const animate = (now: number) => {
      const prog = Math.min((now-startTime)/duration,1)
      const eased = 1 - Math.pow(1-prog,3)
      setVal(Math.floor(eased*target))
      if(prog<1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  },[target,isVisible])
  return val
}
function Stat({ value, suffix, label }: { value:number, suffix:string, label:string }){
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible]=useState(false)
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true) },{threshold:0.4})
    if(ref.current) obs.observe(ref.current)
    return ()=> obs.disconnect()
  },[])
  const count = useCountUp(value, visible)
  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-extrabold text-[36px] md:text-[54px] leading-none text-white tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-[12px] md:text-[13px] font-semibold tracking-widest uppercase text-blue-light/90">{label}</div>
    </div>
  )
}

export default function StatsBar(){
  return (
    <section className="gradient-brand-135 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} />
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16 relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        <Stat value={12500} suffix="+" label="Projects Completed" />
        <Stat value={4200} suffix="+" label="Happy Clients" />
        <Stat value={49} suffix="/5" label="Avg Rating" />
        <Stat value={7} suffix="+" label="Years Experience" />
      </div>
    </section>
  )
}
