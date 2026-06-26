import React from 'react';
import { Navigation, Check, Shield, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { mockProviders } from '../data/providers';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';

export const Track: React.FC = () => {
  const { selectedProviderId, bookingRef } = useBooking();

  // Selected pro
  const proId = selectedProviderId || 'pro-001';
  const pro = mockProviders.find((p) => p.id === proId) || mockProviders[0];

  return (
    <div className="flex-grow bg-tt-page min-h-screen py-10 px-4 flex justify-center animate-page-in font-sans">
      <div className="w-full max-w-[560px] flex flex-col gap-5">
        
        {/* Page Header */}
        <div>
          <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-none mb-1 text-center select-none">
            Job Tracker
          </h2>
          <p className="text-[12px] text-tt-muted text-center">
            Real-time status updates for your service professional
          </p>
        </div>

        {/* PRO CARD STATUS */}
        <Card hoverable={false} className="bg-white border border-tt-border p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* Pro Info Left */}
            <div className="flex items-center gap-3">
              <Avatar initials={pro.initials} size="sm" className="shrink-0" />
              <div>
                <h3 className="text-[15px] font-semibold text-tt-navy">
                  {pro.name}
                </h3>
                <p className="text-[12px] text-tt-muted">
                  {pro.service}
                </p>
              </div>
            </div>
            
            {/* Status Badge Right */}
            <div className="text-right shrink-0">
              <Badge variant="green" className="text-[12px] font-bold px-2.5 py-0.5">
                En route
              </Badge>
              <div className="text-[12px] text-tt-blue font-bold mt-1">
                ETA 12 min
              </div>
            </div>
          </div>

          {/* ETA Live Bar */}
          <div className="bg-tt-blue-tint rounded-xl p-3 flex items-center gap-2 border border-tt-blue/10">
            <Navigation size={16} className="text-tt-blue rotate-45 shrink-0" />
            <span className="text-[12px] text-tt-blue font-semibold">
              {pro.name} is {pro.distanceMiles} miles away &middot; ETA 9:12 AM
            </span>
          </div>
        </Card>

        {/* TIMELINE */}
        <Card hoverable={false} className="bg-white border border-tt-border p-6 rounded-2xl flex flex-col gap-6">
          <h4 className="text-[12px] font-bold tracking-wider text-tt-muted uppercase select-none pb-2 border-b border-tt-page">
            Activity log
          </h4>

          {/* Vertical Timeline container */}
          <div className="relative pl-8 flex flex-col gap-8">
            
            {/* Connecting line backgrounds */}
            <div className="absolute top-[8px] bottom-[8px] left-[10px] w-[2px] bg-tt-border z-0">
              {/* Completed line portion */}
              <div className="absolute top-0 left-0 w-full h-[25%] bg-[#16A34A]" />
            </div>

            {/* STEP 1: DONE */}
            <div className="relative z-10 flex items-start gap-4">
              {/* Checkmark indicator */}
              <div className="absolute left-[-28px] h-5 w-5 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-tt-navy block">
                  Confirmed
                </span>
                <span className="text-[12px] text-tt-muted block">
                  May 3 &middot; 8:45 AM
                </span>
              </div>
            </div>

            {/* STEP 2: ACTIVE */}
            <div className="relative z-10 flex items-start gap-4">
              {/* Pulsing pointer indicator */}
              <div className="absolute left-[-28px] flex items-center justify-center">
                <span className="absolute h-7 w-7 rounded-full bg-tt-blue/30 animate-pulse-ring" />
                <div className="relative h-5 w-5 rounded-full bg-tt-blue flex items-center justify-center text-white">
                  <Navigation size={10} className="rotate-45 fill-white" />
                </div>
              </div>
              <div>
                <span className="text-[15px] font-bold text-tt-blue block">
                  En route
                </span>
                <span className="text-[12px] text-tt-blue font-semibold block">
                  ETA 9:12 AM
                </span>
              </div>
            </div>

            {/* STEP 3: PENDING */}
            <div className="relative z-10 flex items-start gap-4">
              <div className="absolute left-[-28px] h-5 w-5 rounded-full border-2 border-tt-border bg-white" />
              <div>
                <span className="text-[15px] font-semibold text-tt-muted block">
                  Arrived
                </span>
              </div>
            </div>

            {/* STEP 4: PENDING */}
            <div className="relative z-10 flex items-start gap-4">
              <div className="absolute left-[-28px] h-5 w-5 rounded-full border-2 border-tt-border bg-white" />
              <div>
                <span className="text-[15px] font-semibold text-tt-muted block">
                  In progress
                </span>
              </div>
            </div>

            {/* STEP 5: PENDING */}
            <div className="relative z-10 flex items-start gap-4">
              <div className="absolute left-[-28px] h-5 w-5 rounded-full border-2 border-tt-border bg-white" />
              <div>
                <span className="text-[15px] font-semibold text-tt-muted block">
                  Completed
                </span>
              </div>
            </div>

          </div>
        </Card>

        {/* BOOKING REFERENCE CARD */}
        <div className="bg-white rounded-xl border border-tt-border p-4.5 flex justify-between items-center">
          <span className="text-[12px] text-tt-muted font-medium">
            Booking reference
          </span>
          <span className="font-mono text-[12px] text-tt-navy font-bold select-all">
            {bookingRef}
          </span>
        </div>

        {/* BOTTOM STICKY BAR */}
        <div className="bg-white border border-tt-border rounded-xl px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-[15px] text-tt-navy font-semibold">
            <Shield size={16} className="text-tt-muted" />
            <span>Problem with your booking?</span>
          </div>
          <a
            href="mailto:support@thumbtack.com"
            className="text-[12px] font-bold text-tt-blue hover:text-tt-deep flex items-center gap-0.5 cursor-pointer"
          >
            Get help <ArrowRight size={12} className="stroke-[2.5]" />
          </a>
        </div>

      </div>
    </div>
  );
};
