import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import GetQuote from './pages/GetQuote'
import Contact from './pages/Contact'
import FAQPage from './pages/FAQPage'
import ChatWidget from './components/ChatWidget'

function ScrollToTop(){ const {pathname}=useLocation(); useEffect(()=>{ window.scrollTo({top:0,behavior:'instant' as any}) },[pathname]); return null }

function Layout({children}:{children:React.ReactNode}){ return <div className="min-h-screen flex flex-col bg-white"><Header/><main className="flex-1">{children}</main><Footer/><ChatWidget/><div className="h-[76px] lg:hidden"/></div> }

export default function App(){
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/services" element={<Layout><Services/></Layout>} />
        <Route path="/services/:slug" element={<Layout><ServiceDetail/></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio/></Layout>} />
        <Route path="/about" element={<Layout><About/></Layout>} />
        <Route path="/get-a-quote" element={<Layout><GetQuote/></Layout>} />
        <Route path="/contact" element={<Layout><Contact/></Layout>} />
        <Route path="/faq" element={<Layout><FAQPage/></Layout>} />
        <Route path="*" element={<Layout><div className="max-w-[1280px] mx-auto px-6 py-32 text-center"><h1 className="font-heading font-extrabold text-[36px]">404 — Page Not Found</h1><p className="mt-3 text-body">The page you are looking for doesn't exist.</p><a href="/" className="mt-6 inline-flex h-11 px-6 rounded-full btn-primary font-bold text-[14px] items-center">Back Home</a></div></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
