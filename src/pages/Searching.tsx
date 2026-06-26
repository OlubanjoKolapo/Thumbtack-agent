import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, Calendar, TrendingUp } from 'lucide-react';
import { IntelligenceRow } from '../components/IntelligenceRow';

// Custom Thumbtack Pin icon for the database row
const ThumbtackIcon: React.FC = () => (
  <span className="font-serif font-extrabold text-[15px] select-none leading-none">T</span>
);

export const Searching: React.FC = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<('pending' | 'loading' | 'done')[]>([
    'loading',
    'pending',
    'pending',
    'pending',
    'pending',
  ]);

  useEffect(() => {
    const intervals = [600, 1200, 1800, 2400, 3000];
    
    const timers = intervals.map((time, index) => {
      return setTimeout(() => {
        setStatuses((prev) => {
          const next = [...prev];
          // Mark current item as done
          next[index] = 'done';
          // Mark next item as loading (if there is one)
          if (index + 1 < next.length) {
            next[index + 1] = 'loading';
          }
          return next;
        });
      }, time);
    });

    // Auto-navigate to /results after all rows finish loading
    const completionTimer = setTimeout(() => {
      navigate('/results');
    }, 3500);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearTimeout(completionTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-tt-dark flex flex-col justify-between items-center py-10 px-4 text-white">
      {/* TOP LEFT: Tack Wordmark */}
      <div className="w-full max-w-[1200px] flex justify-start items-center">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-[24px] font-bold text-white tracking-tight">Tack</span>
          <span className="text-[11px] text-white/50 font-sans tracking-wide">by Thumbtack</span>
        </div>
      </div>

      {/* CENTER WORKSPACE */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[420px] my-auto">
        
        {/* Pulsing Pin logo mark */}
        <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 border-white/20 bg-white/5 animate-pulse-subtle">
          <span className="font-serif text-[40px] font-bold text-white select-none leading-none pt-0.5">T</span>
        </div>

        {/* Title status */}
        <div className="text-center">
          <span className="text-[12px] font-bold tracking-widest text-tt-blue block mb-1">
            GATHERING INTELLIGENCE
          </span>
          <p className="text-[14px] text-white/60 font-sans">
            AI agent matching with active local pros...
          </p>
        </div>

        {/* Progress Card container */}
        <div className="w-full bg-white rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
          {/* Row 1 */}
          <IntelligenceRow
            icon={ThumbtackIcon}
            iconBgColor="bg-tt-blue-tint"
            iconColor="text-tt-blue font-serif"
            text="Searching Thumbtack's pro database..."
            status={statuses[0]}
          />
          {/* Row 2 */}
          <IntelligenceRow
            icon={ShieldCheck}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-500"
            text="Verifying licenses and credentials..."
            status={statuses[1]}
          />
          {/* Row 3 */}
          <IntelligenceRow
            icon={Star}
            iconBgColor="bg-[#FEF9EE]"
            iconColor="text-[#F4A623]"
            text="Reading reviews and ratings..."
            status={statuses[2]}
          />
          {/* Row 4 */}
          <IntelligenceRow
            icon={Calendar}
            iconBgColor="bg-sky-100"
            iconColor="text-sky-500"
            text="Checking live availability..."
            status={statuses[3]}
          />
          {/* Row 5 */}
          <IntelligenceRow
            icon={TrendingUp}
            iconBgColor="bg-indigo-100"
            iconColor="text-indigo-500"
            text="Ranking by match score..."
            status={statuses[4]}
          />
        </div>
      </div>

      {/* BOTTOM VERSION ROW */}
      <div className="text-[12px] text-white/40 font-sans font-medium tracking-wide">
        Tack v1.0 &middot; Powered by Thumbtack
      </div>

    </div>
  );
};
