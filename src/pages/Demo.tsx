import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUp, 
  Check, 
  MapPin, 
  Seal, 
  CreditCard, 
  Wrench,
  CalendarBlank,
  Clock,
  CheckCircle
} from '@phosphor-icons/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';

// Import image assets
import claudeLogo from '../assets/claude logo.png';
import person1 from '../assets/person 1.webp';
import person2 from '../assets/person 2.jpg';
import searchImage from '../assets/search.png';
import verifiedImage from '../assets/Verified.png';
import thumbtackImage from '../assets/Thumbtack logo.png';
import calendarImage from '../assets/calender icon.jfif';
import rankingImage from '../assets/ranking.png';

type DemoState = 'IDLE' | 'SEARCHING' | 'RESULTS' | 'APPROVAL' | 'CONFIRMED';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  customNode?: React.ReactNode;
}

// Staggered Embedded Checklist Component inside Chat Bubble
const EmbeddedSearchCard: React.FC = () => {
  const [checkedCount, setCheckedCount] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCheckedCount(prev => {
        if (prev >= 5) {
          clearInterval(timer);
          return 5;
        }
        return prev + 1;
      });
    }, 80); // Stagger interval (fast, simulating agent intelligence)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-[10px] p-2.5 mt-2 shadow-inner font-sans text-left">
      <div className="flex items-center gap-1 mb-1.5 select-none">
        <span className="font-serif font-extrabold text-[10px] text-tt-blue">T</span>
        <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase">TACK SEARCHING</span>
      </div>
      <div className="flex flex-col gap-1 text-[12px] text-tt-navy font-semibold">
        <div className="flex items-center justify-between">
          <span className={checkedCount >= 1 ? "text-tt-navy" : "text-tt-muted"}>✓ Thumbtack database</span>
          {checkedCount >= 1 ? <span className="text-[#22C55E]">✓</span> : <span className="text-tt-blue animate-pulse">...</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className={checkedCount >= 2 ? "text-tt-navy" : "text-tt-muted"}>✓ Verifying credentials</span>
          {checkedCount >= 2 ? <span className="text-[#22C55E]">✓</span> : checkedCount === 1 ? <span className="text-tt-blue animate-pulse">...</span> : <span className="text-tt-border">o</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className={checkedCount >= 3 ? "text-tt-navy" : "text-tt-muted"}>✓ Checking availability</span>
          {checkedCount >= 3 ? <span className="text-[#22C55E]">✓</span> : checkedCount === 2 ? <span className="text-tt-blue animate-pulse">...</span> : <span className="text-tt-border">o</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className={checkedCount >= 4 ? "text-tt-navy" : "text-tt-muted"}>✓ Reading reviews</span>
          {checkedCount >= 4 ? <span className="text-[#22C55E]">✓</span> : checkedCount === 3 ? <span className="text-tt-blue animate-pulse">...</span> : <span className="text-tt-border">o</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className={checkedCount >= 5 ? "text-tt-navy" : "text-tt-muted"}>✓ Ranking matches</span>
          {checkedCount >= 5 ? <span className="text-[#22C55E]">✓</span> : checkedCount === 4 ? <span className="text-tt-blue animate-pulse">...</span> : <span className="text-tt-border">o</span>}
        </div>
      </div>
    </div>
  );
};

export const Demo: React.FC = () => {
  const navigate = useNavigate();
  
  // State Machine
  const [currentState, setCurrentState] = useState<DemoState>('IDLE');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [pulseSync, setPulseSync] = useState<boolean>(false);

  // Stagger checklist for Search State
  const [searchCheckpoints, setSearchCheckpoints] = useState<('pending' | 'loading' | 'done')[]>([
    'pending',
    'pending',
    'pending',
    'pending',
    'pending',
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Trigger sync light animations
  const triggerSyncFlash = () => {
    setPulseSync(true);
    setTimeout(() => setPulseSync(false), 800);
  };

  // Autoplay script orchestration
  useEffect(() => {
    if (!isAutoplay) return;

    // Turn 1: User sends message (1.5s delay)
    const t1 = setTimeout(() => {
      triggerSyncFlash();
      setChatMessages([
        {
          id: '1',
          sender: 'user',
          text: 'Need a certified plumber Saturday morning to fix a leaking shower head. Budget is under $150.',
          timestamp: '12:00 PM'
        }
      ]);
    }, 1500);

    // Turn 2: Claude replies + starts Tack Search (4.5s delay)
    const t2 = setTimeout(() => {
      setIsTyping(true);
    }, 3200);

    const t3 = setTimeout(() => {
      setIsTyping(false);
      triggerSyncFlash();
      setChatMessages(prev => [
        ...prev,
        {
          id: '2',
          sender: 'agent',
          text: "I'll coordinate that. Running Tack searching loops to filter local plumbers in San Francisco...",
          timestamp: '12:01 PM',
          customNode: <EmbeddedSearchCard />
        }
      ]);
      setCurrentState('SEARCHING');
    }, 4500);

    // Searching staggered states checklist (5s to 9s)
    const step1 = setTimeout(() => {
      setSearchCheckpoints(['loading', 'pending', 'pending', 'pending', 'pending']);
    }, 5500);
    const step2 = setTimeout(() => {
      setSearchCheckpoints(['done', 'loading', 'pending', 'pending', 'pending']);
    }, 6500);
    const step3 = setTimeout(() => {
      setSearchCheckpoints(['done', 'done', 'loading', 'pending', 'pending']);
    }, 7500);
    const step4 = setTimeout(() => {
      setSearchCheckpoints(['done', 'done', 'done', 'loading', 'pending']);
    }, 8500);
    const step5 = setTimeout(() => {
      setSearchCheckpoints(['done', 'done', 'done', 'done', 'loading']);
    }, 9500);

    // Turn 3: Results display (10.5s delay)
    const t4 = setTimeout(() => {
      setSearchCheckpoints(['done', 'done', 'done', 'done', 'done']);
    }, 10500);

    const t5 = setTimeout(() => {
      setIsTyping(true);
    }, 11200);

    const t6 = setTimeout(() => {
      setIsTyping(false);
      triggerSyncFlash();
      setChatMessages(prev => [
        ...prev,
        {
          id: '3',
          sender: 'agent',
          text: "I've matched 3 certified plumbers in SF with Sat AM slots. James P. is your best match at $120 flat, 4.9★ rating. Should I book him?",
          timestamp: '12:01 PM'
        }
      ]);
      setCurrentState('RESULTS');
    }, 12500);

    // Turn 4: User says yes (15.5s delay)
    const t7 = setTimeout(() => {
      triggerSyncFlash();
      setChatMessages(prev => [
        ...prev,
        {
          id: '4',
          sender: 'user',
          text: 'Yes please, go ahead and book James for Saturday.',
          timestamp: '12:01 PM'
        }
      ]);
      setCurrentState('APPROVAL');
    }, 15500);

    // Turn 5: Claude approves booking (19s delay)
    const t8 = setTimeout(() => {
      setIsTyping(true);
    }, 17500);

    const t9 = setTimeout(() => {
      setIsTyping(false);
      triggerSyncFlash();
      setChatMessages(prev => [
        ...prev,
        {
          id: '5',
          sender: 'agent',
          text: 'Booked! James P. is scheduled for Saturday, Jul 4 (9:00 AM – 11:00 AM). Mapped receipt: TCK-2025-4821.',
          timestamp: '12:02 PM'
        }
      ]);
      setCurrentState('CONFIRMED');
    }, 19000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(step5);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
      clearTimeout(t9);
    };
  }, [isAutoplay]);

  // Adjust scroll position inside agent side chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleReset = () => {
    setChatMessages([]);
    setCurrentState('IDLE');
    setSearchCheckpoints(['pending', 'pending', 'pending', 'pending', 'pending']);
    triggerSyncFlash();
  };

  const handleSkipToApproval = () => {
    setIsAutoplay(false);
    setIsTyping(false);
    triggerSyncFlash();
    setChatMessages([
      {
        id: 'skip-1',
        sender: 'user',
        text: 'Plumber Saturday under $150.',
        timestamp: '12:00 PM'
      },
      {
        id: 'skip-2',
        sender: 'agent',
        text: 'Checked live availabilities. Mapped candidate matching James P.',
        timestamp: '12:01 PM'
      }
    ]);
    setCurrentState('APPROVAL');
  };

  const handleManualSend = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-grow flex h-[calc(100vh-60px)] bg-tt-page overflow-hidden animate-page-in font-sans">
      
      {/* LEFT PANEL: AGENT CHAT */}
      <div className="w-[420px] bg-white border-r border-tt-border flex flex-col h-full shrink-0 relative z-10">
        
        {/* Left top banner bar */}
        <div className="h-[56px] border-b border-tt-border flex items-center justify-between px-4 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <img src={claudeLogo} className="w-8 h-8 rounded-full object-cover shadow-sm shrink-0" alt="Claude" />
            <div>
              <div className="text-[15px] font-bold text-tt-navy leading-none">Claude</div>
              <div className="text-[12px] text-tt-muted font-semibold mt-0.5">via Tack</div>
            </div>
          </div>
          <Badge variant="green" className="text-[12px] font-bold px-2 py-0.5 shadow-sm uppercase tracking-wider">
            Live demo
          </Badge>
        </div>

        {/* Scrollable messages container */}
        <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 shadow-inner">
          
          {chatMessages.length === 0 && !isTyping && (
            <div className="my-auto text-center px-6 flex flex-col items-center gap-3 select-none">
              <span className="font-serif text-[28px] font-bold text-tt-border">T</span>
              <span className="text-[15px] font-bold text-tt-navy">Tack Presentation Sandbox</span>
              <span className="text-[12px] text-tt-muted font-semibold max-w-[240px] leading-relaxed">
                Choose Autoplay below to watch Claude negotiate and schedule a pro booking.
              </span>
            </div>
          )}

          {chatMessages.map((msg) => {
            const isAgent = msg.sender === 'agent';
            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 w-full max-w-[320px] animate-scale-in ${
                  isAgent ? 'self-start' : 'self-end items-end'
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`p-3.5 shadow-sm text-[15px] leading-relaxed font-semibold ${
                    isAgent
                      ? 'bg-white text-tt-navy border border-tt-border rounded-[18px] rounded-bl-[4px]'
                      : 'bg-tt-dark text-white rounded-[18px] rounded-br-[4px]'
                  }`}
                >
                  {isAgent && (
                    <div className="flex items-center gap-1.5 mb-1.5 text-[12px] text-tt-muted select-none">
                      <img src={claudeLogo} className="w-4 h-4 rounded-full object-cover" alt="Claude" />
                      <span>Claude &middot; via Tack</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  
                  {/* Embedded structures */}
                  {msg.customNode}
                </div>
                
                {/* Time identifier */}
                <span className="text-[12px] text-tt-muted font-bold px-1 select-none">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing indicator bubble */}
          {isTyping && (
            <div className="self-start bg-white border border-tt-border p-3.5 rounded-[18px] rounded-bl-[4px] flex gap-1 items-center shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0s]" />
              <span className="w-2 h-2 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input panel bar */}
        <div className="border-t border-tt-border p-3 bg-white shrink-0">
          <form onSubmit={handleManualSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Message Claude..."
              disabled
              className="bg-tt-page border border-tt-border rounded-xl px-4 h-9 flex-grow text-[12px] font-semibold focus:outline-none select-none placeholder:text-tt-muted opacity-80"
            />
            <button
              type="button"
              className="h-9 w-9 bg-tt-dark text-white rounded-full flex items-center justify-center shadow-sm select-none"
            >
              <ArrowUp size={16} weight="regular" />
            </button>
          </form>
          <div className="text-center text-[11px] text-tt-muted font-bold mt-2">
            Claude &middot; Tack integration active
          </div>
        </div>

        {/* SandBox controls panel */}
        <div className="bg-tt-page border-t border-tt-border px-4 py-3 shrink-0 flex flex-col gap-2 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest text-tt-muted uppercase">
              Demo controls
            </span>
            
            {/* Autoplay toggle switch track settings */}
            <div className="flex items-center gap-2 select-none">
              <span className="text-[11px] font-bold text-tt-muted">Autoplay</span>
              <button
                type="button"
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`w-[36px] h-[20px] rounded-full transition-colors duration-300 relative focus:outline-none cursor-pointer flex items-center ${
                  isAutoplay ? 'bg-tt-blue shadow-[0_1px_4px_rgba(0,159,212,0.25)]' : 'bg-tt-border'
                }`}
              >
                <div
                  className={`absolute bg-white w-4.5 h-4.5 rounded-full shadow transition-transform duration-300 ${
                    isAutoplay ? 'translate-x-[14px]' : 'translate-x-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Ghost styled buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-grow h-8 text-[12px] font-bold py-1 px-2 rounded-lg text-tt-muted hover:text-tt-blue hover:bg-tt-blue-tint border border-transparent hover:border-tt-blue/20 transition-all duration-300 cursor-pointer"
              onClick={handleReset}
            >
              Replay ↺
            </button>
            <button
              type="button"
              className="flex-grow h-8 text-[12px] font-bold py-1 px-2 rounded-lg text-tt-muted hover:text-tt-blue hover:bg-tt-blue-tint border border-transparent hover:border-tt-blue/20 transition-all duration-300 cursor-pointer"
              onClick={handleSkipToApproval}
            >
              Skip to approval &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* SYNC INDICATOR DIVIDER */}
      <div 
        className={`w-[2px] h-full transition-all duration-300 shrink-0 relative z-20 ${
          pulseSync ? 'bg-tt-blue shadow-[0_0_12px_rgba(0,159,212,0.8)] scale-x-125' : 'bg-tt-border'
        }`}
      />

      {/* RIGHT PANEL: REACTIVE TACK UI */}
      <div className="flex-grow flex flex-col h-full bg-tt-page overflow-y-auto relative z-10 transition-colors duration-500">
        
        {/* STATE 1: IDLE */}
        {currentState === 'IDLE' && (
          <div className="m-auto text-center flex flex-col items-center gap-3.5 p-6 animate-page-in">
            <div className="h-16 w-16 bg-white border border-tt-border flex items-center justify-center rounded-2xl shadow-sm text-tt-border select-none">
              <span className="font-serif text-[48px] font-extrabold text-[#E2E8F0] select-none leading-none">T</span>
            </div>
            <h3 className="text-[15px] font-bold text-tt-navy">Waiting for your agent...</h3>
            <p className="text-[12px] text-tt-muted font-semibold max-w-[200px] leading-relaxed">
              Start the conversation on the left.
            </p>
          </div>
        )}

        {/* STATE 2: SEARCHING */}
        {currentState === 'SEARCHING' && (
          <div className="w-full h-full bg-tt-dark flex flex-col justify-center items-center px-6 text-white overflow-hidden animate-page-in">
            <div className="absolute w-[300px] h-[300px] bg-tt-blue/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 bg-dot-pattern-dark opacity-10 pointer-events-none" />

            <div className="flex flex-col items-center gap-5 w-full max-w-[340px] relative z-10 text-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full border border-tt-blue/30 animate-ping [animation-duration:2.5s]" />
                <div className="h-12 w-12 rounded-full border-2 border-white/20 bg-white/5 animate-pulse-subtle flex items-center justify-center">
                  <span className="font-serif text-[24px] font-bold select-none leading-none pt-0.5">T</span>
                </div>
              </div>
              
              <div>
                <span className="text-[11px] font-bold tracking-widest text-tt-blue block mb-1">
                  GATHERING INTELLIGENCE
                </span>
                <p className="text-[12px] text-white/50 font-semibold font-sans">
                  Claude is checking availability...
                </p>
              </div>

              {/* Progress checklist card */}
              <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-5 text-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left overflow-hidden relative">
                <div className="flex items-center gap-2 select-none relative z-10">
                  <div className="w-5 h-5 rounded-full bg-tt-dark flex items-center justify-center shrink-0">
                    <span className="font-serif font-extrabold text-[10px] text-white">T</span>
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-slate-800 uppercase">
                    GATHERING INTELLIGENCE
                  </span>
                </div>

                <div className="flex flex-col mt-4 relative z-10 font-sans">
                  {/* Row 1 */}
                  <div className="flex flex-col border-b border-slate-100 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src={searchImage} className={`w-4 h-4 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[0] === 'done' ? '' : searchCheckpoints[0] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Search" />
                      <span className={`text-[12.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[0] === 'done' ? 'text-slate-800' : searchCheckpoints[0] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Searching database...
                      </span>
                      {searchCheckpoints[0] === 'done' && <CheckCircle size={16} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Location detail map chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[0] !== 'pending' ? 'max-h-[55px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-7 flex items-center gap-2.5 bg-[#F8FAFC] border border-slate-100 rounded-xl p-1.5 hover:border-slate-300 transition-colors duration-300">
                        <div className="w-7 h-7 rounded-md bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm text-slate-600 animate-scale-in">
                          <MapPin size={16} weight="regular" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] text-slate-800 font-bold">Location</span>
                          <span className="text-[10px] text-slate-500 truncate">Austin, TX (within 15 miles)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-col border-b border-slate-100 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src={verifiedImage} className={`w-4 h-4 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[1] === 'done' ? '' : searchCheckpoints[1] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Verified" />
                      <span className={`text-[12.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[1] === 'done' ? 'text-slate-800' : searchCheckpoints[1] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Verifying credentials...
                      </span>
                      {searchCheckpoints[1] === 'done' && <CheckCircle size={16} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Verification detail chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[1] !== 'pending' ? 'max-h-[45px] opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-7 flex items-center gap-2 text-[10px] text-slate-600 font-bold">
                        <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm">License: OK</span>
                        <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm">Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex flex-col border-b border-slate-100 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src={thumbtackImage} className={`w-4 h-4 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[2] === 'done' ? '' : searchCheckpoints[2] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Reviews" />
                      <span className={`text-[12.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[2] === 'done' ? 'text-slate-800' : searchCheckpoints[2] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Checking reviews...
                      </span>
                      {searchCheckpoints[2] === 'done' && <CheckCircle size={16} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Reviews detail chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[2] !== 'pending' ? 'max-h-[45px] opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-7 flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                        <span>Rating:</span>
                        <span className="text-slate-800 font-bold">4.8+ Stars</span>
                        <span>&bull;</span>
                        <span>80+ reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="flex flex-col border-b border-slate-100 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src={calendarImage} className={`w-4 h-4 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[3] === 'done' ? '' : searchCheckpoints[3] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Calendar" />
                      <span className={`text-[12.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[3] === 'done' ? 'text-slate-800' : searchCheckpoints[3] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Checking availability...
                      </span>
                      {searchCheckpoints[3] === 'done' && <CheckCircle size={16} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Calendar detail chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[3] !== 'pending' ? 'max-h-[55px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-7 flex items-center gap-2.5 bg-[#F8FAFC] border border-slate-100 rounded-xl p-1.5 hover:border-slate-300 transition-colors duration-300">
                        <div className="w-7 h-7 rounded-md bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm text-slate-600 animate-scale-in">
                          <CalendarBlank size={16} weight="regular" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] text-slate-800 font-bold">Openings</span>
                          <span className="text-[10px] text-slate-500 truncate">
                            {searchCheckpoints[3] === 'done' ? '3 slot openings found' : 'Searching slots...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="flex flex-col py-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src={rankingImage} className={`w-4 h-4 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[4] === 'done' ? '' : searchCheckpoints[4] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Ranking" />
                      <span className={`text-[12.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[4] === 'done' ? 'text-slate-800' : searchCheckpoints[4] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Ranking matches...
                      </span>
                      {searchCheckpoints[4] === 'done' && <CheckCircle size={16} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Ranking match score chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[4] !== 'pending' ? 'max-h-[45px] opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-7 flex items-center gap-1.5 text-[10px]">
                        <span className="text-slate-500 font-semibold">Top Match:</span>
                        <span className="text-slate-800 font-bold">98% Match</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: RESULTS */}
        {currentState === 'RESULTS' && (
          <div className="w-full py-8 px-4 flex flex-col gap-6 max-w-[460px] mx-auto animate-page-in text-left">
            <div>
              <span className="text-[12px] text-tt-muted font-bold tracking-wider uppercase select-none">
                3 pros found &bull; Sat AM &bull; under $150
              </span>
              <h3 className="text-[28px] font-bold font-serif text-tt-navy mt-1 select-none">
                Agent Recommendations
              </h3>
            </div>

            {/* Best Match Hero Card */}
            <Card variant="featured" hoverable={false} className="p-5 rounded-xl bg-white flex flex-col gap-4 border-2 border-tt-dark shadow-lg">
              <div className="flex items-center justify-between">
                <Badge variant="dark" className="text-[11px] font-bold px-2 py-0.5">Best match</Badge>
                <div className="text-[12px] font-bold text-slate-700 select-none">
                  Tack recommended
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar initials="JP" imageSrc={person1} size="sm" className="shrink-0 shadow-sm" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-bold text-tt-navy">James P.</span>
                    <Seal size={14} weight="fill" className="text-slate-800 shrink-0" />
                  </div>
                  <p className="text-[11px] text-tt-muted font-semibold">Licensed Plumber</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="text-[11px] bg-tt-page border border-tt-border px-2 py-1 rounded-lg text-tt-navy font-semibold">
                  Sat 9–11 AM
                </span>
                <span className="text-[11px] bg-tt-page border border-tt-border px-2 py-1 rounded-lg text-tt-navy font-semibold">
                  2.4 miles away
                </span>
                <span className="text-[11px] bg-tt-page border border-tt-border px-2 py-1 rounded-lg text-tt-navy font-semibold">
                  $120 flat rate
                </span>
              </div>

              <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 text-[11px] text-[#92400E] leading-normal font-bold">
                Best availability match, stays under $150 budget, with 128 positive reviews.
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full mt-1 font-bold text-[12px] active-press shadow-sm animate-pop-in"
                onClick={() => setCurrentState('APPROVAL')}
              >
                Book via Tack &rarr;
              </Button>
            </Card>

            {/* Other options */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold tracking-widest text-tt-muted uppercase select-none">Other options</span>
              
              {/* Pro 2 */}
              <Card variant="default" hoverable={false} className="p-4 rounded-xl flex items-center justify-between bg-white border border-tt-border">
                <div className="flex items-center gap-2">
                  <Avatar initials="MR" imageSrc={person2} size="sm" className="w-8 h-8 text-[11px] shrink-0" />
                  <div>
                    <div className="text-[12px] font-bold text-tt-navy">Mike R.</div>
                    <div className="text-[11px] text-tt-muted font-semibold">Sat 10 AM–12 PM &middot; $145 flat</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-7 px-3 text-[11px] font-bold" onClick={() => setCurrentState('APPROVAL')}>
                  Select
                </Button>
              </Card>

              {/* Pro 3 */}
              <Card variant="default" hoverable={false} className="p-4 rounded-xl flex items-center justify-between bg-white border border-tt-border">
                <div className="flex items-center gap-2">
                  <Avatar initials="DL" size="sm" className="w-8 h-8 text-[11px] shrink-0" />
                  <div>
                    <div className="text-[12px] font-bold text-tt-navy">Dave L.</div>
                    <div className="text-[11px] text-tt-muted font-semibold">Sat 8–10 AM &middot; $130 flat</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-7 px-3 text-[11px] font-bold" onClick={() => setCurrentState('APPROVAL')}>
                  Select
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* STATE 4: APPROVAL */}
        {currentState === 'APPROVAL' && (
          <div className="w-full py-8 px-4 flex justify-center items-center h-full animate-page-in">
            <Card hoverable={false} className="bg-white border border-tt-border shadow-xl rounded-[20px] p-6 max-w-[420px] w-full flex flex-col gap-5 text-left">
              <div className="text-center">
                <h2 className="text-[28px] font-bold font-serif text-tt-navy mb-1 leading-none select-none">
                  Review booking
                </h2>
                <p className="text-[12px] text-tt-muted font-semibold leading-relaxed">
                  Confirm the details mapped by your agent.
                </p>
              </div>

              {/* Pro Info Row */}
              <div className="flex items-center gap-3 pb-4 border-b border-tt-border">
                <Avatar initials="JP" imageSrc={person1} size="sm" className="shrink-0 shadow-sm" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-tt-navy">James P.</span>
                    <Seal size={14} weight="fill" className="text-tt-blue shrink-0" />
                  </div>
                  <p className="text-[12px] text-tt-muted font-semibold">Licensed Plumber &bull; Licensed</p>
                </div>
              </div>

              {/* Details table */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench size={13} weight="regular" /> Service
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy">Plumbing Repair</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarBlank size={13} weight="regular" /> Date
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy">Saturday, Jul 4</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock size={13} weight="regular" /> Time
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy">9:00 AM – 11:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={13} weight="regular" /> Location
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy truncate max-w-[160px]">742 Main St, San Francisco</span>
                </div>
              </div>

              {/* Price card */}
              <div className="bg-tt-page border border-tt-border rounded-xl p-3.5 flex flex-col gap-1.5 shadow-inner">
                <div className="flex justify-between text-[11px] text-tt-muted font-bold">
                  <span>Service fee</span>
                  <span>$120.00</span>
                </div>
                <div className="flex justify-between text-[11px] text-tt-muted font-bold">
                  <span>Platform fee (5%)</span>
                  <span>$6.00</span>
                </div>
                <div className="h-[1px] bg-tt-border" />
                <div className="flex justify-between text-[13px] font-extrabold text-tt-navy">
                  <span>Total</span>
                  <span>$126.00</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-tt-muted font-bold justify-center mt-1 bg-white border border-tt-border rounded py-1 px-3 self-center shadow-sm">
                  <CreditCard size={12} weight="regular" className="text-tt-muted" />
                  <span>Visa ending in 4242</span>
                </div>
              </div>

              {/* Action buttons */}
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-md active-press text-[15px] font-bold"
                onClick={() => {
                  setCurrentState('CONFIRMED');
                  if (!isAutoplay) {
                    setChatMessages(prev => [
                      ...prev,
                      {
                        id: 'manual-confirmed',
                        sender: 'agent',
                        text: 'Booked! 🎉 Confirmation: TCK-2025-4821',
                        timestamp: '12:02 PM'
                      }
                    ]);
                  }
                }}
              >
                Approve & book &rarr;
              </Button>
            </Card>
          </div>
        )}

        {/* STATE 5: CONFIRMED */}
        {currentState === 'CONFIRMED' && (
          <div className="w-full py-8 px-4 flex flex-col justify-center items-center h-full max-w-[420px] mx-auto animate-page-in text-left">
            {/* Check success circle */}
            <div className="h-16 w-16 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] border-2 border-[#16A34A]/20 shadow-[0_4px_16px_rgba(22,163,74,0.15)] animate-scale-in mb-4">
              <Check size={32} weight="regular" />
            </div>

            <div className="text-center mb-6 w-full">
              <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-none mb-1.5">
                You're all set.
              </h2>
              <p className="text-[12px] text-tt-muted font-bold">
                James is confirmed for Saturday.
              </p>
            </div>

            {/* Receipt Box */}
            <Card hoverable={false} className="w-full bg-white border border-tt-border p-5 rounded-2xl flex flex-col gap-4 shadow-sm mb-5">
              <div className="flex justify-center">
                <span className="font-mono text-[11px] bg-tt-page text-tt-navy px-3 py-1 rounded-full border border-tt-border font-bold shadow-inner">
                  TCK-2025-4821
                </span>
              </div>
              <div className="h-[1px] bg-tt-border" />

              <div className="flex items-center gap-3">
                <Avatar initials="JP" imageSrc={person1} size="sm" className="shrink-0 shadow-sm" />
                <div>
                  <div className="text-[12px] font-bold text-tt-navy">James P.</div>
                  <div className="text-[11px] text-tt-muted font-semibold">Licensed Plumber</div>
                </div>
              </div>

              <div className="text-[12px] text-tt-navy bg-tt-page rounded-lg p-3 border border-tt-border flex flex-col gap-1 shadow-inner font-semibold">
                <span className="font-bold text-[10px] text-tt-muted uppercase tracking-wider block mb-0.5">Scheduled</span>
                Saturday, May 3 &middot; 9:00 AM – 11:00 AM
              </div>

              <div className="flex justify-between items-center text-[12px] text-tt-navy pt-1.5 border-t border-slate-100">
                <span className="font-bold text-tt-muted uppercase tracking-wider">Total paid</span>
                <span className="text-[15px] font-extrabold text-tt-navy">$126.00</span>
              </div>
            </Card>

            <div className="flex flex-col gap-2 w-full">
              <Button variant="primary" size="lg" className="w-full active-press text-[15px] font-bold" onClick={() => navigate('/track')}>
                Track your job &rarr;
              </Button>
              <Button variant="secondary" size="lg" className="w-full active-press text-[15px] font-bold" onClick={handleReset}>
                Demo sandbox restart
              </Button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
