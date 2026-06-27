import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Wrench, Calendar, Clock, MapPin, User, Sparkles, CreditCard, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { mockProviders } from '../data/providers';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';

export const Approve: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProviderId, dateValue, regenerateBookingRef, spendLimit } = useBooking();

  // Find the selected provider, default to James P. if none selected
  const proId = selectedProviderId || 'pro-001';
  const pro = mockProviders.find((p) => p.id === proId) || mockProviders[0];

  const handleApprove = () => {
    // Regenerate a fresh booking ref to make the simulation feel new each time
    regenerateBookingRef();
    navigate('/confirmed');
  };

  const handleCancel = () => {
    navigate('/results');
  };

  // Date formatting helpers based on context preferences
  const formattedDate = dateValue 
    ? new Date(dateValue).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
    : 'Saturday, Jul 4, 2026';

  const proPrice = pro.price;
  const platformFee = Number((proPrice * 0.05).toFixed(2));
  const totalPrice = Number((proPrice + platformFee).toFixed(2));

  return (
    <div className="flex-grow bg-tt-page min-h-screen py-12 px-4 flex items-center justify-center animate-page-in font-sans relative overflow-hidden">
      {/* Ambient background blur lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-tt-blue-tint/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[520px] flex flex-col gap-4 relative z-10">
        
        {/* Back Link */}
        <button
          onClick={handleCancel}
          className="self-start flex items-center gap-1.5 text-[12px] font-bold text-tt-blue hover:text-tt-deep cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          Back to results
        </button>

        {/* MAIN MODAL REVIEW CARD */}
        <Card hoverable={false} className="bg-white border border-tt-border shadow-[0_8px_32px_rgba(28,43,51,0.06)] rounded-[20px] p-6 flex flex-col gap-6">
          
          {/* Header Title */}
          <div className="text-center">
            <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-tight mb-1 select-none">
              Review your booking
            </h2>
            <p className="text-[12px] text-tt-muted font-semibold leading-relaxed">
              Tack matched terms and is ready to secure this booking.
            </p>
          </div>

          {/* PRO INFO ROW */}
          <div className="flex items-center gap-3 pb-4.5 border-b border-tt-border">
            <Avatar initials={pro.initials} imageSrc={pro.imageSrc} size="sm" className="shrink-0 shadow-sm" />
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-tt-navy truncate">
                  {pro.name}
                </span>
                {pro.verified && (
                  <BadgeCheck size={16} className="text-tt-blue fill-tt-blue-tint shrink-0" />
                )}
              </div>
              <p className="text-[12px] text-tt-muted font-semibold">
                {pro.service}
              </p>
            </div>
            
            {/* Rating side block */}
            <div className="text-right shrink-0">
              <div className="flex items-center gap-0.5 justify-end text-[12px] font-bold text-tt-navy">
                <Star size={12} className="text-tt-star fill-tt-star stroke-none mr-0.5" />
                {pro.rating}
              </div>
              <div className="text-[12px] text-tt-muted font-semibold">
                {pro.reviewCount} reviews
              </div>
            </div>
          </div>

          {/* STACKED DETAIL LIST */}
          <div className="flex flex-col gap-3">
            {/* Service */}
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted font-semibold uppercase tracking-wider">
                <Wrench size={16} className="text-tt-muted shrink-0" />
                <span>Service</span>
              </div>
              <span className="text-[15px] font-bold text-tt-navy">
                {pro.service} Repair
              </span>
            </div>
            
            {/* Date */}
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted font-semibold uppercase tracking-wider">
                <Calendar size={16} className="text-tt-muted shrink-0" />
                <span>Date</span>
              </div>
              <span className="text-[15px] font-bold text-tt-navy">
                {formattedDate}
              </span>
            </div>
            
            {/* Time */}
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted font-semibold uppercase tracking-wider">
                <Clock size={16} className="text-tt-muted shrink-0" />
                <span>Time slot</span>
              </div>
              <span className="text-[15px] font-bold text-tt-navy">
                {pro.availability.replace('Sat ', '')}
              </span>
            </div>
            
            {/* Location */}
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted font-semibold uppercase tracking-wider">
                <MapPin size={16} className="text-tt-muted shrink-0" />
                <span>Location</span>
              </div>
              <span className="text-[15px] font-bold text-tt-navy truncate max-w-[240px]" title="742 Main St, San Francisco">
                742 Main St, San Francisco
              </span>
            </div>
            
            {/* Provider License */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted font-semibold uppercase tracking-wider">
                <User size={16} className="text-tt-muted shrink-0" />
                <span>Provider</span>
              </div>
              <span className="text-[15px] font-bold text-tt-navy">
                {pro.name} &middot; Licensed
              </span>
            </div>
          </div>

          {/* AI RECOMMENDATION INSIGHT */}
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 flex flex-col gap-1.5 shadow-[inset_0_1px_2px_rgba(253,230,138,0.15)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#92400E] uppercase tracking-wide">
              <Sparkles size={14} className="text-[#F59E0B] shrink-0 animate-pulse" />
              <span>Why Tack recommended this</span>
            </div>
            <p className="text-[12px] text-[#92400E] leading-relaxed font-bold">
              {pro.matchReason || `James has the best availability for your requested slot, stays within your $${spendLimit} limit, and has excellent positive ratings for similar tasks.`}
            </p>
          </div>

          {/* PRICING BREAKDOWN */}
          <div className="bg-tt-page rounded-xl p-4.5 flex flex-col gap-2.5 border border-tt-border shadow-inner">
            <div className="flex justify-between items-center text-[12px] text-tt-muted font-semibold">
              <span>Service fee</span>
              <span>${proPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-[12px] text-tt-muted font-semibold">
              <span>Platform fee (5%)</span>
              <span>${platformFee.toFixed(2)}</span>
            </div>
            
            <div className="h-[1px] bg-tt-border my-1" />
            
            <div className="flex justify-between items-center text-[15px] font-extrabold text-tt-navy">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-tt-muted font-bold justify-center bg-white border border-tt-border rounded-lg py-1 px-3 self-center shadow-sm select-none">
              <CreditCard size={14} className="text-tt-muted" />
              <span>Visa ending in 4242</span>
            </div>
          </div>

          {/* TWO ACTION BUTTONS STACK */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full active-press shadow-md font-bold text-[15px]"
              onClick={handleApprove}
            >
              Approve & book
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="w-full active-press font-bold text-[15px]"
              onClick={handleCancel}
            >
              Choose a different pro
            </Button>
          </div>

          {/* Fine print */}
          <div className="text-center text-[12px] text-tt-muted font-semibold select-none">
            Free cancellation up to 2 hours before booking.
          </div>

        </Card>
      </div>
    </div>
  );
};
