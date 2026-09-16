import { useState } from "react"
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

const answers: Record<string, string> = {
  "What services do you offer?": "We handle embroidery digitizing, vector artwork, custom patches, DTF/DTG sheets and custom hats.",
  "How fast is delivery?": "Most standard jobs are handled within 12–24 hours. Send the artwork for an exact turnaround.",
  "How do I get a quote?": "Use our quote form, choose the service you need and upload your artwork. We will review it and reply with pricing.",
  "Do you offer a free sample?": "Yes — for a simple first-time design, you can request a free sample to check our quality before ordering."
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ from: "bot" | "user"; text: string }>>([])
  const ask = (question: string) => setMessages((current) => [...current, { from: "user", text: question }, { from: "bot", text: answers[question] }])

  return (
    <>
      {open ? (
        <div className="fixed bottom-24 right-4 z-[80] w-[min(370px,calc(100vw-2rem))] rounded-[22px] bg-white border border-black/10 shadow-xl overflow-hidden">
          <div className="bg-navy-dark text-white px-5 py-4 flex items-center justify-between">
            <div><div className="font-heading font-bold text-[15px]">Brode Live Chat</div><div className="text-[11px] text-white/60 mt-0.5">Quick answers + quote support</div></div>
            <button type="button" onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center" aria-label="Close chat"><X className="w-4 h-4" /></button>
          </div>
          <div className="p-4 max-h-[330px] overflow-y-auto space-y-3">
            {messages.length === 0 ? <div className="rounded-[14px] bg-bg p-3.5 text-[13px] text-body leading-5">Hi. What would you like help with?</div> : null}
            {messages.map((message, index) => <div key={index} className={message.from === "user" ? "ml-auto max-w-[88%] rounded-[14px] px-3.5 py-2.5 text-[13px] leading-5 bg-navy-dark text-white" : "max-w-[88%] rounded-[14px] px-3.5 py-2.5 text-[13px] leading-5 bg-bg text-body"}>{message.text}</div>)}
            <div className="grid gap-2">{Object.keys(answers).map((question) => <button type="button" key={question} onClick={() => ask(question)} className="text-left rounded-[12px] border border-black/10 px-3 py-2.5 text-[12px] font-semibold text-navy-dark hover:border-blue-accent hover:bg-blue-pale transition">{question}</button>)}</div>
          </div>
          <div className="border-t border-black/5 p-3 flex gap-2">
            <Link to="/get-a-quote" onClick={() => setOpen(false)} className="flex-1 h-10 rounded-full btn-primary text-[12px] font-bold flex items-center justify-center gap-1.5">Get a Quote <ArrowUpRight className="w-3.5 h-3.5" /></Link>
            <a href="mailto:info@brodedesignz.com?subject=Brode%20Designz%20Inquiry" className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-navy-dark" aria-label="Email Brode Designz"><Send className="w-4 h-4" /></a>
          </div>
        </div>
      ) : null}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Open live chat" className="fixed bottom-5 right-4 z-[81] w-14 h-14 rounded-full btn-primary text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open ? <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" /> : null}
      </button>
    </>
  )
}
