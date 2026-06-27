import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, MessageSquare, Search, CalendarCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

// Import image assets
import claudeLogo from '../assets/claude logo.png';
import chatgptLogo from '../assets/ChatGPT-Logo.png';
import mcpLogo from '../assets/Mcp logo.webp';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleTryTack = () => {
    navigate('/connect');
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col animate-page-in relative">
      {/* Floating Demo Trigger (Watch Tack work) */}
      <div className="fixed bottom-6 right-6 z-50 animate-page-in">
        <Button
          variant="primary"
          size="lg"
          className="shadow-[0_8px_30px_rgba(28,43,51,0.25)] border-2 border-white/10 active-press pr-7 pl-6"
          onClick={() => navigate('/demo')}
          withArrow
        >
          Watch Tack work
        </Button>
      </div>

      {/* SECTION 1 — Thumbtack hero */}
      <section className="bg-tt-dark relative overflow-hidden min-h-[500px] flex flex-col justify-center items-center px-4 py-20 text-center text-white">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-20 bg-dot-pattern-dark z-0" />
        
        {/* Soft radial backdrop glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-tt-blue/15 rounded-full blur-[140px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-[800px] w-full flex flex-col items-center">
          <h1 className="text-white text-[38px] md:text-[48px] font-bold tracking-tight mb-4 font-serif leading-tight">
            For everything home <span className="italic font-normal font-serif text-white/90">could be.</span>
          </h1>
          <p className="text-[15px] md:text-[18px] text-white/70 max-w-[580px] mb-10 font-sans leading-relaxed">
            Find local pros for repairs, upgrades, and projects big or small — all in one place
          </p>

          {/* Floating Premium Search Bar */}
          <div className="w-full max-w-[560px] bg-white h-[58px] rounded-full p-1.5 flex items-center shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white/10 mb-8 transition-transform focus-within:scale-[1.01] duration-300">
            <div className="flex-grow flex items-center pl-4 text-tt-navy">
              <MapPin size={20} className="text-tt-blue mr-3 shrink-0" />
              <span className="text-tt-muted text-sm md:text-base font-semibold select-none truncate">
                Our backyard next
              </span>
            </div>
            <button className="bg-tt-dark text-white text-xs md:text-sm font-bold rounded-full px-6 h-full hover:bg-tt-blue transition-all duration-300 active-press flex items-center gap-1.5 shrink-0 shadow-sm">
              Find a pro <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Trust statistics row */}
          <div className="text-[12px] text-white/50 font-semibold tracking-wider uppercase font-sans">
            4.9 ★ from 944k reviews &middot; 300K+ local pros &middot; 100M+ projects
          </div>
        </div>
      </section>

      {/* SECTION 2 — Tack feature introduction */}
      <section className="bg-white py-[100px] px-4 text-center relative border-b border-tt-border">
        {/* Ambient top light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-tt-blue-tint/40 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[800px] mx-auto flex flex-col items-center relative z-10">
          {/* Introducing badge */}
          <Badge variant="blue" className="mb-6 border border-tt-blue/30 px-3.5 py-1 font-bold text-[11px] tracking-widest shadow-sm flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-tt-blue animate-ping" />
            ✦ Introducing Tack
          </Badge>

          {/* Serif display headings with italicized accents */}
          <h2 className="text-[34px] md:text-[42px] font-bold text-tt-navy leading-tight font-serif mb-2">
            Book any pro. Just tell <span className="italic font-normal">your agent.</span>
          </h2>
          <h2 className="text-[34px] md:text-[42px] font-bold text-tt-blue font-serif mb-8">
            Tack handles the rest.
          </h2>

          <p className="text-[15px] md:text-[17px] text-tt-muted max-w-[580px] mb-10 font-sans leading-[1.75]">
            Connect your favorite AI — Claude, ChatGPT, or any MCP-compatible agent. 
            Tell it what you need and when. Tack queries Thumbtack's 300K+ verified pros, 
            finds the best match, and books them. <span className="text-tt-navy font-semibold">No messaging back and forth. No ghosting. Just done.</span>
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14 w-full sm:w-auto">
            <Button variant="primary" size="lg" className="px-8 shadow-md active-press" onClick={handleTryTack} withArrow>
              Try Tack
            </Button>
            <Button variant="outline" size="lg" className="px-8 active-press" onClick={scrollToHowItWorks}>
              See how it works
            </Button>
          </div>

          {/* Works with your agent trust logos */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-[11px] font-bold tracking-widest text-tt-muted uppercase font-sans">
              WORKS WITH YOUR AGENT
            </span>
            
            <div className="flex flex-wrap justify-center items-center gap-3">
              {/* Claude logo card */}
              <div className="flex items-center gap-2 bg-white border border-tt-border h-[38px] rounded-full pl-2 pr-4 text-[13px] font-semibold text-tt-navy select-none shadow-[0_2px_6px_rgba(28,43,51,0.03)] hover:border-tt-blue transition-all duration-300 hover:scale-[1.02]">
                <img src={claudeLogo} className="w-[22px] h-[22px] rounded-full object-cover shrink-0" alt="Claude logo" />
                Claude
              </div>
              {/* ChatGPT logo card */}
              <div className="flex items-center gap-2 bg-white border border-tt-border h-[38px] rounded-full pl-2 pr-4 text-[13px] font-semibold text-tt-navy select-none shadow-[0_2px_6px_rgba(28,43,51,0.03)] hover:border-tt-blue transition-all duration-300 hover:scale-[1.02]">
                <img src={chatgptLogo} className="w-[22px] h-[22px] rounded-full object-cover shrink-0" alt="ChatGPT logo" />
                ChatGPT
              </div>
              {/* Custom MCP logo card */}
              <div className="flex items-center gap-2 bg-white border border-tt-border h-[38px] rounded-full pl-2 pr-4 text-[13px] font-semibold text-tt-navy select-none shadow-[0_2px_6px_rgba(28,43,51,0.03)] hover:border-tt-blue transition-all duration-300 hover:scale-[1.02]">
                <img src={mcpLogo} className="w-[22px] h-[22px] rounded-full object-contain shrink-0" alt="MCP logo" />
                Any MCP agent
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-tt-page py-[80px] px-4 relative overflow-hidden">
        {/* Soft dot pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
          <span className="text-[11px] font-bold tracking-widest text-tt-muted uppercase font-sans mb-3">
            HOW TACK WORKS
          </span>
          <h2 className="text-[28px] md:text-[34px] font-bold text-tt-navy font-serif mb-16 text-center">
            From request to booked. <span className="italic font-normal">In seconds.</span>
          </h2>

          <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dashed connector line for desktop only */}
            <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-tt-border z-0" />

            {/* Step 1 */}
            <Card hoverable={true} className="flex flex-col items-center text-center relative z-10 p-7 bg-white border border-tt-border rounded-2xl shadow-sm">
              <span className="text-[48px] font-bold text-tt-blue-tint font-sans leading-none mb-2 select-none">
                01
              </span>
              <div className="w-14 h-14 rounded-full bg-tt-blue-tint flex items-center justify-center text-tt-blue mb-5 border border-tt-blue/10 shadow-inner">
                <MessageSquare size={24} className="stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-tt-navy mb-2.5 font-sans">
                Tell your agent
              </h3>
              <p className="text-sm text-tt-muted leading-relaxed font-sans">
                Say what you need in plain language. Your agent figures out the rest.
              </p>
            </Card>

            {/* Step 2 */}
            <Card hoverable={true} className="flex flex-col items-center text-center relative z-10 p-7 bg-white border border-tt-border rounded-2xl shadow-sm">
              <span className="text-[48px] font-bold text-tt-blue-tint font-sans leading-none mb-2 select-none">
                02
              </span>
              <div className="w-14 h-14 rounded-full bg-tt-blue-tint flex items-center justify-center text-tt-blue mb-5 border border-tt-blue/10 shadow-inner">
                <Search size={24} className="stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-tt-navy mb-2.5 font-sans">
                Agent searches Tack
              </h3>
              <p className="text-sm text-tt-muted leading-relaxed font-sans">
                Tack's API returns ranked pros with live availability and real pricing. No scraping.
              </p>
            </Card>

            {/* Step 3 */}
            <Card hoverable={true} className="flex flex-col items-center text-center relative z-10 p-7 bg-white border border-tt-border rounded-2xl shadow-sm">
              <span className="text-[48px] font-bold text-tt-blue-tint font-sans leading-none mb-2 select-none">
                03
              </span>
              <div className="w-14 h-14 rounded-full bg-tt-blue-tint flex items-center justify-center text-tt-blue mb-5 border border-tt-blue/10 shadow-inner">
                <CalendarCheck size={24} className="stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-tt-navy mb-2.5 font-sans">
                You approve. It's booked.
              </h3>
              <p className="text-sm text-tt-muted leading-relaxed font-sans">
                One tap to confirm. Pro gets notified instantly. You get a receipt.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
