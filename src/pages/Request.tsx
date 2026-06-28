import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Microphone, ArrowRight } from '@phosphor-icons/react';
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
    "Deep clean a 2 bedroom apartment",
    "Electrical outlet replacement",
    "Handyman to mount a TV"
  ];

  const handleSuggestionClick = (text: string) => {
    setRequestText(text);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setMicTooltip('Use voice input');
      if (timerRef.current) clearInterval(timerRef.current);
      // Mock voice transcribed query
      setRequestText("My shower has been leaking since yesterday. Need a certified plumber Saturday morning. Budget under $150.");
    } else {
      setIsRecording(true);
      setMicTooltip('Stop recording');
      setRequestText('');
      let count = 0;
      const phrases = ["Listening...", "Listening...", "Transcribing voice..."];
      timerRef.current = setInterval(() => {
        setRequestText(phrases[count % phrases.length]);
        count++;
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestText.trim() && !isRecording) {
      navigate('/searching');
    }
  };

  return (
    <div className="flex-grow bg-tt-page min-h-screen py-12 px-4 flex items-center justify-center animate-page-in font-sans relative overflow-hidden">
      {/* Ambient background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-tt-blue-tint/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[480px] flex flex-col gap-6 relative z-10 text-left">
        
        {/* Progress dots bar */}
        <div className="flex justify-center">
          <ProgressDots totalSteps={3} currentStep={1} />
        </div>

        {/* Header Title */}
        <div className="text-center">
          <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-tight select-none">
            Describe your request
          </h2>
          <p className="text-[12px] text-tt-muted font-semibold mt-1 max-w-[320px] mx-auto leading-relaxed">
            Say what you need in plain language. Tack will coordinate quotes and availability.
          </p>
        </div>

        {/* Form setup */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Main textarea container card */}
          <div className="bg-white border border-tt-border rounded-[20px] overflow-hidden flex flex-col shadow-sm focus-within:ring-4 focus-within:ring-tt-blue/5 focus-within:border-tt-blue transition-all duration-300">
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
                  <Microphone size={18} weight="regular" className={isRecording ? 'animate-pulse' : ''} />
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
                className="h-[40px] px-5 active-press shadow-sm font-bold text-[13px] flex items-center gap-1.5"
                disabled={!requestText.trim() || isRecording}
              >
                <span>Ask Tack</span>
                <ArrowRight size={14} weight="regular" className="shrink-0" />
              </Button>
            </div>
          </div>

          {/* Quick suggestion chips */}
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

          {/* Time preference card */}
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
