import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, Award, Heart, Target } from 'lucide-react'
export default function About(){
  useEffect(()=>{ document.title='About Us – Brode Designz | Houston Digitizing Studio Since 2018'; window.scrollTo(0,0) },[])
  return (
    <div>
      <section className="grad-brand-2 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_at_80%_0%,rgba(79,195,247,0.22),transparent_60%)]"/>
        <div className="relative max-w-[1280px] mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div><div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-light text-[11px] font-bold tracking-widest uppercase">About Brode Designz</div><h1 className="font-heading font-extrabold text-[36px] md:text-[54px] leading-[0.92] tracking-[-0.03em] text-white mt-5">We digitize with pride.<br/>We deliver with speed.</h1><p className="mt-5 text-white/70 text-[16px] leading-7 max-w-xl">Brode Designz focuses on practical production artwork: embroidery digitizing, manual vector redraws, patches, hats and vehicle graphics. We build files around how they will actually be sewn, printed, cut or applied.</p><div className="mt-8 flex flex-wrap gap-4 text-[13px] text-white/60"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-light"/> Production-ready files</span><span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-light"/> Clear turnaround</span><span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-light"/> Worldwide service</span></div></div>
          <div className="rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/10 bg-white p-3"><div className="grid grid-cols-2 gap-3"><img src="/portfolio/left-breast.jpg" alt="Embroidery production sample" className="w-full aspect-square object-cover rounded-[16px]"/><img src="/portfolio/american-patch.jpg" alt="Custom patch production sample" className="w-full aspect-square object-cover rounded-[16px]"/><img src="/portfolio/cheetah-vehicle.png" alt="Vehicle graphics sample" className="w-full aspect-square object-contain bg-bg rounded-[16px]"/><img src="/portfolio/dragon.png" alt="Vector artwork sample" className="w-full aspect-square object-contain bg-bg rounded-[16px]"/></div></div>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 grid md:grid-cols-3 gap-8">
        <div className="rounded-[20px] bg-bg border border-black/5 p-7"><div className="w-11 h-11 rounded-[12px] bg-white border border-black/5 flex items-center justify-center text-navy-dark"><Target className="w-5 h-5"/></div><h3 className="font-heading font-bold text-[18px] mt-5">Mission</h3><p className="text-[14px] leading-6 text-body mt-2">Eliminate production headaches – every file must sew or print perfect on first attempt, or we fix free.</p></div>
        <div className="rounded-[20px] bg-bg border border-black/5 p-7"><div className="w-11 h-11 rounded-[12px] bg-white border border-black/5 flex items-center justify-center text-navy-dark"><Heart className="w-5 h-5"/></div><h3 className="font-heading font-bold text-[18px] mt-5">Values</h3><p className="text-[14px] leading-6 text-body mt-2">Accuracy is greater than speed (but we do both). Real humans only. Lifetime backup. Fair transparent pricing.</p></div>
        <div className="rounded-[20px] bg-bg border border-black/5 p-7"><div className="w-11 h-11 rounded-[12px] bg-white border border-black/5 flex items-center justify-center text-navy-dark"><Award className="w-5 h-5"/></div><h3 className="font-heading font-bold text-[18px] mt-5">Promise</h3><p className="text-[14px] leading-6 text-body mt-2">If it does not sew right, we redo free. If it does not print sharp, we re-vector free. Until 100 percent happy.</p></div>
      </section>
      <section className="bg-bg py-16 md:py-24 px-6 border-y border-black/[0.04]">
        <div className="max-w-[1280px] mx-auto">
  <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] text-center">
    Tech stack we swear by – licensed, certified
  </h2>

  <p className="text-center text-body text-[14px] mt-3 max-w-xl mx-auto">
    Professional tools used by our team to deliver accurate, production-ready artwork.
  </p>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

    {/* Wilcom */}
    <div className="bg-white rounded-[20px] p-6 border border-black/5 hover:shadow-md transition-shadow">
      <div className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/software/wilcom.jpg"
          alt="Wilcom EmbroideryStudio"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="font-heading font-bold text-[15px] mt-4 leading-tight">
        Wilcom EmbroideryStudio E4.5
      </div>

      <div className="text-[12px] text-body leading-5 mt-2">
        Manual digitizing, 3D puff, sequin & chenille
      </div>

      <div className="text-[11px] font-medium text-navy-mid mt-3">
        DST · EXP · PES · JEF
      </div>
    </div>

    {/* Illustrator */}
    <div className="bg-white rounded-[20px] p-6 border border-black/5 hover:shadow-md transition-shadow">
      <div className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/software/illustrator.jpg"
          alt="Adobe Illustrator"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="font-heading font-bold text-[15px] mt-4 leading-tight">
        Adobe Illustrator CC 2024
      </div>

      <div className="text-[12px] text-body leading-5 mt-2">
        Professional vector rebuilds, logo recreation & Pantone colors
      </div>

      <div className="text-[11px] font-medium text-navy-mid mt-3">
        AI · EPS · SVG · PDF
      </div>
    </div>

    {/* CorelDRAW */}
    <div className="bg-white rounded-[20px] p-6 border border-black/5 hover:shadow-md transition-shadow">
      <div className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/software/coreldraw.jpg"
          alt="CorelDRAW Graphics Suite"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="font-heading font-bold text-[15px] mt-4 leading-tight">
        CorelDRAW Graphics Suite
      </div>

      <div className="text-[12px] text-body leading-5 mt-2">
        Vector editing, signage artwork & legacy file conversion
      </div>

      <div className="text-[11px] font-medium text-navy-mid mt-3">
        CDR · AI · EPS · PDF
      </div>
    </div>

    {/* Photoshop */}
    <div className="bg-white rounded-[20px] p-6 border border-black/5 hover:shadow-md transition-shadow">
      <div className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/software/photoshop.jpg"
          alt="Adobe Photoshop"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="font-heading font-bold text-[15px] mt-4 leading-tight">
        Adobe Photoshop Cloud
      </div>

      <div className="text-[12px] text-body leading-5 mt-2">
        Color correction, mockups, raster cleanup & image preparation
      </div>

      <div className="text-[11px] font-medium text-navy-mid mt-3">
        PSD · PNG · JPG · TIFF
      </div>
    </div>

  </div>
</div>
      </section>
      <section className="py-16 md:py-24 px-6 max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
          <div className="rounded-[18px] bg-bg border border-black/5 p-6 text-center"><div className="font-heading font-extrabold text-[24px] text-navy-dark">Production</div><div className="text-[11px] font-bold tracking-widest uppercase text-body-2 mt-1">Ready Files</div></div>
          <div className="rounded-[18px] bg-bg border border-black/5 p-6 text-center"><div className="font-heading font-extrabold text-[24px] text-navy-dark">12–24h</div><div className="text-[11px] font-bold tracking-widest uppercase text-body-2 mt-1">Typical Turnaround</div></div>
          <div className="rounded-[18px] bg-bg border border-black/5 p-6 text-center"><div className="font-heading font-extrabold text-[24px] text-navy-dark">Manual</div><div className="text-[11px] font-bold tracking-widest uppercase text-body-2 mt-1">Artwork Review</div></div>
          <div className="rounded-[18px] bg-bg border border-black/5 p-6 text-center"><div className="font-heading font-extrabold text-[24px] text-navy-dark">Worldwide</div><div className="text-[11px] font-bold tracking-widest uppercase text-body-2 mt-1">Service</div></div>
        </div>
        <div className="order-1 lg:order-2"><h2 className="font-heading font-extrabold text-[28px] md:text-[38px] leading-[1.08]">Why shops switch to us — and never leave</h2>
          <ul className="mt-7 space-y-3.5">
            <li className="flex gap-3 text-[14px]"><span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-4 h-4"/></span><span className="font-medium text-navy-dark leading-snug">Clear communication for every project – Email / WhatsApp</span></li>
            <li className="flex gap-3 text-[14px]"><span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-4 h-4"/></span><span className="font-medium text-navy-dark leading-snug">Fast response windows with clear project updates</span></li>
            <li className="flex gap-3 text-[14px]"><span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-4 h-4"/></span><span className="font-medium text-navy-dark leading-snug">Your supplied artwork is handled as project material</span></li>
            <li className="flex gap-3 text-[14px]"><span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-4 h-4"/></span><span className="font-medium text-navy-dark leading-snug">Flexible one-off and repeat-order workflows</span></li>
          </ul>
          <Link to="/get-a-quote" className="mt-8 inline-flex h-11 px-7 rounded-full btn-primary font-bold text-[14px]">Work With Us</Link></div>
      </section>
      <section className="grad-brand-2 py-14 px-6">
        <div className="max-w-[1280px] mx-auto rounded-[22px] bg-white/[0.07] border border-white/10 backdrop-blur px-8 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white"><div><h3 className="font-heading font-extrabold text-[24px] md:text-[30px] leading-tight text-white">Ready to experience the Brode difference?</h3><p className="text-white/60 text-[14px] mt-1.5">Free consultation, free quote, no bots, no obligation. Talk to a real digitizer today.</p></div><Link to="/get-a-quote" className="h-12 px-8 rounded-full bg-white text-navy-dark font-bold text-[14px] inline-flex items-center justify-center hover:bg-blue-light transition flex-shrink-0">Get a Free Quote</Link></div>
      </section>
    </div>
  )
}
