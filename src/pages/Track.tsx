import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  NavigationArrow, 
  Check, 
  House, 
  Wrench, 
  CheckCircle
} from '@phosphor-icons/react';
import { mockProviders } from '../data/providers';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';

export const Track: React.FC = () => {
  const navigate = useNavigate();
  
  // Load booked pro from state, fallback to James P.
  const bookedProId = localStorage.getItem('booked_pro_id') || 'pro-001';
  const pro = mockProviders.find(p => p.id === bookedProId) || mockProviders[0];

  return (
    <div className="flex-grow flex flex-col bg-tt-page min-h-screen font-sans relative">
      
      {/* TOP HEADER BAR */}
      <header className="h-[60px] border-b border-tt-border bg-white flex items-center justify-between px-4 fixed top-0 left-0 w-full z-50 shrink-0">
        <button 
          onClick={() => navigate('/chat')}
          className="text-tt-blue hover:text-tt-deep font-bold text-[13px] flex items-center gap-1 cursor-pointer select-none"
        >
          <ArrowLeft size={16} weight="regular" />
          <span>Back to chat</span>
        </button>
        
        <h1 className="text-[16px] font-bold font-serif text-[#1D3557] absolute left-1/2 -translate-x-1/2 select-none">
          Tracking your job
        </h1>
        
        <div className="w-16" /> {/* spacer */}
      </header>

      {/* CONTENT INNER CONTAINER */}
      <main className="max-w-[560px] w-full mx-auto px-4 pt-[84px] pb-[72px] flex flex-col gap-4">
        
        {/* PRO EN ROUTE CARD */}
        <Card hoverable={false} className="p-5 rounded-2xl bg-white border border-tt-border shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar initials={pro.initials} imageSrc={pro.imageSrc} size="md" className="shrink-0 font-bold" />
              <div>
                <span className="text-[15px] font-bold text-tt-navy block leading-tight">{pro.name}</span>
                <span className="text-[12px] text-tt-muted font-semibold">{pro.service}</span>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <Badge variant="green" className="text-[11px] font-bold px-2 py-0.5 tracking-wider shadow-sm uppercase select-none">
                En route
              </Badge>
              <span className="text-tt-blue text-[13px] font-bold mt-1.5 select-none">
                ETA 12 min
              </span>
            </div>
          </div>

          {/* ETA Navigation Strip */}
          <div className="bg-[#E8F7FC] border border-[#009FD4]/10 rounded-xl p-3 flex items-center gap-2.5 shadow-[inset_0_1px_2px_rgba(0,159,212,0.03)] select-none">
            <NavigationArrow size={14} weight="regular" className="text-tt-blue shrink-0 animate-pulse" />
            <span className="text-[13px] text-tt-blue font-bold leading-normal">
              {pro.name.split(' ')[0]} is 2.4 miles away &middot; ETA 9:12 AM
            </span>
          </div>
        </Card>

        {/* TIMELINE STATUS STEPPER CARD */}
        <Card hoverable={false} className="p-6 rounded-2xl bg-white border border-tt-border shadow-sm flex flex-col gap-1">
          
          {/* Step 1: Confirmed (done) */}
          <div className="flex gap-4 min-h-[56px]">
            <div className="flex flex-col items-center select-none">
              <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center text-white z-10 shrink-0">
                <Check size={12} weight="regular" />
              </div>
              <div className="w-[2px] flex-grow bg-[#16A34A] -mt-0.5" />
            </div>
            <div className="pb-4">
              <h4 className="text-[13px] font-bold text-[#1D3557] leading-none">Confirmed</h4>
              <span className="text-[11px] text-[#64748B] font-bold block mt-1">May 3 &middot; 8:45 AM</span>
            </div>
          </div>

          {/* Step 2: En route (active) */}
          <div className="flex gap-4 min-h-[56px]">
            <div className="flex flex-col items-center select-none">
              <div className="relative flex items-center justify-center shrink-0">
                {/* Overlapping pulse rings */}
                <div className="absolute w-8 h-8 rounded-full border-2 border-tt-blue animate-pulse-ring" />
                <div className="w-5 h-5 rounded-full bg-tt-blue flex items-center justify-center text-white z-10">
                  <NavigationArrow size={11} weight="regular" />
                </div>
              </div>
              <div className="w-[2px] flex-grow bg-[#E2E8F0] -mt-0.5" />
            </div>
            <div className="pb-4">
              <h4 className="text-[13px] font-bold text-[#1D3557] leading-none">En route</h4>
              <span className="text-[11px] text-tt-blue font-bold block mt-1">ETA 9:12 AM</span>
            </div>
          </div>

          {/* Step 3: Arrived (pending) */}
          <div className="flex gap-4 min-h-[56px]">
            <div className="flex flex-col items-center select-none">
              <div className="w-5 h-5 rounded-full border-2 border-[#E2E8F0] bg-white z-10 shrink-0 flex items-center justify-center">
                <House size={10} weight="regular" className="text-slate-300" />
              </div>
              <div className="w-[2px] flex-grow bg-[#E2E8F0] -mt-0.5" />
            </div>
            <div className="pb-4">
              <h4 className="text-[13px] font-bold text-[#64748B] leading-none">Arrived</h4>
            </div>
          </div>

          {/* Step 4: In progress (pending) */}
          <div className="flex gap-4 min-h-[56px]">
            <div className="flex flex-col items-center select-none">
              <div className="w-5 h-5 rounded-full border-2 border-[#E2E8F0] bg-white z-10 shrink-0 flex items-center justify-center">
                <Wrench size={10} weight="regular" className="text-slate-300" />
              </div>
              <div className="w-[2px] flex-grow bg-[#E2E8F0] -mt-0.5" />
            </div>
            <div className="pb-4">
              <h4 className="text-[13px] font-bold text-[#64748B] leading-none">In progress</h4>
            </div>
          </div>

          {/* Step 5: Completed (pending) */}
          <div className="flex gap-4 min-h-[44px]">
            <div className="flex flex-col items-center select-none">
              <div className="w-5 h-5 rounded-full border-2 border-[#E2E8F0] bg-white z-10 shrink-0 flex items-center justify-center">
                <CheckCircle size={10} weight="regular" className="text-slate-300" />
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#64748B] leading-none">Completed</h4>
            </div>
          </div>

        </Card>

        {/* BOOKING DETAILS TABLE CARD */}
        <Card hoverable={false} className="p-5 rounded-2xl bg-white border border-tt-border shadow-sm flex flex-col gap-2 font-sans select-none">
          <span className="text-[11px] font-bold tracking-widest text-[#64748B] uppercase block mb-1">
            Booking Details
          </span>
          
          <div className="flex justify-between items-center py-2 border-b border-[#F5F7FA]">
            <span className="text-[12px] text-[#64748B] font-bold">Service</span>
            <span className="text-[13px] font-bold text-tt-navy">Plumbing repair</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#F5F7FA]">
            <span className="text-[12px] text-[#64748B] font-bold">Address</span>
            <span className="text-[13px] font-bold text-tt-navy">742 Main St, SF</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#F5F7FA]">
            <span className="text-[12px] text-[#64748B] font-bold">Total</span>
            <span className="text-[13px] font-bold text-tt-navy">${(pro.price + 6).toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-[12px] text-[#64748B] font-bold">Ref</span>
            <span className="text-[12px] font-mono font-bold text-tt-navy">TCK-2025-4821</span>
          </div>
        </Card>

      </main>

      {/* FIXED BOTTOM ACTION BAR */}
      <footer className="fixed bottom-0 left-0 w-full h-[56px] border-t border-tt-border bg-white flex items-center justify-between px-6 z-40 select-none shrink-0">
        <span className="text-[13px] text-[#64748B] font-bold">Having an issue?</span>
        <button 
          onClick={() => navigate('/chat')}
          className="text-tt-blue hover:text-tt-deep font-bold text-[13px] flex items-center gap-1 cursor-pointer select-none"
        >
          <span>Get help &rarr;</span>
        </button>
      </footer>

    </div>
  );
};
