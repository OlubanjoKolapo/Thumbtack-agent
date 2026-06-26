import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, BadgeCheck, FileText, ArrowRight } from 'lucide-react';
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
    <div className="flex-grow bg-tt-page min-h-screen py-12 px-4 flex items-center justify-center animate-page-in font-sans">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-6">
        
        {/* Celebration animated checkmark circle */}
        <div className="h-14 w-14 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] border border-[#16A34A]/20 shadow-md animate-scale-in">
          <Check size={28} className="stroke-[3]" />
        </div>

        {/* Header Titles */}
        <div className="text-center">
          <h2 className="text-[28px] font-bold font-serif text-tt-navy mb-1.5 leading-none">
            You're all set.
          </h2>
          <p className="text-[15px] text-tt-muted max-w-[360px] mx-auto leading-normal">
            Tack handled it. {pro.name} is confirmed for {formattedDay}.
          </p>
        </div>

        {/* CONFIRMATION CARD */}
        <Card hoverable={false} className="w-full bg-white border border-tt-border shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-[20px] p-6 flex flex-col gap-4">
          {/* Reference tag */}
          <div className="flex justify-center">
            <span className="font-mono text-[12px] bg-tt-page text-tt-navy px-3.5 py-1 rounded-full border border-tt-border font-semibold select-all">
              {bookingRef}
            </span>
          </div>

          {/* Divider line */}
          <div className="h-[1px] bg-tt-border" />

          {/* Pro preview row */}
          <div className="flex items-center gap-3">
            <Avatar initials={pro.initials} size="sm" className="shrink-0" />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-semibold text-tt-navy">
                  {pro.name}
                </span>
                {pro.verified && (
                  <BadgeCheck size={14} className="text-tt-blue fill-tt-blue-tint shrink-0" />
                )}
              </div>
              <p className="text-[12px] text-tt-muted">
                {pro.service}
              </p>
            </div>
          </div>

          {/* Time & Address rows */}
          <div className="flex flex-col gap-2 bg-tt-page rounded-xl p-3 border border-tt-border">
            <div className="text-[12px] text-tt-navy">
              <span className="font-semibold text-tt-muted block">SCHEDULED TIME</span>
              {formattedDay}, {pro.availability.replace('Sat ', '')}
            </div>
            
            <div className="text-[12px] text-tt-navy flex items-start gap-1 mt-1">
              <MapPin size={14} className="text-tt-muted mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-tt-muted block">SERVICE ADDRESS</span>
                742 Main St, San Francisco
              </div>
            </div>
          </div>

          {/* Pricing summary line */}
          <div className="flex items-center justify-between text-[12px] text-tt-navy border-t border-tt-page pt-3 mt-1.5">
            <span className="font-medium text-tt-muted">TOTAL PAID</span>
            <span className="text-[15px] font-bold text-tt-navy">${totalPrice}</span>
          </div>
        </Card>

        {/* CTA Stack */}
        <div className="flex flex-col gap-2.5 w-full">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleTrack}
          >
            Track your job <ArrowRight size={16} className="ml-1 shrink-0" />
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleViewReceipt}
          >
            <FileText size={16} className="mr-1.5 text-tt-muted shrink-0" />
            View receipt
          </Button>
        </div>

        {/* Secondary helper label */}
        <span className="text-[12px] text-tt-muted text-center leading-normal">
          Confirmation sent to your email and agent.
        </span>

      </div>
    </div>
  );
};
