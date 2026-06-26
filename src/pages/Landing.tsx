import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, MessageSquare, Search, CalendarCheck, Cpu, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleTryTack = () => {
    navigate('/connect');
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col animate-page-in">
      {/* SECTION 1 — Thumbtack hero */}
      <section className="bg-tt-dark relative overflow-hidden min-h-[480px] flex flex-col justify-center items-center px-4 py-16 text-center text-white">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10 max-w-[800px] w-full flex flex-col items-center">
          <h1 className="text-white text-[36px] md:text-[48px] font-bold tracking-tight mb-4 font-serif">
            For everything home could be.
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/80 max-w-[600px] mb-8 font-sans leading-relaxed">
            Find local pros for repairs, upgrades, and projects big or small — all in one place
          </p>

          {/* Search bar mock */}
          <div className="w-full max-w-[560px] bg-white h-[56px] rounded-full p-1.5 flex items-center shadow-lg mb-6">
            <div className="flex-grow flex items-center pl-4 text-tt-navy">
              <MapPin size={20} className="text-tt-muted mr-3 shrink-0" />
              <span className="text-tt-muted text-sm md:text-base font-medium select-none truncate">
                Our backyard next
              </span>
            </div>
            <button className="bg-tt-dark text-white text-xs md:text-sm font-semibold rounded-full px-5 h-full hover:bg-tt-blue transition-colors flex items-center gap-1.5 shrink-0">
              Find a pro <ArrowRight size={14} />
            </button>
          </div>

          {/* Trust statistics row */}
          <div className="text-xs md:text-sm text-white/60 font-sans tracking-wide">
            4.9 ★ from 944k reviews &middot; 300K+ local pros &middot; 100M+ projects
          </div>
        </div>
      </section>

      {/* SECTION 2 — Tack feature introduction */}
      <section className="bg-white py-[80px] px-4 text-center">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          {/* Introducing badge */}
          <Badge variant="blue" className="mb-6 border border-tt-blue/30 px-3 py-1 font-semibold text-xs tracking-wider">
            ✦ Introducing Tack
          </Badge>

          {/* serif display headings */}
          <h2 className="text-[32px] md:text-[40px] font-bold text-tt-navy leading-tight font-serif mb-1.5">
            Book any pro. Just tell your agent.
          </h2>
          <h2 className="text-[32px] md:text-[40px] font-bold text-tt-blue font-serif mb-6">
            Tack handles the rest.
          </h2>

          <p className="text-[15px] md:text-[17px] text-tt-muted max-w-[560px] mb-8 font-sans leading-[1.7]">
            Connect your favorite AI — Claude, ChatGPT, or any MCP-compatible agent. 
            Tell it what you need and when. Tack queries Thumbtack's 300K+ verified pros, 
            finds the best match, and books them. No messaging back and forth. No ghosting. Just done.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto">
            <Button variant="primary" size="lg" onClick={handleTryTack} withArrow>
              Try Tack
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToHowItWorks}>
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
              <div className="flex items-center gap-2 bg-white border border-tt-border h-8 rounded-full px-3 text-[13px] font-medium text-tt-navy select-none">
                <span className="inline-flex items-center justify-center w-4 h-4 bg-[#D97706] text-[10px] text-white rounded-full font-bold select-none leading-none pt-0.5">
                  C
                </span>
                Claude
              </div>
              {/* ChatGPT logo card */}
              <div className="flex items-center gap-2 bg-white border border-tt-border h-8 rounded-full px-3 text-[13px] font-medium text-tt-navy select-none">
                <span className="inline-flex items-center justify-center w-4 h-4 bg-[#10B981] text-[10px] text-white rounded-full font-bold select-none leading-none pt-0.5">
                  GPT
                </span>
                ChatGPT
              </div>
              {/* Custom MCP logo card */}
              <div className="flex items-center gap-2 bg-white border border-tt-border h-8 rounded-full px-3 text-[13px] font-medium text-tt-navy select-none">
                <Cpu size={14} className="text-tt-blue" />
                Any MCP agent
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-tt-page py-[64px] px-4 border-t border-tt-border">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <span className="text-[11px] font-bold tracking-widest text-tt-muted uppercase font-sans mb-3">
            HOW TACK WORKS
          </span>
          <h2 className="text-[26px] md:text-[32px] font-bold text-tt-navy font-serif mb-12 text-center">
            From request to booked. In seconds.
          </h2>

          <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashed connector line for desktop only */}
            <div className="hidden md:block absolute top-[94px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-tt-border z-0" />

            {/* Step 1 */}
            <Card hoverable={false} className="flex flex-col items-center text-center relative z-10 p-6 bg-white border border-tt-border rounded-2xl">
              <span className="text-[48px] font-semibold text-tt-blue-tint font-sans leading-none mb-2 select-none">
                01
              </span>
              <div className="w-12 h-12 rounded-full bg-tt-blue-tint flex items-center justify-center text-tt-blue mb-4">
                <MessageSquare size={24} className="stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-tt-navy mb-2 font-sans">
                Tell your agent
              </h3>
              <p className="text-sm text-tt-muted leading-relaxed font-sans">
                Say what you need in plain language. Your agent figures out the rest.
              </p>
            </Card>

            {/* Step 2 */}
            <Card hoverable={false} className="flex flex-col items-center text-center relative z-10 p-6 bg-white border border-tt-border rounded-2xl">
              <span className="text-[48px] font-semibold text-tt-blue-tint font-sans leading-none mb-2 select-none">
                02
              </span>
              <div className="w-12 h-12 rounded-full bg-tt-blue-tint flex items-center justify-center text-tt-blue mb-4">
                <Search size={24} className="stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-tt-navy mb-2 font-sans">
                Agent searches Tack
              </h3>
              <p className="text-sm text-tt-muted leading-relaxed font-sans">
                Tack's API returns ranked pros with live availability and real pricing. No scraping.
              </p>
            </Card>

            {/* Step 3 */}
            <Card hoverable={false} className="flex flex-col items-center text-center relative z-10 p-6 bg-white border border-tt-border rounded-2xl">
              <span className="text-[48px] font-semibold text-tt-blue-tint font-sans leading-none mb-2 select-none">
                03
              </span>
              <div className="w-12 h-12 rounded-full bg-tt-blue-tint flex items-center justify-center text-tt-blue mb-4">
                <CalendarCheck size={24} className="stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-tt-navy mb-2 font-sans">
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
