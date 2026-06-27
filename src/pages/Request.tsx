import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import type { TimePreferenceType } from '../context/BookingContext';
import { Button } from '../components/Button';
import { ProgressDots } from '../components/ProgressDots';

export const Request: React.FC = () => {
  const navigate = useNavigate();
  const {
    requestText,
    setRequestText,
    timePreference,
    setTimePreference,
    dateValue,
    setDateValue,
  } = useBooking();

  const [isRecording, setIsRecording] = useState(false);
  const [micTooltip, setMicTooltip] = useState('Use voice input');
  const timerRef = useRef<any>(null);

  const suggestions = [
    "Fix a leaking pipe this weekend",
    "Deep clean before my guests arrive Saturday",
    "Need an electrician for a faulty outlet",
    "Help me find a handyman for small repairs"
  ];

  const handleSuggestionClick = (text: string) => {
    setRequestText(text);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setIsRecording(true);
      setMicTooltip('Listening...');
      
      // Simulate speech transcription after 3.5 seconds
      timerRef.current = setTimeout(() => {
        setRequestText("Need a plumber to fix a leaking pipe in my bathroom this Saturday morning, preferably before noon.");
        setIsRecording(false);
        setMicTooltip('Use voice input');
      }, 3500);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    navigate('/searching');
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16 bg-tt-page animate-page-in font-sans relative overflow-hidden">
      {/* Ambient background blur lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-tt-blue-tint/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[520px] flex flex-col gap-8 relative z-10">
        
        {/* Wordmark logo & progress */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="font-serif text-[32px] font-bold text-tt-dark leading-none tracking-tight flex items-center gap-1">
              Tack
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-tt-blue" />
            </span>
            <span className="text-[11px] font-bold text-tt-muted tracking-widest uppercase font-sans mt-1">
              by Thumbtack
            </span>
          </div>
          <ProgressDots currentStep={1} totalSteps={3} />
        </div>

        {/* Header Text */}
        <div className="text-center">
          <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-snug mb-1">
            What do you need done?
          </h2>
          <p className="text-[12px] text-tt-muted leading-relaxed">
            Describe it naturally — your agent handles the rest.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-6">
          
          {/* Main text area card with glow focus styling */}
          <div className="bg-white rounded-[20px] border border-tt-border shadow-[0_6px_20px_rgba(28,43,51,0.05)] overflow-hidden flex flex-col focus-within:border-tt-blue focus-within:ring-4 focus-within:ring-tt-blue/10 transition-all duration-300">
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              className="w-full min-h-[145px] border-0 p-5 outline-none resize-none font-sans text-[15px] text-tt-navy placeholder:text-tt-muted focus:ring-0 leading-[1.7] bg-transparent"
              placeholder={
                isRecording 
                  ? "Listening... Speak now." 
                  : "e.g. My shower has been leaking for a week. Need a plumber this Saturday morning, preferably before noon. Budget around $150."
              }
              disabled={isRecording}
            />

            {/* Bottom tools row */}
            <div className="flex items-center justify-between border-t border-tt-border px-5 py-3.5 bg-[#FCFDFF]">
              
              {/* Voice input mic with custom double-pulse animation */}
              <div className="relative flex items-center justify-center">
                {isRecording && (
                  <>
                    <span className="absolute h-9 w-9 rounded-full bg-tt-blue/30 animate-pulse-ring pointer-events-none" />
                    <span className="absolute h-9 w-9 rounded-full bg-tt-blue/20 animate-pulse-ring pointer-events-none [animation-delay:0.75s]" />
                  </>
                )}
                
                <button
                  type="button"
                  onClick={toggleRecording}
                  title={micTooltip}
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                    isRecording 
                      ? 'bg-tt-blue text-white shadow-[0_0_12px_rgba(0,159,212,0.4)]' 
                      : 'text-tt-muted hover:text-tt-blue hover:bg-tt-page border border-tt-border bg-white shadow-sm'
                  } cursor-pointer`}
                >
                  <Mic size={18} className={isRecording ? 'animate-pulse' : ''} />
                </button>

                {isRecording && (
                  <span className="absolute left-12 flex items-center gap-1.5 text-[11px] font-bold text-tt-blue tracking-wide select-none animate-pulse">
                    <span>Listening</span>
                    <span className="inline-flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="h-[40px] px-5 active-press shadow-sm font-bold text-[13px]"
                disabled={!requestText.trim() || isRecording}
              >
                Ask Tack <ArrowRight size={14} className="ml-1.5 shrink-0" />
              </Button>
            </div>
          </div>

          {/* Quick suggestion chips with refined tags */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold tracking-wider text-tt-muted uppercase select-none">
              Try asking:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((text, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSuggestionClick(text)}
                  className="bg-white border border-tt-border rounded-full py-1.5 px-4 text-[12px] text-tt-navy font-semibold cursor-pointer shadow-[0_1px_3px_rgba(28,43,51,0.02)] transition-all duration-300 hover:border-tt-blue hover:text-tt-blue hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,159,212,0.06)] select-none"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Time preference card with focus glows */}
          <div className="bg-white rounded-2xl border border-tt-border p-5 flex flex-col gap-4 shadow-sm">
            <span className="text-[12px] font-bold tracking-wider text-tt-navy uppercase select-none">
              When do you need it?
            </span>
            
            {/* 3 tabs horizontal */}
            <div className="grid grid-cols-3 gap-2">
              {(['As soon as possible', 'This weekend', 'Pick a date'] as TimePreferenceType[]).map((pref) => {
                const isSelected = timePreference === pref;
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setTimePreference(pref)}
                    className={`h-[38px] text-[12px] font-bold rounded-full border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-tt-blue text-white border-transparent shadow-[0_2px_8px_rgba(0,159,212,0.25)]'
                        : 'bg-white text-tt-muted border-tt-border hover:border-tt-blue hover:text-tt-blue'
                    }`}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>

            {/* Date input conditional */}
            {timePreference === 'Pick a date' && (
              <div className="mt-1 animate-page-in">
                <input
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  className="w-full h-12 border border-tt-border rounded-xl px-4 font-sans text-[15px] text-tt-navy focus:border-tt-blue focus:ring-4 focus:ring-tt-blue/10 outline-none transition-all duration-300"
                />
              </div>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};
