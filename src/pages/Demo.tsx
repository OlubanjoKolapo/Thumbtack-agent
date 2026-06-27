import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUp, 
  ArrowRight, 
  Check, 
  MapPin, 
  BadgeCheck, 
  Sparkles, 
  Shield, 
  CreditCard, 
  Star,
  Wrench,
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { IntelligenceRow } from '../components/IntelligenceRow';

// Import image assets
import claudeLogo from '../assets/claude logo.png';
import person1 from '../assets/person 1.webp';
import person2 from '../assets/person 2.jpg';

// Custom pin symbol matching searching screen
const ThumbtackIcon: React.FC = () => (
  <span className="font-serif font-extrabold text-[12px] select-none leading-none">T</span>
);

type DemoState = 'IDLE' | 'SEARCHING' | 'RESULTS' | 'APPROVAL' | 'CONFIRMED';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  customNode?: React.ReactNode;
}

export const Demo: React.FC = () => {
  const navigate = useNavigate();
  
  // State Machine
  const [currentState, setCurrentState] = useState<DemoState>('IDLE');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [pulseSync, setPulseSync] = useState<boolean>(false);
  
  // Searching step completion indicators
  const [searchCheckpoints, setSearchCheckpoints] = useState<('pending' | 'loading' | 'done')[]>([
    'pending', 'pending', 'pending', 'pending', 'pending'
  ]);

  // Timers mapping reference for teardowns
  const autoplayTimersRef = useRef<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Trigger blue sync line flash
  const triggerSyncFlash = () => {
    setPulseSync(true);
    setTimeout(() => setPulseSync(false), 300);
  };

  // Scroll to bottom helper
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  // Sync state changes with the line flash
  useEffect(() => {
    triggerSyncFlash();
  }, [currentState]);

  // Reset demo state helpers
  const handleReset = () => {
    // Clear any active timers
    autoplayTimersRef.current.forEach(clearTimeout);
    autoplayTimersRef.current = [];
    
    setCurrentState('IDLE');
    setChatMessages([]);
    setIsTyping(false);
    setSearchCheckpoints(['pending', 'pending', 'pending', 'pending', 'pending']);
  };

  const handleSkipToApproval = () => {
    autoplayTimersRef.current.forEach(clearTimeout);
    autoplayTimersRef.current = [];
    
    // Jump straight to approval text context
    const currentMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'My shower has been leaking for a week. Need a plumber this Saturday morning, budget around $150.',
        timestamp: '9:00 AM'
      },
      {
        id: 'msg-2',
        sender: 'agent',
        text: 'On it. Searching Thumbtack\'s pro database for licensed plumbers available Saturday morning near you...',
        timestamp: '9:00 AM',
        customNode: (
          <div className="bg-tt-page border border-tt-border rounded-xl p-3 mt-2 shadow-inner">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="font-serif font-extrabold text-[10px] text-tt-blue">T</span>
              <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase">TACK SEARCHING</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                <span>Thumbtack database</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                <span>Verifying credentials</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                <span>Checking availability</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                <span>Reading reviews</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                <span>Ranking matches</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'msg-3',
        sender: 'agent',
        text: 'Found 3 plumbers available Saturday morning within your budget. Here\'s the best match:',
        timestamp: '9:01 AM',
        customNode: (
          <div className="bg-white border border-tt-blue rounded-xl p-3 mt-2 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar initials="JP" imageSrc={person1} size="sm" className="w-8 h-8 text-[11px]" />
              <div>
                <div className="text-[12px] font-bold text-tt-navy">James P.</div>
                <div className="text-[11px] text-tt-muted font-medium">Sat 9–11 AM &middot; $120 flat &middot; 2.4 mi</div>
              </div>
            </div>
            <button className="bg-tt-dark text-white text-[11px] font-bold h-7 px-3 rounded-full hover:bg-tt-blue transition-colors">
              Book this
            </button>
          </div>
        )
      },
      {
        id: 'msg-4',
        sender: 'user',
        text: 'Book James.',
        timestamp: '9:01 AM'
      },
      {
        id: 'msg-5',
        sender: 'agent',
        text: 'Perfect. Here\'s the booking summary — tap Approve and it\'s done.',
        timestamp: '9:02 AM',
        customNode: (
          <div className="text-[11px] text-tt-muted font-bold mt-2 flex items-center gap-1.5 hover:text-tt-blue cursor-pointer select-none">
            <span>Tack is handling the booking</span>
            <ArrowRight size={12} className="stroke-[2.5]" />
          </div>
        )
      }
    ];

    setChatMessages(currentMessages);
    setIsTyping(false);
    setSearchCheckpoints(['done', 'done', 'done', 'done', 'done']);
    setCurrentState('APPROVAL');
  };

  // Run autoplay loop
  const runAutoplay = () => {
    handleReset();

    const addTimer = (fn: () => void, delay: number) => {
      const timer = setTimeout(fn, delay);
      autoplayTimersRef.current.push(timer);
    };

    // 0s — User message appears
    addTimer(() => {
      setChatMessages([
        {
          id: '1',
          sender: 'user',
          text: 'My shower has been leaking for a week. Need a plumber this Saturday morning, budget around $150.',
          timestamp: '12:00 PM'
        }
      ]);
      setIsTyping(true);
    }, 100);

    // 1.5s — Claude responds + search starts on right panel
    addTimer(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: '2',
          sender: 'agent',
          text: 'On it. Searching Thumbtack\'s pro database for licensed plumbers available Saturday morning near you...',
          timestamp: '12:00 PM',
          customNode: (
            <div className="bg-tt-page border border-tt-border rounded-xl p-3 mt-2 shadow-inner">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="font-serif font-extrabold text-[10px] text-tt-blue">T</span>
                <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase">TACK SEARCHING</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                  <span>Thumbtack database</span>
                  <span className="text-tt-blue animate-pulse">searching...</span>
                </div>
              </div>
            </div>
          )
        }
      ]);
      
      setCurrentState('SEARCHING');
      setSearchCheckpoints(['loading', 'pending', 'pending', 'pending', 'pending']);
    }, 1500);

    // Stagger searching checkpoints in chat embedded card
    // Checkpoint 1 done, 2 loading (2.0s)
    addTimer(() => {
      setSearchCheckpoints(['done', 'loading', 'pending', 'pending', 'pending']);
      updateEmbeddedSearchingCard(1);
    }, 2000);

    // Checkpoint 2 done, 3 loading (2.5s)
    addTimer(() => {
      setSearchCheckpoints(['done', 'done', 'loading', 'pending', 'pending']);
      updateEmbeddedSearchingCard(2);
    }, 2500);

    // Checkpoint 3 done, 4 loading (3.0s)
    addTimer(() => {
      setSearchCheckpoints(['done', 'done', 'done', 'loading', 'pending']);
      updateEmbeddedSearchingCard(3);
    }, 3000);

    // Checkpoint 4 done, 5 loading (3.5s)
    addTimer(() => {
      setSearchCheckpoints(['done', 'done', 'done', 'done', 'loading']);
      updateEmbeddedSearchingCard(4);
    }, 3500);

    // 4.0s — Intelligence rows complete
    addTimer(() => {
      setSearchCheckpoints(['done', 'done', 'done', 'done', 'done']);
      updateEmbeddedSearchingCard(5);
    }, 4000);

    // 4.5s — Right panel switches to Results state
    addTimer(() => {
      setCurrentState('RESULTS');
      setIsTyping(true);
    }, 4500);

    // 5.0s — Claude shows options in chat thread
    addTimer(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: '3',
          sender: 'agent',
          text: 'Found 3 plumbers available Saturday morning within your budget. Here\'s the best match:',
          timestamp: '12:01 PM',
          customNode: (
            <div className="bg-white border border-tt-blue rounded-xl p-3 mt-2 shadow-sm flex items-center justify-between animate-scale-in">
              <div className="flex items-center gap-2">
                <Avatar initials="JP" imageSrc={person1} size="sm" className="w-8 h-8 text-[11px]" />
                <div>
                  <div className="text-[12px] font-bold text-tt-navy">James P.</div>
                  <div className="text-[11px] text-tt-muted font-medium">Sat 9–11 AM &middot; $120 flat &middot; 2.4 mi</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={handleSkipToApproval}
                className="bg-tt-dark text-white text-[11px] font-bold h-7 px-3 rounded-full hover:bg-tt-blue transition-colors cursor-pointer"
              >
                Book this
              </button>
            </div>
          ),
        },
        {
          id: '3-sub',
          sender: 'agent',
          text: 'Want to see all 3 options or shall I book James?',
          timestamp: '12:01 PM'
        }
      ]);
    }, 5000);

    // 7.0s — User sends "Book James" message
    addTimer(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: '4',
          sender: 'user',
          text: 'Book James.',
          timestamp: '12:02 PM'
        }
      ]);
      setIsTyping(true);
    }, 7000);

    // 7.5s — Right panel switches to approval screen
    addTimer(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: '5',
          sender: 'agent',
          text: 'Perfect. Here\'s the booking summary — tap Approve and it\'s done.',
          timestamp: '12:02 PM',
          customNode: (
            <div className="text-[11px] text-tt-muted font-bold mt-1 flex items-center gap-1 hover:text-tt-blue cursor-pointer select-none">
              <span>Tack is handling the booking</span>
              <ArrowRight size={12} className="stroke-[2.5]" />
            </div>
          )
        }
      ]);
      setCurrentState('APPROVAL');
    }, 7500);

    // 9.0s — Auto-approval triggered (Confirmed state)
    addTimer(() => {
      setCurrentState('CONFIRMED');
      setIsTyping(true);
    }, 9000);

    // 9.5s — Confirmed text displays on chat thread
    addTimer(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: '6',
          sender: 'agent',
          text: 'Booked! 🎉 Confirmation: TCK-2025-4821. James P. is confirmed for Saturday.',
          timestamp: '12:02 PM'
        }
      ]);
    }, 9500);

    // 13.0s — Loop resets to start
    addTimer(() => {
      runAutoplay();
    }, 13000);
  };

  // Autoplay handler to update checklist box inside message bubble
  const updateEmbeddedSearchingCard = (index: number) => {
    setChatMessages(prev => {
      return prev.map(msg => {
        if (msg.id === '2') {
          return {
            ...msg,
            customNode: (
              <div className="bg-tt-page border border-tt-border rounded-xl p-3 mt-2 shadow-inner font-sans">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="font-serif font-extrabold text-[10px] text-tt-blue">T</span>
                  <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase">TACK SEARCHING</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                    <span>Thumbtack database</span>
                    {index >= 1 ? (
                      <span className="text-emerald-500 font-bold">✓</span>
                    ) : (
                      <span className="text-tt-blue animate-pulse">searching...</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                    <span>Verifying credentials</span>
                    {index >= 2 ? (
                      <span className="text-emerald-500 font-bold">✓</span>
                    ) : index === 1 ? (
                      <span className="text-tt-blue animate-pulse">verifying...</span>
                    ) : (
                      <span className="text-tt-border">pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                    <span>Checking availability</span>
                    {index >= 3 ? (
                      <span className="text-emerald-500 font-bold">✓</span>
                    ) : index === 2 ? (
                      <span className="text-tt-blue animate-pulse">checking...</span>
                    ) : (
                      <span className="text-tt-border">pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                    <span>Reading reviews</span>
                    {index >= 4 ? (
                      <span className="text-emerald-500 font-bold">✓</span>
                    ) : index === 3 ? (
                      <span className="text-tt-blue animate-pulse">analyzing...</span>
                    ) : (
                      <span className="text-tt-border">pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-tt-navy font-semibold">
                    <span>Ranking matches</span>
                    {index >= 5 ? (
                      <span className="text-emerald-500 font-bold">✓</span>
                    ) : index === 4 ? (
                      <span className="text-tt-blue animate-pulse">ranking...</span>
                    ) : (
                      <span className="text-tt-border">pending</span>
                    )}
                  </div>
                </div>
              </div>
            )
          };
        }
        return msg;
      });
    });
  };

  // Toggle autoplay behaviors
  useEffect(() => {
    if (isAutoplay) {
      runAutoplay();
    } else {
      handleReset();
    }
    return () => {
      autoplayTimersRef.current.forEach(clearTimeout);
    };
  }, [isAutoplay]);

  const handleManualSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Manual chat triggers aren't strictly required to implement typing inputs, 
    // but we can support moving state. Let's just trigger first message if they submit text.
    if (isAutoplay) setIsAutoplay(false);
    handleReset();
    setTimeout(() => {
      setIsAutoplay(true);
    }, 100);
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
              <div className="text-[12px] font-bold text-tt-navy leading-none">Claude</div>
              <div className="text-[11px] text-tt-muted font-semibold mt-0.5">via Tack integration</div>
            </div>
          </div>
          <Badge variant="green" className="text-[11px] font-bold px-2 py-0.5">
            Live demo
          </Badge>
        </div>

        {/* Scrollable messages container */}
        <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 shadow-inner">
          
          {chatMessages.length === 0 && !isTyping && (
            <div className="my-auto text-center px-6 flex flex-col items-center gap-3">
              <span className="font-serif text-[28px] font-bold text-tt-border">T</span>
              <span className="text-[15px] font-bold text-tt-navy">Tack Sandbox initialized</span>
              <span className="text-[12px] text-tt-muted font-semibold max-w-[240px] leading-relaxed">
                Choose autoplay below to watch Tack negotiate a plumber appointment.
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
                  className={`p-3.5 rounded-[18px] text-[12px] leading-relaxed font-semibold shadow-sm ${
                    isAgent
                      ? 'bg-white text-tt-navy border border-tt-border rounded-bl-sm'
                      : 'bg-tt-dark text-white rounded-br-sm'
                  }`}
                >
                  {isAgent && (
                    <div className="flex items-center gap-1.5 mb-1.5 text-[11px] text-tt-muted select-none">
                      <img src={claudeLogo} className="w-4 h-4 rounded-full object-cover" alt="Claude" />
                      <span>Claude &middot; Agent API</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  
                  {/* Embedded structures */}
                  {msg.customNode}
                </div>
                
                {/* Time identifier */}
                <span className="text-[11px] text-tt-muted font-bold px-1 select-none">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing indicator indicator bubble */}
          {isTyping && (
            <div className="self-start bg-white border border-tt-border p-3.5 rounded-[18px] rounded-bl-sm flex gap-1 items-center shadow-sm">
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
              <ArrowUp size={16} />
            </button>
          </form>
          <div className="text-center text-[11px] text-tt-muted font-bold mt-2">
            Claude &middot; Tack integration active
          </div>
        </div>

        {/* SandBox controls panel */}
        <div className="bg-tt-page border-t border-tt-border px-4 py-3 shrink-0 flex flex-col gap-2 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold tracking-widest text-tt-muted uppercase">
              Demo controls
            </span>
            
            {/* Autoplay toggle switch */}
            <div className="flex items-center gap-2 select-none">
              <span className="text-[11px] font-bold text-tt-muted">Autoplay</span>
              <button
                type="button"
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`w-[36px] h-[20px] rounded-full transition-colors duration-300 relative focus:outline-none cursor-pointer flex items-center ${
                  isAutoplay ? 'bg-tt-blue' : 'bg-slate-200'
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

          {/* Quick buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-grow h-8 text-[12px] font-bold py-0"
              onClick={handleReset}
            >
              Replay ↺
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-grow h-8 text-[12px] font-bold py-0"
              onClick={handleSkipToApproval}
            >
              Skip to approval →
            </Button>
          </div>
        </div>

      </div>

      {/* SYNC INDICATOR BAR */}
      <div 
        className={`w-[3px] h-full transition-colors duration-300 shrink-0 relative z-20 ${
          pulseSync ? 'bg-tt-blue shadow-[0_0_12px_rgba(0,159,212,0.8)]' : 'bg-tt-border'
        }`}
      />

      {/* RIGHT PANEL: REACTIVE TACK UI */}
      <div className="flex-grow flex flex-col h-full bg-tt-page overflow-y-auto relative z-10 transition-colors duration-500">
        
        {/* STATE 1: IDLE */}
        {currentState === 'IDLE' && (
          <div className="m-auto text-center flex flex-col items-center gap-3 p-6 animate-page-in">
            <div className="h-16 w-16 bg-white border border-tt-border flex items-center justify-center rounded-2xl shadow-sm text-tt-border select-none">
              <span className="font-serif text-[42px] font-extrabold">T</span>
            </div>
            <h3 className="text-[15px] font-bold text-tt-navy">Waiting for your agent...</h3>
            <p className="text-[12px] text-tt-muted font-semibold max-w-[200px] leading-relaxed">
              Start the conversation on the left or turn on Autoplay.
            </p>
          </div>
        )}

        {/* STATE 2: SEARCHING */}
        {currentState === 'SEARCHING' && (
          <div className="w-full h-full bg-tt-dark flex flex-col justify-center items-center px-6 text-white overflow-hidden animate-page-in">
            {/* Background lights inside panel */}
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

              {/* Staggered progress card inside right pane */}
              <div className="w-full bg-white rounded-xl overflow-hidden shadow-xl text-left border border-white/5">
                <IntelligenceRow
                  icon={ThumbtackIcon}
                  iconBgColor="bg-tt-blue-tint"
                  iconColor="text-tt-blue font-serif"
                  text="Searching database..."
                  status={searchCheckpoints[0]}
                />
                <IntelligenceRow
                  icon={Shield}
                  iconBgColor="bg-emerald-100"
                  iconColor="text-emerald-500"
                  text="Verifying credentials..."
                  status={searchCheckpoints[1]}
                />
                <IntelligenceRow
                  icon={Star}
                  iconBgColor="bg-[#FEF9EE]"
                  iconColor="text-[#F4A623]"
                  text="Checking reviews..."
                  status={searchCheckpoints[2]}
                />
                <IntelligenceRow
                  icon={Calendar}
                  iconBgColor="bg-sky-100"
                  iconColor="text-sky-500"
                  text="Checking availability..."
                  status={searchCheckpoints[3]}
                />
                <IntelligenceRow
                  icon={TrendingUp}
                  iconBgColor="bg-indigo-100"
                  iconColor="text-indigo-500"
                  text="Ranking matches..."
                  status={searchCheckpoints[4]}
                />
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: RESULTS */}
        {currentState === 'RESULTS' && (
          <div className="w-full py-8 px-4 flex flex-col gap-6 max-w-[460px] mx-auto animate-page-in">
            <div>
              <span className="text-[12px] text-tt-muted font-bold tracking-wider uppercase">
                3 pros found &bull; Saturday AM &bull; under $150
              </span>
              <h3 className="text-[28px] font-bold font-serif text-tt-navy mt-1 select-none">
                Agent Recommendations
              </h3>
            </div>

            {/* Best Match Hero Card */}
            <Card variant="featured" hoverable={false} className="p-5 rounded-xl bg-white flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Badge variant="blue" className="text-[11px] font-bold px-2 py-0.5">Best match</Badge>
                <div className="flex items-center gap-1 text-[12px] font-bold text-tt-blue">
                  <Sparkles size={12} className="text-tt-blue animate-pulse" />
                  <span>Tack recommended</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar initials="JP" imageSrc={person1} size="sm" className="shrink-0 shadow-sm" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-bold text-tt-navy">James P.</span>
                    <BadgeCheck size={14} className="text-tt-blue fill-tt-blue-tint shrink-0" />
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
                className="w-full mt-1 font-bold text-[12px]"
                onClick={() => setCurrentState('APPROVAL')}
              >
                Book via Tack →
              </Button>
            </Card>

            {/* Other pros */}
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
            <Card hoverable={false} className="bg-white border border-tt-border shadow-xl rounded-[20px] p-6 max-w-[420px] w-full flex flex-col gap-5">
              <div className="text-center">
                <h2 className="text-[28px] font-bold font-serif text-tt-navy mb-1 leading-none select-none">
                  Review booking
                </h2>
                <p className="text-[12px] text-tt-muted font-semibold leading-relaxed">
                  Confirm the details mapped by your agent.
                </p>
              </div>

              {/* Pro Row */}
              <div className="flex items-center gap-2 pb-4 border-b border-tt-border">
                <Avatar initials="JP" imageSrc={person1} size="sm" className="shrink-0 shadow-sm" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[15px] font-bold text-tt-navy">James P.</span>
                    <BadgeCheck size={14} className="text-tt-blue fill-tt-blue-tint shrink-0" />
                  </div>
                  <p className="text-[12px] text-tt-muted font-semibold">Licensed Plumber</p>
                </div>
              </div>

              {/* Details table */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench size={13} /> Service
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy">Plumbing Repair</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={13} /> Date
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy">Saturday, Jul 4</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock size={13} /> Time
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy">9:00 AM – 11:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="text-[12px] text-tt-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={13} /> Location
                  </span>
                  <span className="text-[12px] font-bold text-tt-navy truncate max-w-[160px]">742 Main St</span>
                </div>
              </div>

              {/* Price card */}
              <div className="bg-tt-page border border-tt-border rounded-xl p-3.5 flex flex-col gap-1.5 shadow-inner">
                <div className="flex justify-between text-[11px] text-tt-muted font-bold">
                  <span>Service fee</span>
                  <span>$120.00</span>
                </div>
                <div className="flex justify-between text-[11px] text-tt-muted font-bold">
                  <span>Platform fee</span>
                  <span>$6.00</span>
                </div>
                <div className="h-[1px] bg-tt-border" />
                <div className="flex justify-between text-[13px] font-extrabold text-tt-navy">
                  <span>Total</span>
                  <span>$126.00</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-tt-muted font-bold justify-center mt-1">
                  <CreditCard size={12} />
                  <span>Visa ending in 4242</span>
                </div>
              </div>

              {/* Actions */}
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-md active-press text-[15px] font-bold"
                onClick={() => {
                  setCurrentState('CONFIRMED');
                  // Update chat thread if autoplay is off
                  if (!isAutoplay) {
                    setChatMessages(prev => [
                      ...prev,
                      {
                        id: 'manual-confirmed',
                        sender: 'agent',
                        text: 'Booked! 🎉 Confirmation: TCK-2025-4821. James P. is confirmed for Saturday.',
                        timestamp: '9:05 AM'
                      }
                    ]);
                  }
                }}
              >
                Approve & book
              </Button>
            </Card>
          </div>
        )}

        {/* STATE 5: CONFIRMED */}
        {currentState === 'CONFIRMED' && (
          <div className="w-full py-8 px-4 flex flex-col justify-center items-center h-full max-w-[420px] mx-auto animate-page-in">
            {/* Check success bubble */}
            <div className="h-16 w-16 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] border-2 border-[#16A34A]/20 shadow-md animate-scale-in mb-4">
              <Check size={32} className="stroke-[3.5]" />
            </div>

            <div className="text-center mb-6">
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

              <div className="text-[12px] text-tt-navy bg-tt-page rounded-lg p-3 border border-tt-border flex flex-col gap-1 shadow-inner">
                <span className="font-bold text-[10px] text-tt-muted uppercase tracking-wider block">Scheduled</span>
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
