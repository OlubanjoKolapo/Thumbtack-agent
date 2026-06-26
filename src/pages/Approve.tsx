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
    <div className="flex-grow bg-tt-page min-h-screen py-10 px-4 flex items-center justify-center animate-page-in font-sans">
      <div className="w-full max-w-[520px] flex flex-col gap-4">
        
        {/* Back Link */}
        <button
          onClick={handleCancel}
          className="self-start flex items-center gap-1 text-[12px] font-semibold text-tt-blue hover:text-tt-deep cursor-pointer"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          Back to results
        </button>

        {/* MAIN MODAL REVIEW CARD */}
        <Card hoverable={false} className="bg-white border border-tt-border shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-[20px] p-6 flex flex-col gap-5">
          
          {/* Header Title */}
          <div>
            <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-none mb-1 text-center">
              Review your booking
            </h2>
            <p className="text-[12px] text-tt-muted text-center">
              Please check the booking details and confirm matching terms.
            </p>
          </div>

          {/* PRO INFO ROW */}
          <div className="flex items-center gap-3 pb-4 border-b border-tt-border">
            <Avatar initials={pro.initials} size="sm" className="shrink-0" />
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-semibold text-tt-navy truncate">
                  {pro.name}
                </span>
                {pro.verified && (
                  <BadgeCheck size={16} className="text-tt-blue fill-tt-blue-tint shrink-0" />
                )}
              </div>
              <p className="text-[12px] text-tt-muted truncate">
                {pro.service}
              </p>
            </div>
            {/* Rating side block */}
            <div className="text-right shrink-0">
              <div className="flex items-center gap-0.5 justify-end text-[12px] font-semibold text-tt-navy">
                <Star size={12} className="text-tt-star fill-tt-star stroke-none mr-0.5" />
                {pro.rating}
              </div>
              <div className="text-[12px] text-tt-muted">
                {pro.reviewCount} reviews
              </div>
            </div>
          </div>

          {/* STACKED DETAIL ROWS */}
          <div className="flex flex-col gap-2.5">
            {/* Service */}
            <div className="flex items-center justify-between py-1 border-b border-tt-page">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted">
                <Wrench size={16} className="text-tt-muted shrink-0" />
                <span>Service</span>
              </div>
              <span className="text-[15px] font-semibold text-tt-navy">
                {pro.service} Repair
              </span>
            </div>
            {/* Date */}
            <div className="flex items-center justify-between py-1 border-b border-tt-page">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted">
                <Calendar size={16} className="text-tt-muted shrink-0" />
                <span>Date</span>
              </div>
              <span className="text-[15px] font-semibold text-tt-navy">
                {formattedDate}
              </span>
            </div>
            {/* Time */}
            <div className="flex items-center justify-between py-1 border-b border-tt-page">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted">
                <Clock size={16} className="text-tt-muted shrink-0" />
                <span>Time slot</span>
              </div>
              <span className="text-[15px] font-semibold text-tt-navy">
                {pro.availability.replace('Sat ', '')}
              </span>
            </div>
            {/* Location */}
            <div className="flex items-center justify-between py-1 border-b border-tt-page">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted">
                <MapPin size={16} className="text-tt-muted shrink-0" />
                <span>Location</span>
              </div>
              <span className="text-[15px] font-semibold text-tt-navy truncate max-w-[240px]" title="742 Main St, San Francisco">
                742 Main St, San Francisco
              </span>
            </div>
            {/* Provider License */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-[12px] text-tt-muted">
                <User size={16} className="text-tt-muted shrink-0" />
                <span>Provider</span>
              </div>
              <span className="text-[15px] font-semibold text-tt-navy">
                {pro.name} &middot; {pro.verified ? 'Licensed' : 'Verified'}
              </span>
            </div>
          </div>

          {/* AI RECOMMENDATION INSIGHT */}
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#92400E]">
              <Sparkles size={14} className="text-[#F59E0B] shrink-0" />
              <span>Why Tack recommended this</span>
            </div>
            <p className="text-[12px] text-[#92400E] leading-normal font-medium">
              {pro.matchReason || `James has the best availability for your requested slot, stays within your $${spendLimit} limit, and has excellent positive ratings for similar tasks.`}
            </p>
          </div>

          {/* PRICING BREAKDOWN */}
          <div className="bg-tt-page rounded-xl p-4.5 flex flex-col gap-2 border border-tt-border">
            <div className="flex justify-between items-center text-[12px] text-tt-muted">
              <span>Service fee</span>
              <span>${proPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[12px] text-tt-muted">
              <span>Platform fee (5%)</span>
              <span>${platformFee.toFixed(2)}</span>
            </div>
            <div className="h-[1px] bg-tt-border my-1.5" />
            <div className="flex justify-between items-center text-[15px] font-bold text-tt-navy">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[12px] text-tt-muted font-medium justify-center">
              <CreditCard size={14} />
              <span>Payment method &bull;&bull;&bull;&bull; 4242</span>
            </div>
          </div>

          {/* TWO ACTION BUTTONS STACK */}
          <div className="flex flex-col gap-2.5 w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleApprove}
            >
              Approve & book
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleCancel}
            >
              Choose a different pro
            </Button>
          </div>

          {/* Fine print */}
          <div className="text-center text-[12px] text-tt-muted select-none mt-1">
            Free cancellation up to 2 hours before booking.
          </div>

        </Card>
      </div>
    </div>
  );
};
