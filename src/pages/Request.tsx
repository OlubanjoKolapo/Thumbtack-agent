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
      // Turn off
      setIsRecording(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      // Turn on simulation
      setIsRecording(true);
      setMicTooltip('Listening...');
      
      // Simulate speech transcription after 3 seconds
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
    <div className="flex-grow flex items-center justify-center px-4 py-12 bg-tt-page animate-page-in">
      <div className="w-full max-w-[520px] flex flex-col gap-6">
        
        {/* Wordmark logo & progress */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="font-serif text-[28px] font-bold text-tt-dark">Tack</span>
            <span className="text-[12px] text-tt-muted tracking-wide font-sans">by Thumbtack</span>
          </div>
          <ProgressDots currentStep={1} totalSteps={3} />
        </div>

        {/* Header Text */}
        <div className="text-center">
          <h2 className="text-[28px] font-bold font-serif text-tt-navy mb-1.5">
            What do you need done?
          </h2>
          <p className="text-[15px] text-tt-muted font-sans">
            Describe it naturally — your agent handles the rest.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-5">
          {/* Main text area card */}
          <div className="bg-white rounded-[20px] border border-tt-border shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col focus-within:border-tt-blue transition-all">
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              className="w-full min-h-[140px] border-0 p-5 outline-none resize-none font-sans text-base text-tt-navy placeholder:text-tt-muted focus:ring-0 leading-[1.7]"
              placeholder={
                isRecording 
                  ? "Listening... Speak now" 
                  : "e.g. My shower has been leaking for a week. Need a plumber this Saturday morning, preferably before noon. Budget around $150."
              }
              disabled={isRecording}
            />

            {/* Bottom tools row */}
            <div className="flex items-center justify-between border-t border-tt-border px-4 py-3 bg-white">
              
              {/* Voice input mic with custom animations */}
              <div className="relative flex items-center justify-center">
                {isRecording && (
                  <span className="absolute h-9 w-9 rounded-full bg-tt-blue/20 animate-pulse-ring pointer-events-none" />
                )}
                <button
                  type="button"
                  onClick={toggleRecording}
                  title={micTooltip}
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-tt-blue-tint text-tt-blue' 
                      : 'text-tt-muted hover:text-tt-blue hover:bg-tt-page'
                  } cursor-pointer`}
                >
                  <Mic size={20} className={isRecording ? 'animate-bounce stroke-[2]' : ''} />
                </button>
                {isRecording && (
                  <span className="absolute -top-7 text-[10px] bg-tt-dark text-white px-2 py-0.5 rounded shadow">
                    Listening
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="h-[40px]"
                disabled={!requestText.trim() || isRecording}
              >
                Ask Tack <ArrowRight size={14} className="ml-1 shrink-0" />
              </Button>
            </div>
          </div>

          {/* Quick suggestion chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold text-tt-muted font-sans">
              Try asking:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((text, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSuggestionClick(text)}
                  className="bg-white border border-tt-border rounded-full py-1.5 px-3.5 text-[13px] text-tt-navy font-medium cursor-pointer transition-all duration-150 hover:border-tt-blue hover:text-tt-blue select-none"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Time preference row */}
          <div className="bg-white rounded-xl border border-tt-border p-4.5 flex flex-col gap-3">
            <span className="text-[13px] font-semibold text-tt-navy font-sans">
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
                    className={`h-9 text-[13px] font-semibold rounded-full border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-tt-blue text-white border-transparent'
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
                  className="w-full h-11 border border-tt-border rounded-xl px-4 font-sans text-sm text-tt-navy focus:border-tt-blue outline-none"
                />
              </div>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};
