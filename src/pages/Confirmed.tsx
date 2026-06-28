import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, Seal, FileText, ArrowRight } from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';
import { mockProviders } from '../data/providers';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';

export const Confirmed: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProviderId, bookingRef, dateValue } = useBooking();

  // Selected pro
  const proId = selectedProviderId || 'pro-001';
  const pro = mockProviders.find((p) => p.id === proId) || mockProviders[0];

  const handleTrack = () => {
    navigate('/track');
  };

  const handleViewReceipt = () => {
    alert(`Receipt details for ${bookingRef}:\nService: ${pro.service}\nPro: ${pro.name}\nTotal: $${(pro.price * 1.05).toFixed(2)}\nPaid via Visa ending in 4242.`);
  };

  // Date format helper
  const formattedDay = dateValue 
    ? new Date(dateValue).toLocaleDateString('en-US', { weekday: 'long' })
    : 'Saturday';

  const totalPrice = (pro.price * 1.05).toFixed(2);

  return (
    <div className="flex-grow bg-tt-page min-h-screen py-16 px-4 flex items-center justify-center animate-page-in font-sans relative overflow-hidden">
      {/* Ambient background blur lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-tt-blue-tint/20 rounded-full blur-[100px] pointer-events-none animate-pulse-subtle" />

      <div className="w-full max-w-[480px] flex flex-col items-center gap-6 relative z-10 text-left">
        
        {/* Celebration checkmark circle */}
        <div className="h-16 w-16 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] border-2 border-[#16A34A]/20 shadow-[0_4px_16px_rgba(22,163,74,0.15)] animate-scale-in">
          <Check size={32} weight="regular" />
        </div>

        {/* Header Titles */}
        <div className="text-center w-full">
          <h2 className="text-[28px] font-bold font-serif text-tt-navy mb-1.5 leading-tight">
            You're all set.
          </h2>
          
          <p className="text-[15px] text-tt-muted max-w-[320px] mx-auto leading-normal font-semibold">
            Tack handled it. {pro.name} is confirmed for {formattedDay}.
          </p>
        </div>

        {/* CONFIRMATION CARD */}
        <Card hoverable={false} className="w-full bg-white border border-tt-border shadow-[0_8px_32px_rgba(28,43,51,0.06)] rounded-[20px] p-6 flex flex-col gap-4.5">
          {/* Reference tag capsule */}
          <div className="flex justify-center">
            <span className="font-mono text-[12px] bg-tt-page text-tt-navy px-4 py-1.5 rounded-full border border-tt-border font-bold select-all shadow-inner tracking-wider">
              {bookingRef}
            </span>
          </div>

          {/* Divider line */}
          <div className="h-[1px] bg-tt-border" />

          {/* Pro preview row */}
          <div className="flex items-center gap-3">
            <Avatar initials={pro.initials} imageSrc={pro.imageSrc} size="sm" className="shrink-0 shadow-sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-tt-navy">
                  {pro.name}
                </span>
                {pro.verified && (
                  <Seal size={15} weight="fill" className="text-tt-blue shrink-0" />
                )}
              </div>
              
              <p className="text-[12px] text-tt-muted font-semibold">
                {pro.service}
              </p>
            </div>
          </div>

          {/* Time & Address rows layout */}
          <div className="flex flex-col gap-3.5 bg-tt-page rounded-xl p-4 border border-tt-border shadow-inner">
            <div className="text-[12px] text-tt-navy font-semibold leading-relaxed">
              <span className="font-bold text-[11px] text-tt-muted block uppercase tracking-wider mb-0.5">SCHEDULED TIME</span>
              {formattedDay}, {pro.availability[0]?.replace('Sat ', '') || ''}
            </div>
            
            <div className="text-[12px] text-tt-navy flex items-start gap-1.5 leading-relaxed">
              <MapPin size={14} weight="regular" className="text-tt-muted mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-[11px] text-tt-muted block uppercase tracking-wider mb-0.5">SERVICE ADDRESS</span>
                742 Main St, San Francisco
              </div>
            </div>
          </div>

          {/* Pricing summary line */}
          <div className="flex items-center justify-between text-[12px] text-tt-navy border-t border-slate-100 pt-3">
            <span className="font-bold text-tt-muted uppercase tracking-wider">TOTAL PAID</span>
            <span className="text-[15px] font-extrabold text-tt-navy">${totalPrice}</span>
          </div>
        </Card>

        {/* CTA Stack */}
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="primary"
            size="lg"
            className="w-full active-press shadow-md font-bold text-[15px] flex items-center justify-center gap-1.5"
            onClick={handleTrack}
          >
            <span>Track your job</span>
            <ArrowRight size={16} weight="regular" className="shrink-0" />
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            className="w-full active-press font-bold text-[15px] flex items-center justify-center gap-1.5"
            onClick={handleViewReceipt}
          >
            <FileText size={16} weight="regular" className="text-tt-muted shrink-0" />
            <span>View receipt</span>
          </Button>
        </div>

        {/* Secondary helper label */}
        <span className="text-[12px] text-tt-muted font-bold text-center leading-normal">
          Confirmation sent to your email and agent.
        </span>

      </div>
    </div>
  );
};
