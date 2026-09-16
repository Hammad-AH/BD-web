import React from 'react'

type Brand = 'wilcom' | 'illustrator' | 'corel' | 'photoshop' | 'embroidery' | 'vector' | 'patches' | 'dtf' | 'hats'

const IMAGE_ICONS: Partial<Record<Brand,{src:string; alt:string}>> = {
  wilcom:{src:'/images/software/wilcom.jpg', alt:'Wilcom'},
  illustrator:{src:'/images/software/illustrator.jpg', alt:'Adobe Illustrator'},
  corel:{src:'/images/software/coreldraw.jpg', alt:'CorelDRAW'},
  photoshop:{src:'/images/software/photoshop.jpg', alt:'Adobe Photoshop'},
}

const config: Record<Brand,{label:string; bg:string; fg:string; shape?:string}> = {
  wilcom:{label:'W',bg:'#0A1A33',fg:'#fff'},
  illustrator:{label:'Ai',bg:'#1565C0',fg:'#fff'},
  corel:{label:'Cd',bg:'#2E9BE0',fg:'#fff'},
  photoshop:{label:'Ps',bg:'#0A1A33',fg:'#fff'},
  embroidery:{label:'ED',bg:'#0A1A33',fg:'#fff'},
  vector:{label:'V',bg:'#1565C0',fg:'#fff'},
  patches:{label:'P',bg:'#2E9BE0',fg:'#fff'},
  dtf:{label:'DT',bg:'#EEF3FA',fg:'#0A1A33'},
  hats:{label:'H',bg:'#0A1A33',fg:'#fff'},
}

export default function BrandMark({brand,size=42}:{brand:Brand;size?:number}){
  const img = IMAGE_ICONS[brand]

  if(img){
    return (
      <img
        src={img.src}
        alt={img.alt}
        width={size}
        height={size}
        className="inline-flex rounded-[12px] object-cover shrink-0 shadow-sm border border-black/[0.06]"
        style={{width:size,height:size}}
      />
    )
  }

  const c=config[brand]
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center rounded-[12px] font-heading font-extrabold shrink-0 shadow-sm border border-black/[0.06]"
      style={{width:size,height:size,background:c.bg,color:c.fg,fontSize:size*0.32}}
    >
      {c.label}
    </span>
  )
}