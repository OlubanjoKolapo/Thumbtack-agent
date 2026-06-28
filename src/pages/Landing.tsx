import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Microphone, ChatCircle, CalendarBlank } from '@phosphor-icons/react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/chat', { state: { initialQuery: query } });
    }
  };

  const handleQuickStart = (text: string) => {
    navigate('/chat', { state: { initialQuery: text } });
  };

  return (
    <div className="flex-grow flex flex-col bg-tt-page min-h-screen">
      
      {/* SECTION 1: HERO */}
      <section className="relative bg-tt-dark min-h-[460px] py-16 flex flex-col justify-center items-center overflow-hidden border-b border-tt-border select-none">
        {/* Geometric dot pattern overlay on dark */}
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-10 pointer-events-none" />
        
        {/* Navigation Bar inside Hero */}
        <div className="absolute top-0 left-0 w-full h-[60px] flex items-center justify-between px-8 border-b border-white/5 bg-transparent shrink-0">
          <div className="flex items-center gap-2">
            {/* Custom Thumbtack T logo circle */}
            <div className="w-9 h-9 rounded-full bg-tt-blue flex items-center justify-center shadow-sm select-none">
              <span className="font-serif font-extrabold text-[16px] text-white leading-none">T</span>
            </div>
            <span className="font-serif font-bold text-[18px] text-white tracking-tight">Thumbtack</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-[14px] text-white/70 hover:text-white transition-colors cursor-pointer font-sans font-medium">Sign up as a pro</span>
            <span className="text-[14px] text-white/70 hover:text-white transition-colors cursor-pointer font-sans font-medium">Plan</span>
            <span className="text-[14px] text-white/70 hover:text-white transition-colors cursor-pointer font-sans font-medium">Team</span>
            <button 
              onClick={() => navigate('/chat')}
              className="bg-tt-blue hover:bg-tt-deep text-white font-bold text-[14px] h-9 px-4 rounded-full transition-all shadow-sm cursor-pointer select-none"
            >
              Try Tack
            </button>
          </div>
        </div>

        {/* Content Centered */}
        <div className="w-full max-w-[640px] px-6 text-center mt-12 flex flex-col items-center gap-5 relative z-10">
          
          <h1 className="text-[48px] font-bold font-serif text-white leading-tight tracking-tight max-w-[500px]">
            Book any local pro.<br />
            Just tell Tack.
          </h1>

          <p className="text-[15px] md:text-[18px] text-white/70 max-w-[480px] leading-relaxed font-sans font-semibold">
            Describe what you need. Tack finds your top matches, answers your questions, and books the right pro — all in one conversation.
          </p>

          {/* Search bar pill */}
          <form onSubmit={handleSubmit} className="w-full max-w-[560px] bg-white rounded-full h-14 p-1.5 flex items-center shadow-2xl mt-4 border border-white/10">
            <div className="flex items-center gap-2.5 flex-grow px-3.5 min-w-0">
              <MagnifyingGlass size={20} weight="regular" className="text-[#64748B] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you need done? e.g. fix a leaking pipe..."
                className="bg-transparent border-0 outline-none w-full text-tt-navy text-[15px] font-sans font-semibold placeholder:text-tt-muted focus:ring-0 p-0"
              />
            </div>
            
            <button
              type="submit"
              className="bg-tt-blue hover:bg-tt-deep text-white font-bold text-[15px] px-5 h-11 rounded-full shrink-0 transition-all flex items-center justify-center cursor-pointer select-none"
            >
              Find a pro &rarr;
            </button>
          </form>

          {/* Voice button */}
          <button 
            type="button" 
            onClick={() => handleQuickStart("Explain plumbing repairs near me")}
            className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-[12px] font-bold tracking-wide mt-1 cursor-pointer select-none"
          >
            <Microphone size={16} weight="regular" />
            <span>or use your voice</span>
          </button>

          {/* Trust stats row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-[13px] text-white/50 font-sans font-bold select-none">
            <span>4.9 ★ from 944k reviews</span>
            <span>300K+ local pros</span>
            <span>100M+ projects completed</span>
          </div>

        </div>
      </section>

      {/* SECTION 2: INTRODUCING TACK */}
      <section className="bg-white py-20 px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center bg-[#E8F7FC] text-tt-blue border border-[#009FD4]/40 px-3 py-1 rounded-full text-[12px] font-bold tracking-wider select-none mb-4">
          ✦ Introducing Tack
        </div>
        
        <h2 className="text-[32px] md:text-[36px] font-bold font-serif text-[#1D3557] mt-3">
          Your smartest way to hire.
        </h2>
        <h2 className="text-[32px] md:text-[36px] font-bold font-serif text-tt-blue leading-none">
          Just describe it.
        </h2>

        <p className="text-[17px] text-[#64748B] max-w-[520px] mt-5 leading-relaxed font-sans font-medium">
          No filters. No forms. No ghosting. Tell Tack what you need and when — it searches Thumbtack's 300K+ verified pros, ranks the best matches, and lets you ask anything before you book.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="primary" 
            size="lg" 
            className="px-8 font-bold text-[15px] h-12 shadow" 
            onClick={() => navigate('/chat')}
          >
            Try Tack now &rarr;
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 font-bold text-[15px] h-12 text-[#1D3557]" 
            onClick={() => handleQuickStart("Mount a TV in my living room")}
          >
            See how it works
          </Button>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="bg-[#F5F7FA] py-16 px-6 border-t border-tt-border">
        <span className="text-[11px] font-bold tracking-widest text-[#64748B] uppercase block text-center select-none">
          How Tack works
        </span>
        <h2 className="text-[32px] font-bold font-serif text-[#1D3557] mt-2 text-center">
          From request to booked. Three steps.
        </h2>

        <div className="max-w-[880px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {/* Card 1 */}
          <Card hoverable={false} className="bg-white rounded-2xl p-7 shadow-sm text-center flex flex-col items-center">
            <div className="text-[40px] font-bold text-[#E8F7FC] select-none leading-none">01</div>
            <ChatCircle size={24} weight="regular" className="text-tt-blue mt-3" />
            <h3 className="text-[16px] font-bold text-[#1D3557] mt-3 font-sans">Tell Tack what you need</h3>
            <p className="text-[14px] text-[#64748B] mt-2 leading-relaxed font-medium">
              Plain language. No forms. Say it like you'd text a friend.
            </p>
          </Card>

          {/* Card 2 */}
          <Card hoverable={false} className="bg-white rounded-2xl p-7 shadow-sm text-center flex flex-col items-center">
            <div className="text-[40px] font-bold text-[#E8F7FC] select-none leading-none">02</div>
            <MagnifyingGlass size={24} weight="regular" className="text-tt-blue mt-3" />
            <h3 className="text-[16px] font-bold text-[#1D3557] mt-3 font-sans">Tack finds your best matches</h3>
            <p className="text-[14px] text-[#64748B] mt-2 leading-relaxed font-medium">
              Top 5 pros ranked by rating, availability, price, and proximity to you.
            </p>
          </Card>

          {/* Card 3 */}
          <Card hoverable={false} className="bg-white rounded-2xl p-7 shadow-sm text-center flex flex-col items-center">
            <div className="text-[40px] font-bold text-[#E8F7FC] select-none leading-none">03</div>
            <CalendarBlank size={24} weight="regular" className="text-tt-blue mt-3" />
            <h3 className="text-[16px] font-bold text-[#1D3557] mt-3 font-sans">Ask, compare, book</h3>
            <p className="text-[14px] text-[#64748B] mt-2 leading-relaxed font-medium">
              Ask anything. Expand profiles. Book or request an estimate.
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 4: TRUST BRAND */}
      <section className="bg-white py-12 px-6 border-t border-tt-border">
        <span className="text-[14px] text-[#64748B] text-center block mb-6 font-sans font-semibold select-none">
          Powered by Thumbtack's network
        </span>

        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center items-center font-sans font-bold text-[14px] text-[#1D3557] select-none">
          <div className="flex items-center gap-1.5">
            {/* Logo marker */}
            <div className="w-6 h-6 rounded-full bg-tt-blue flex items-center justify-center shrink-0">
              <span className="font-serif font-extrabold text-[11px] text-white leading-none">T</span>
            </div>
            <span>300K+ verified pros</span>
          </div>
          <span className="text-slate-200 hidden sm:inline">&middot;</span>
          <span>Background checked</span>
          <span className="text-slate-200 hidden sm:inline">&middot;</span>
          <span>Money-back guarantee</span>
        </div>
      </section>

    </div>
  );
};
