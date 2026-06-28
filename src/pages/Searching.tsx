import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, CalendarBlank } from '@phosphor-icons/react';
import searchImage from '../assets/search.png';
import verifiedImage from '../assets/Verified.png';
import thumbtackImage from '../assets/Thumbtack logo.png';
import calendarImage from '../assets/calender icon.jfif';
import rankingImage from '../assets/ranking.png';
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
          next[index] = 'done';
          if (index + 1 < next.length) {
            next[index + 1] = 'loading';
          }
          return next;
        });
      }, time);
    });

    const completionTimer = setTimeout(() => {
      navigate('/results');
    }, 3500);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearTimeout(completionTimer);
    };
  }, [navigate]);

  // Calculate matching percentages for progress bar
  const doneCount = statuses.filter(s => s === 'done').length;
  const progressPercent = (doneCount / statuses.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-tt-dark flex flex-col justify-between items-center py-12 px-4 text-white overflow-hidden text-left">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tt-blue/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-10 pointer-events-none z-0" />

      {/* TOP LEFT: Tack Wordmark */}
      <div className="w-full max-w-[1200px] flex justify-start items-center relative z-10 select-none">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-[24px] font-bold text-white tracking-tight">Tack</span>
          <span className="text-[11px] text-white/50 font-sans tracking-wide">by Thumbtack</span>
        </div>
      </div>

      {/* CENTER WORKSPACE */}
      <div className="flex flex-col items-center gap-8 w-full max-w-[420px] my-auto relative z-10">
        
        {/* Pulsing radar scanning logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full border border-tt-blue/30 animate-ping [animation-duration:2.5s]" />
          <div className="relative z-10 flex items-center justify-center h-20 w-20 rounded-full border-2 border-white/20 bg-white/5 animate-pulse-subtle shadow-[0_0_30px_rgba(0,159,212,0.15)]">
            <span className="font-serif text-[40px] font-bold text-white select-none leading-none pt-0.5">T</span>
          </div>
        </div>

        {/* Title status */}
        <div className="text-center w-full">
          <span className="text-[12px] font-bold tracking-widest text-tt-blue block mb-1">
            GATHERING INTELLIGENCE
          </span>
          <p className="text-[15px] text-white/60 font-sans">
            AI agent matching with active local pros...
          </p>
        </div>

        {/* Progress Card container */}
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-5 text-slate-800 shadow-[0_16px_48px_rgba(0,0,0,0.3)] overflow-hidden relative">
          {/* Custom micro-progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
            <div 
              className="h-full bg-tt-blue transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-col mt-2 relative z-10 font-sans">
            {/* Row 1 */}
            <div className="flex flex-col border-b border-slate-100 py-3">
              <div className="flex items-center gap-3">
                <img src={searchImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${statuses[0] === 'done' ? '' : statuses[0] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Search" />
                <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${statuses[0] === 'done' ? 'text-slate-800' : statuses[0] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                  Searching Thumbtack's pro database...
                </span>
                {statuses[0] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
              </div>
              {/* Location detail map chip */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${statuses[0] !== 'pending' ? 'max-h-[60px] opacity-100 mt-2.5' : 'max-h-0 opacity-0'}`}>
                <div className="ml-8 flex items-center gap-3 bg-[#F8FAFC] border border-slate-100 rounded-xl p-2 hover:border-slate-300 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm text-slate-600 animate-scale-in">
                    <MapPin size={18} weight="regular" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-slate-800 font-bold">Target Location</span>
                    <span className="text-[11px] text-slate-500 truncate">Austin, TX (within 15 miles)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col border-b border-slate-100 py-3">
              <div className="flex items-center gap-3">
                <img src={verifiedImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${statuses[1] === 'done' ? '' : statuses[1] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Verified" />
                <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${statuses[1] === 'done' ? 'text-slate-800' : statuses[1] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                  Verifying licenses and credentials...
                </span>
                {statuses[1] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
              </div>
              {/* Verification detail chip */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${statuses[1] !== 'pending' ? 'max-h-[50px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="ml-8 flex items-center gap-2 text-[11px] text-slate-600 font-bold">
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md shadow-sm">License: OK</span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md shadow-sm">Background Checked</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col border-b border-slate-100 py-3">
              <div className="flex items-center gap-3">
                <img src={thumbtackImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${statuses[2] === 'done' ? '' : statuses[2] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Reviews" />
                <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${statuses[2] === 'done' ? 'text-slate-800' : statuses[2] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                  Reading reviews and ratings...
                </span>
                {statuses[2] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
              </div>
              {/* Reviews detail chip */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${statuses[2] !== 'pending' ? 'max-h-[50px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="ml-8 flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                  <span>Average rating:</span>
                  <span className="text-slate-800 font-bold">4.8+ Stars</span>
                  <span>&bull;</span>
                  <span>80+ reviews analyzed</span>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col border-b border-slate-100 py-3">
              <div className="flex items-center gap-3">
                <img src={calendarImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${statuses[3] === 'done' ? '' : statuses[3] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Calendar" />
                <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${statuses[3] === 'done' ? 'text-slate-800' : statuses[3] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                  Checking live availability...
                </span>
                {statuses[3] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
              </div>
              {/* Calendar detail chip */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${statuses[3] !== 'pending' ? 'max-h-[60px] opacity-100 mt-2.5' : 'max-h-0 opacity-0'}`}>
                <div className="ml-8 flex items-center gap-3 bg-[#F8FAFC] border border-slate-100 rounded-xl p-2 hover:border-slate-300 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm text-slate-600 animate-scale-in">
                    <CalendarBlank size={18} weight="regular" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-slate-800 font-bold">Live Openings</span>
                    <span className="text-[11px] text-slate-500 truncate">
                      {statuses[3] === 'done' ? '3 slot openings found (Sat Morning)' : 'Syncing calendar availability...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex flex-col py-3">
              <div className="flex items-center gap-3">
                <img src={rankingImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${statuses[4] === 'done' ? '' : statuses[4] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Ranking" />
                <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${statuses[4] === 'done' ? 'text-slate-800' : statuses[4] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                  Ranking by best match score...
                </span>
                {statuses[4] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
              </div>
              {/* Ranking match score chip */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${statuses[4] !== 'pending' ? 'max-h-[50px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="ml-8 flex items-center gap-2 text-[11px]">
                  <span className="text-slate-500 font-semibold">Top candidate match rate:</span>
                  <span className="text-slate-800 font-bold">98% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM VERSION ROW */}
      <div className="text-[12px] text-white/30 font-sans font-semibold tracking-wide relative z-10 select-none">
        Tack v1.0 &middot; Powered by Thumbtack
      </div>

    </div>
  );
};
