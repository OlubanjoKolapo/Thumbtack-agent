import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Calendar, MapPin, DollarSign, Sparkles, ChevronDown, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { mockProviders } from '../data/providers';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedProviderId, spendLimit } = useBooking();
  const [sortBy, setSortBy] = useState<'relevance' | 'price' | 'rating'>('relevance');

  // Filter & sort mock logic
  const sortedProviders = [...mockProviders].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.matchScore - a.matchScore; // relevance
  });

  const bestMatch = sortedProviders[0];
  const otherMatches = sortedProviders.slice(1);

  const handleSelectPro = (proId: string) => {
    setSelectedProviderId(proId);
    navigate('/approve');
  };

  const handleBack = () => {
    navigate('/request');
  };

  // Format headers / subtext info
  const displaySummary = `3 pros found · Saturday AM · under $${spendLimit}`;

  return (
    <div className="flex-grow bg-tt-page min-h-screen pb-16 animate-page-in font-sans">
      
      {/* Top filter navigation bar */}
      <div className="bg-white border-b border-tt-border h-[60px] px-4 md:px-8">
        <div className="max-w-[720px] mx-auto h-full flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-[15px] font-semibold text-tt-navy hover:text-tt-blue cursor-pointer"
          >
            <ArrowLeft size={16} className="stroke-[2.5]" />
            New request
          </button>

          {/* Matches overview */}
          <span className="text-[12px] md:text-[15px] text-tt-muted font-medium select-none truncate">
            {displaySummary}
          </span>

          {/* Sort selection dropdown */}
          <div className="relative flex items-center gap-1">
            <span className="text-[12px] text-tt-muted font-medium select-none">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-transparent font-semibold text-[12px] text-tt-navy pr-6 pl-1.5 py-1 border-0 focus:ring-0 focus:outline-none cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown size={12} className="text-tt-navy absolute right-0 pointer-events-none stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Main Results List */}
      <div className="max-w-[560px] mx-auto px-4 mt-8 flex flex-col gap-6">
        
        {/* Section title */}
        <h2 className="text-[28px] font-bold font-serif text-tt-navy mb-1 select-none">
          Recommended Pros
        </h2>

        {/* HERO RESULT CARD (BEST MATCH) */}
        {bestMatch && (
          <Card
            variant="featured"
            hoverable={true}
            className="border-2 border-tt-blue shadow-[0_4px_16px_rgba(0,0,0,0.08)] bg-white p-6 rounded-2xl flex flex-col gap-4"
          >
            {/* Best Match Header badge row */}
            <div className="flex items-center justify-between">
              <Badge variant="blue" className="text-[12px] font-semibold px-3 py-0.5">
                Best match
              </Badge>
              <button 
                onClick={() => handleSelectPro(bestMatch.id)}
                className="text-[12px] font-semibold text-tt-blue hover:text-tt-deep hover:underline cursor-pointer"
              >
                Why Tack picked this
              </button>
            </div>

            {/* Pro details row */}
            <div className="flex gap-4">
              <Avatar initials={bestMatch.initials} size="md" className="shrink-0" />
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[15px] font-semibold text-tt-navy truncate">
                    {bestMatch.name}
                  </h3>
                  {bestMatch.verified && (
                    <BadgeCheck size={16} className="text-tt-blue fill-tt-blue-tint shrink-0" />
                  )}
                  <span className="text-[12px] text-tt-blue font-semibold shrink-0">
                    Thumbtack verified
                  </span>
                </div>
                <p className="text-[12px] text-tt-muted truncate">
                  {bestMatch.service}
                </p>
                {/* Ratings */}
                <div className="flex items-center gap-1 mt-1 text-[12px]">
                  <Star size={12} className="text-tt-star fill-tt-star stroke-none" />
                  <span className="font-semibold text-tt-navy">{bestMatch.rating}</span>
                  <span className="text-tt-muted">({bestMatch.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Pro Bio */}
            {bestMatch.bio && (
              <p className="text-[12px] text-tt-muted leading-relaxed">
                {bestMatch.bio}
              </p>
            )}

            {/* Highlights details chips row */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-tt-page border border-tt-border rounded-xl px-2.5 py-1 text-[12px] text-tt-navy">
                <Calendar size={14} className="text-tt-muted" />
                <span>{bestMatch.availability} available</span>
              </div>
              <div className="flex items-center gap-1 bg-tt-page border border-tt-border rounded-xl px-2.5 py-1 text-[12px] text-tt-navy">
                <MapPin size={14} className="text-tt-muted" />
                <span>{bestMatch.distanceMiles} miles away</span>
              </div>
              <div className="flex items-center gap-1 bg-tt-page border border-tt-border rounded-xl px-2.5 py-1 text-[12px] text-tt-navy">
                <DollarSign size={14} className="text-tt-muted" />
                <span>${bestMatch.price} {bestMatch.priceUnit} rate</span>
              </div>
            </div>

            {/* Honey yellow AI reasoning block */}
            {bestMatch.matchReason && (
              <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 flex gap-2">
                <Sparkles size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#92400E] leading-normal font-medium">
                  {bestMatch.matchReason}
                </p>
              </div>
            )}

            {/* CTA action button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-2"
              onClick={() => handleSelectPro(bestMatch.id)}
            >
              Book via Tack →
            </Button>
          </Card>
        )}

        {/* OTHER RESULTS */}
        {otherMatches.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold tracking-wider text-tt-muted uppercase select-none mt-2">
              Other options
            </span>

            {otherMatches.map((pro) => (
              <Card
                key={pro.id}
                variant="default"
                hoverable={true}
                className="bg-white border border-tt-border p-4.5 rounded-2xl flex flex-col gap-3"
              >
                {/* Pro main line */}
                <div className="flex gap-4">
                  <Avatar initials={pro.initials} size="sm" className="shrink-0" />
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[15px] font-semibold text-tt-navy truncate">
                        {pro.name}
                      </h4>
                      {pro.verified && (
                        <BadgeCheck size={16} className="text-tt-blue fill-tt-blue-tint shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] text-tt-muted truncate">
                      {pro.service}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5 text-[12px]">
                      <Star size={12} className="text-tt-star fill-tt-star stroke-none" />
                      <span className="font-semibold text-tt-navy">{pro.rating}</span>
                      <span className="text-tt-muted">({pro.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Pricing / Booking right-side column */}
                  <div className="text-right shrink-0">
                    <div className="text-[15px] font-bold text-tt-navy">
                      ${pro.price}
                    </div>
                    <div className="text-[12px] text-tt-muted">
                      {pro.priceUnit} rate
                    </div>
                  </div>
                </div>

                {/* Details layout row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-tt-page pt-3">
                  <div className="flex gap-2.5">
                    <span className="text-[12px] text-tt-muted">
                      {pro.availability}
                    </span>
                    <span className="text-[12px] text-tt-border">|</span>
                    <span className="text-[12px] text-tt-muted">
                      {pro.distanceMiles} miles away
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-4 text-xs font-semibold"
                    onClick={() => handleSelectPro(pro.id)}
                  >
                    Select
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
