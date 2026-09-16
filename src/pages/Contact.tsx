import { useEffect, useState } from 'react'
import { Mail, Clock, Loader2, CheckCircle, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const SERVICES=['Embroidery Digitizing','Vector Artwork','Custom Patches','DTF & DTG Sheets','Custom Hats','Vehicle Graphics & Wraps','Multiple Services','Not sure — recommend for me']

export default function Contact(){
  const [form,setForm]=useState({name:'',email:'',service:'Embroidery Digitizing',message:''})
  const [sending,setSending]=useState(false)
  const [success,setSuccess]=useState(false)

  useEffect(()=>{ document.title='Contact Brode Designz — Get a Quote & Support'; window.scrollTo(0,0) },[])

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault(); setSending(true)
    try{
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        name:form.name,email:form.email,subject:`Service enquiry: ${form.service}`,message:`Service needed: ${form.service}\n\n${form.message}`
      })})
      if(!res.ok) throw new Error()
      setSuccess(true); setForm({name:'',email:'',service:'Embroidery Digitizing',message:''})
    }catch{ alert('Unable to send right now. Please email info@brodedesignz.com.') }
    finally{ setSending(false) }
  }

  return (
    <div>
      <section className="grad-brand-2 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(800px_at_20%_0%,rgba(79,195,247,0.22),transparent_60%)]"/>
        <div className="relative max-w-[1280px] mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-light text-[11px] font-bold tracking-widest uppercase">Let's talk</div>
            <h1 className="font-heading font-extrabold text-[38px] md:text-[58px] leading-[.94] tracking-[-.035em] text-white mt-5">Tell us what you need. We'll take it from there.</h1>
            <p className="mt-5 text-white/70 max-w-2xl text-[15px] md:text-[17px] leading-7">Choose the service, tell us about the artwork and we'll guide you to the right production workflow.</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-14 md:py-20 grid lg:grid-cols-[1.35fr_.65fr] gap-8">
        <div className="bg-white rounded-[26px] border border-black/5 p-6 md:p-9 shadow-[0_14px_45px_rgba(10,26,51,.07)]">
          {success ? (
            <div className="text-center py-14">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5"><CheckCircle className="w-8 h-8"/></div>
              <h2 className="font-heading font-extrabold text-[26px]">Thanks — message received.</h2>
              <p className="text-body text-[14px] mt-2 max-w-md mx-auto leading-6">We'll review your request and reply as soon as possible.</p>
              <button onClick={()=>setSuccess(false)} className="mt-6 h-10 px-6 rounded-full btn-ghost text-[13px] font-bold">Send another</button>
            </div>
          ) : (
            <>
              <div className="flex items-end justify-between gap-4">
                <div><h2 className="font-heading font-extrabold text-[24px]">What service do you need?</h2><p className="text-[13.5px] text-body mt-1.5">No generic subject line — tell us exactly what you're looking for.</p></div>
                <Link to="/get-a-quote" className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-bold text-blue-mid hover:text-navy-dark">Full quote form <ArrowUpRight className="w-3.5 h-3.5"/></Link>
              </div>
              <form onSubmit={submit} className="mt-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-[11px] font-bold uppercase tracking-widest text-navy-dark">Name *</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-2 w-full h-[48px] px-4 rounded-[13px] border border-black/10 bg-bg text-[14px] focus:outline-none focus:border-blue-accent focus:bg-white" placeholder="Your name"/></div>
                  <div><label className="text-[11px] font-bold uppercase tracking-widest text-navy-dark">Email *</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-2 w-full h-[48px] px-4 rounded-[13px] border border-black/10 bg-bg text-[14px] focus:outline-none focus:border-blue-accent focus:bg-white" placeholder="you@company.com"/></div>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-navy-dark">Service *</label>
                  <select required value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="mt-2 w-full h-[48px] px-4 rounded-[13px] border border-black/10 bg-bg text-[14px] text-blue-mid font-semibold focus:outline-none focus:border-blue-accent focus:bg-white">
                    {SERVICES.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-navy-dark">Project details *</label>
                  <textarea required rows={7} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="mt-2 w-full px-4 py-3 rounded-[13px] border border-black/10 bg-bg text-[14px] focus:outline-none focus:border-blue-accent focus:bg-white" placeholder="Tell us the size, colors, placement, quantity, file format or deadline. You can also simply write: 'I need help choosing.'"/>
                </div>
                <button disabled={sending} className="w-full h-[50px] rounded-full btn-primary font-bold text-[14px] flex items-center justify-center gap-2 disabled:opacity-60">{sending?<><Loader2 className="w-4 h-4 animate-spin"/> Sending...</>:'Send My Request'}</button>
              </form>
            </>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-[22px] bg-navy-dark p-7 text-white">
            <div className="w-11 h-11 rounded-[13px] bg-white/10 flex items-center justify-center mb-5"><MessageCircle className="w-5 h-5 text-blue-light"/></div>
            <h3 className="font-heading font-bold text-[19px] text-white">Need a quick answer?</h3>
            <p className="text-white/60 text-[13.5px] leading-6 mt-2">Use the live chat button on the site for common service, turnaround and quote questions.</p>
            <a href="mailto:info@brodedesignz.com?subject=Brode%20Designz%20Inquiry" className="mt-5 inline-flex h-10 px-5 rounded-full bg-white text-navy-dark font-bold text-[13px] items-center gap-2">Email us <ArrowUpRight className="w-4 h-4"/></a>
          </div>
          <div className="rounded-[22px] bg-bg border border-black/5 p-7">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-black/5"><Clock className="w-4 h-4 text-blue-mid"/></div><div><div className="font-heading font-bold text-[14px] text-navy-dark">Fast communication</div><div className="text-[12px] text-body">Worldwide service</div></div></div>
            <div className="flex items-center gap-3 mt-5"><div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-black/5"><Mail className="w-4 h-4 text-blue-mid"/></div><div><div className="font-heading font-bold text-[14px] text-navy-dark">Email</div><a href="mailto:info@brodedesignz.com" className="text-[12px] text-body hover:text-blue-mid">info@brodedesignz.com</a></div></div>
          </div>
        </div>
      </section>
    </div>
  )
}
