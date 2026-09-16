import { useEffect, useState } from 'react'
import { Upload, CheckCircle, Loader2, ShieldCheck, Zap, Clock } from 'lucide-react'
export default function GetQuote(){
  const [form,setForm]=useState({name:'',email:'',phone:'',company:'',service_type:'Embroidery Digitizing',budget:'',details:''})
  const [fileName,setFileName]=useState('')
  const [submitting,setSubmitting]=useState(false)
  const [success,setSuccess]=useState(false)
  const [error,setError]=useState('')
  useEffect(()=>{ document.title='Get a Free Quote – Brode Designz | 2h Response'; window.scrollTo(0,0) },[])
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault(); setSubmitting(true); setError('')
    try{ const res=await fetch('/api/quotes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,file_name:fileName})}); if(!res.ok) throw new Error('Failed to submit'); setSuccess(true); setForm({name:'',email:'',phone:'',company:'',service_type:'Embroidery Digitizing',budget:'',details:''}); setFileName('') } catch(err:any){ setError(err.message||'Failed') } finally{ setSubmitting(false) }
  }
  if(success) return <div className="max-w-[640px] mx-auto px-6 py-24 text-center"><div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10"/></div><h1 className="font-heading font-extrabold text-[32px]">Quote Request Sent!</h1><p className="mt-3 text-body text-[15px] leading-7 max-w-md mx-auto">Thanks — we received your files. Our team will review and reply within <strong className="text-navy-dark">2-4 hours</strong> (max 24h). Check your inbox for confirmation.</p><button onClick={()=>setSuccess(false)} className="mt-8 h-12 px-8 rounded-full btn-primary font-bold text-[14px]">Send Another Quote</button></div>
  return (
    <div>
      <section className="grad-brand-2 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(800px_at_20%_0%,rgba(79,195,247,0.22),transparent_60%)]"/>
        <div className="relative max-w-[1280px] mx-auto px-6 py-14 md:py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-light text-[11px] font-bold tracking-widest uppercase">Get a Quote • Free • 2h Response</div>
            <h1 className="font-heading font-extrabold text-[36px] md:text-[52px] leading-[0.92] tracking-[-0.03em] text-white mt-5">Get a free, no-obligation quote</h1>
            <p className="mt-4 text-white/70 text-[15px] md:text-[16px] leading-7">Upload your artwork – even a phone photo works. We'll send accurate pricing + turnaround in 2-4 hours avg. No bots, real artists.</p>
            <div className="mt-8 space-y-4">
              {[{icon:Zap,title:'Fast',desc:'Response in 2-4h avg – rush 2h available'},{icon:ShieldCheck,title:'Free',desc:'Quote + 3D preview + consultation at no cost'},{icon:Clock,title:'Secure & Private',desc:'NDA by default, lifetime encrypted backup'}].map(r=>{ const I=r.icon; return (<div key={r.title} className="flex gap-3.5"><div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0"><I className="w-4 h-4 text-blue-light"/></div><div><div className="font-heading font-bold text-[14px] text-white">{r.title}</div><div className="text-[13px] text-white/60 leading-5">{r.desc}</div></div></div>)})}
            </div>
            <div className="mt-10 rounded-[18px] bg-white/10 border border-white/15 backdrop-blur p-5">
              <div className="text-[11px] font-bold tracking-widest uppercase text-blue-light">What happens next?</div>
              <ol className="mt-3 space-y-2 text-[13px] text-white/70 list-decimal pl-4 marker:text-white/40"><li>We review your artwork manually</li><li>We send pricing + delivery time (free)</li><li>You approve – we start digitizing/vector</li><li>File delivered + lifetime backup</li></ol>
            </div>
          </div>
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="bg-white rounded-[26px] p-6 md:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.30)] border border-black/5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Full Name *</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-2 w-full h-[46px] px-4 rounded-[12px] border border-black/10 bg-bg text-[14px] text-blue-mid font-semibold focus:outline-none focus:border-blue-accent focus:bg-white transition" placeholder="John Doe"/></div>
                <div><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Email *</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-2 w-full h-[46px] px-4 rounded-[12px] border border-black/10 bg-bg text-[14px] text-blue-mid font-semibold focus:outline-none focus:border-blue-accent focus:bg-white transition" placeholder="john@company.com"/></div>
                <div><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-2 w-full h-[46px] px-4 rounded-[12px] border border-black/10 bg-bg text-[14px] text-blue-mid font-semibold focus:outline-none focus:border-blue-accent focus:bg-white transition" placeholder="(832) 555-XXXX"/></div>
                <div><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Company</label><input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="mt-2 w-full h-[46px] px-4 rounded-[12px] border border-black/10 bg-bg text-[14px] text-blue-mid font-semibold focus:outline-none focus:border-blue-accent focus:bg-white transition" placeholder="Your brand / shop"/></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Service Type *</label><select value={form.service_type} onChange={e=>setForm({...form,service_type:e.target.value})} className="mt-2 w-full h-[46px] px-4 rounded-[12px] border border-black/10 bg-bg text-[14px] text-blue-mid font-semibold focus:outline-none focus:border-blue-accent focus:bg-white transition"><option>Embroidery Digitizing</option><option>Vector Artwork</option><option>Custom Patches</option><option>DTF & DTG Sheets</option><option>Custom Hats</option><option>Vehicle Graphics & Wraps</option><option>Multiple Services</option></select></div>
                <div><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Budget (optional)</label><select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} className="mt-2 w-full h-[46px] px-4 rounded-[12px] border border-black/10 bg-bg text-[14px] text-blue-mid font-semibold focus:outline-none focus:border-blue-accent focus:bg-white transition"><option value="">Select budget</option><option>Under $25</option><option>$25 - $75</option><option>$75 - $150</option><option>$150 - $300</option><option>$300+</option><option>Bulk / Ongoing</option></select></div>
              </div>
              <div className="mt-5"><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Artwork Upload – PNG, JPG, AI, PDF, PSD</label><label className="mt-2 flex items-center justify-center gap-3 w-full px-4 h-[72px] rounded-[14px] border-[1.8px] border-dashed border-black/15 bg-bg hover:bg-white hover:border-blue-accent/40 cursor-pointer transition group"><Upload className="w-5 h-5 text-body group-hover:text-blue-mid"/><span className="text-[13px] font-medium text-body group-hover:text-navy-dark truncate max-w-[300px]">{fileName || 'Click to upload or drag & drop (max 20MB)'}</span><input type="file" className="hidden" onChange={e=> setFileName(e.target.files?.[0]?.name || '')} accept=".png,.jpg,.jpeg,.ai,.eps,.svg,.pdf,.psd,.dst,.pes"/></label></div>
              <div className="mt-5"><label className="text-[11px] font-bold tracking-widest uppercase text-navy-dark">Project Details * – size, colors, placement, deadline</label><textarea required value={form.details} onChange={e=>setForm({...form,details:e.target.value})} rows={5} className="mt-2 w-full px-4 py-3 rounded-[14px] border border-black/10 bg-bg text-[14px] focus:outline-none focus:border-blue-accent focus:bg-white transition" placeholder="e.g. Left chest 3.5 inch, 4 colors, on polo pique, need by Friday... The more detail, the more accurate quote."/></div>
              {error && <div className="mt-4 p-3 rounded-[12px] bg-red-50 border border-red-200 text-[13px] text-red-700">{error}</div>}
              <button disabled={submitting} className="mt-6 w-full h-[52px] rounded-full btn-primary font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-60 focus-ring">{submitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Sending...</> : 'Get My Free Quote — 2h Response'}</button>
              <p className="text-center text-[11px] text-body-2 mt-3 leading-5">We'll respond within 24h max. By submitting, you agree to our Terms & Privacy. No spam. Your files are NDA-protected.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
