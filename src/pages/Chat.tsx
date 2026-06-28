import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Gear, 
  MapPin, 
  PencilSimple, 
  Star, 
  CalendarBlank, 
  CaretDown, 
  CaretUp, 
  Seal, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Microphone, 
  ArrowUp, 
  Wrench, 
  CreditCard,
  X,
  ArrowRight
} from '@phosphor-icons/react';
import { useChat } from '../hooks/useChat';
import type { Provider } from '../data/providers';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import searchImage from '../assets/search.png';
import verifiedImage from '../assets/Verified.png';
import thumbtackImage from '../assets/Thumbtack logo.png';
import calendarImage from '../assets/calender icon.jfif';
import rankingImage from '../assets/ranking.png';

export const Chat: React.FC = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  
  const {
    chatState,
    messages,
    locationValue,
    searchCheckpoints,
    startChat,
    confirmLocation,
    askFollowUp,
    initiateBooking,
    cancelBooking,
    approveBooking,
    sendEstimate,
    activeProvider,
    currentQuery
  } = useChat();

  const [inputText, setInputText] = useState('');
  const [zipInput, setZipInput] = useState('');
  const [showZipField, setShowZipField] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price' | 'rating'>('relevance');
  const [expandedProIds, setExpandedProIds] = useState<Record<string, boolean>>({});
  const [isFocused, setIsFocused] = useState(false);
  
  // Estimate details state
  const [estimateDetails, setEstimateDetails] = useState('');
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [estimatePro, setEstimatePro] = useState<Provider | null>(null);

  const feedEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load initial query from landing page router state
  useEffect(() => {
    const initialQuery = routerLocation.state?.initialQuery;
    if (initialQuery && messages.length === 0) {
      startChat(initialQuery);
    }
  }, [routerLocation, startChat, messages.length]);

  // Scroll to bottom of chat feed when messages update
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatState, searchCheckpoints]);

  // Handle typing input height resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(120, textareaRef.current.scrollHeight)}px`;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (chatState === 'idle') {
      startChat(inputText);
    } else {
      askFollowUp(inputText);
    }
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      setInputText("Need a certified plumber Saturday morning under $150 budget.");
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    } else {
      setIsRecording(true);
      setInputText("Listening...");
      setTimeout(() => {
        setIsRecording(false);
        setInputText("Need a plumber for a leaking pipe this Saturday morning");
      }, 2000);
    }
  };

  const toggleExpandPro = (proId: string) => {
    setExpandedProIds(prev => ({
      ...prev,
      [proId]: !prev[proId]
    }));
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim()) {
      confirmLocation(`San Francisco, CA ${zipInput}`);
      setShowZipField(false);
    }
  };

  const getSortedPros = (pros: Provider[]) => {
    return [...pros].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.matchScore - a.matchScore;
    });
  };

  return (
    <div className="w-full min-h-screen bg-tt-page flex flex-col relative font-sans">
      
      {/* TOP HEADER BAR */}
      <header className="h-[60px] border-b border-tt-border flex items-center justify-between px-4 bg-white fixed top-0 left-0 w-full z-50 shrink-0">
        <div className="flex items-center gap-2">
          {/* Back to landing */}
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="p-1 hover:bg-slate-100 rounded-full transition-colors text-[#64748B] hover:text-[#1C2B33] cursor-pointer flex items-center justify-center"
          >
            <ArrowLeft size={20} weight="regular" />
          </button>
          
          <div className="flex items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-full bg-tt-blue flex items-center justify-center text-white">
              <span className="font-serif font-extrabold text-[12px] leading-none">T</span>
            </div>
            <div>
              <span className="text-[16px] font-bold font-serif text-[#1D3557] leading-none block">Tack</span>
              <span className="text-[11px] text-[#64748B] font-bold block leading-none mt-0.5">by Thumbtack</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="p-1 hover:bg-slate-100 rounded-full text-[#64748B] hover:text-[#1C2B33] cursor-pointer flex items-center justify-center">
            <Gear size={20} weight="regular" />
          </button>
          <Avatar initials="US" size="sm" className="w-8 h-8 text-[11px] font-bold border border-slate-200" />
        </div>
      </header>

      {/* SCROLLABLE CONVERSATIONAL FEED */}
      <main className="flex-grow max-w-[680px] w-full mx-auto px-4 md:px-6 pt-[84px] pb-[130px] flex flex-col gap-3">
        
        {/* Suggestion Welcome Page on direct mount */}
        {messages.length === 0 && chatState === 'idle' && (
          <div className="my-auto py-12 flex flex-col items-center text-center animate-page-in">
            <div className="w-14 h-14 rounded-2xl bg-white border border-tt-border flex items-center justify-center text-tt-blue shadow-sm mb-4 select-none">
              <span className="font-serif font-extrabold text-[28px] text-tt-blue leading-none">T</span>
            </div>
            <h2 className="text-[24px] font-bold font-serif text-[#1D3557] tracking-tight">
              What do you need done?
            </h2>
            <p className="text-[15px] text-[#64748B] mt-1.5 font-sans font-medium max-w-[320px]">
              Describe any home service — Tack finds your best local match.
            </p>

            <div className="flex flex-wrap gap-2 justify-center mt-8 max-w-[480px]">
              {[
                "🔧 Fix a leaking pipe",
                "✨ Deep clean my home",
                "⚡ Electrical outlet repair",
                "🪚 Handyman for small jobs",
                "🌿 Garden tidy up"
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => startChat(chip.substring(2))}
                  className="bg-white border border-slate-200 hover:border-tt-blue hover:text-tt-blue text-[#1D3557] text-[13px] font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES THREAD */}
        {messages.map((msg) => {
          const isUser = msg.type === 'user';
          
          if (isUser) {
            return (
              <div 
                key={msg.id} 
                className="max-w-[70%] ml-auto bg-[#E8F7FC] border border-[#009FD4] text-[#1D3557] text-[15px] font-semibold rounded-[18px] rounded-br-[4px] py-2.5 px-4 shadow-sm animate-page-in break-words"
              >
                {msg.content}
              </div>
            );
          }

          // Tack confirmation template - visual redesign using regular CheckCircle outline
          if (msg.type === 'tack_confirmation') {
            return (
              <div 
                key={msg.id}
                className="bg-[#F0FDF4] border border-[#86EFAC] rounded-2xl p-5 w-full flex flex-col gap-2.5 shadow-sm animate-page-in"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={24} weight="regular" className="text-[#16A34A] shrink-0 animate-pop-in" />
                  <h3 className="text-[18px] font-bold font-serif text-[#166534] leading-none">Booked.</h3>
                </div>
                <p className="text-[14px] text-[#166534] font-semibold leading-relaxed">
                  {msg.content}
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="font-mono text-[12px] bg-white border border-[#86EFAC] text-[#1D3557] px-2.5 py-1 rounded font-bold shadow-inner select-all">
                    TCK-2025-4821
                  </span>
                  <button 
                    onClick={() => navigate('/track')}
                    className="text-[13px] font-bold text-[#16A34A] hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Track your job</span>
                    <ArrowRight size={16} weight="regular" className="text-[#16A34A]" />
                  </button>
                </div>
              </div>
            );
          }

          // Tack estimate request templates
          if (msg.type === 'tack_estimate') {
            return (
              <div 
                key={msg.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 w-full flex flex-col gap-2 shadow-sm animate-page-in"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#009FD4] flex items-center justify-center text-white shrink-0 select-none">
                    <span className="font-serif font-extrabold text-[10px]">T</span>
                  </div>
                  <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase select-none">Tack</span>
                </div>
                <h3 className="text-[16px] font-bold text-[#1D3557] mt-1 font-serif">Estimate requested</h3>
                <p className="text-[14px] text-[#64748B] font-semibold leading-relaxed">
                  {msg.content}
                </p>
              </div>
            );
          }

          // Location confirmation prompt card
          if (msg.type === 'tack_location') {
            return (
              <Card 
                key={msg.id} 
                hoverable={false} 
                className="bg-white border border-tt-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm animate-page-in"
              >
                <div className="flex items-center gap-1.5 select-none">
                  <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase">Tack</span>
                </div>
                <p className="text-[15px] font-semibold text-[#1D3557] leading-relaxed">
                  {msg.content}
                </p>
                
                {locationValue ? (
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl self-start mt-1 select-none">
                    <MapPin size={16} weight="regular" className="text-[#64748B] shrink-0" />
                    <span className="text-[13px] text-[#1D3557] font-bold leading-none">{locationValue}</span>
                    <button 
                      onClick={() => confirmLocation('')}
                      className="text-[11px] font-bold text-tt-blue hover:text-tt-deep underline cursor-pointer ml-1 select-none"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-1 select-none">
                    {!showZipField ? (
                      <div className="flex flex-wrap gap-2 select-none">
                        <button
                          onClick={() => confirmLocation('San Francisco, CA 94107')}
                          className="bg-tt-blue hover:bg-tt-deep text-white text-[13px] font-bold h-9 px-4 rounded-full flex items-center gap-1.5 shadow transition-all cursor-pointer"
                        >
                          <MapPin size={16} weight="regular" />
                          <span>Use my current location</span>
                        </button>
                        <button
                          onClick={() => setShowZipField(true)}
                          className="bg-white hover:bg-slate-50 border border-slate-200 text-[#1D3557] text-[13px] font-bold h-9 px-4 rounded-full flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <PencilSimple size={16} weight="regular" className="text-[#64748B]" />
                          <span>Enter my zip code</span>
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleZipSubmit} className="flex gap-2 max-w-[280px]">
                        <input
                          type="text"
                          value={zipInput}
                          onChange={(e) => setZipInput(e.target.value)}
                          placeholder="e.g. 94107"
                          maxLength={5}
                          className="bg-slate-50 border border-slate-200 rounded-full px-4 h-9 text-[13px] font-bold text-tt-navy focus:outline-none focus:border-tt-blue flex-grow"
                        />
                        <button
                          type="submit"
                          className="bg-tt-blue hover:bg-tt-deep text-white text-[12px] font-bold px-4 h-9 rounded-full cursor-pointer select-none shrink-0"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowZipField(false)}
                          className="h-9 w-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-tt-muted cursor-pointer shrink-0"
                        >
                          <X size={16} weight="regular" />
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </Card>
            );
          }

          // Gathering intelligence loading card: Redesigned as a premium light mode card
          if (msg.type === 'tack_searching') {
            return (
              <div 
                key={msg.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 w-full text-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-page-in overflow-hidden relative"
              >
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
                  <div className="flex flex-col border-b border-slate-100 py-3">
                    <div className="flex items-center gap-3">
                      <img src={searchImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[0] === 'done' ? '' : searchCheckpoints[0] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Search" />
                      <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[0] === 'done' ? 'text-slate-800' : searchCheckpoints[0] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Searching Thumbtack's pro database...
                      </span>
                      {searchCheckpoints[0] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Location detail map chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[0] !== 'pending' ? 'max-h-[60px] opacity-100 mt-2.5' : 'max-h-0 opacity-0'}`}>
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
                      <img src={verifiedImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[1] === 'done' ? '' : searchCheckpoints[1] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Verified" />
                      <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[1] === 'done' ? 'text-slate-800' : searchCheckpoints[1] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Verifying licenses and credentials...
                      </span>
                      {searchCheckpoints[1] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Verification detail chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[1] !== 'pending' ? 'max-h-[50px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-8 flex items-center gap-2 text-[11px] text-slate-600 font-bold">
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md shadow-sm">License: OK</span>
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md shadow-sm">Background Checked</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex flex-col border-b border-slate-100 py-3">
                    <div className="flex items-center gap-3">
                      <img src={thumbtackImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[2] === 'done' ? '' : searchCheckpoints[2] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Reviews" />
                      <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[2] === 'done' ? 'text-slate-800' : searchCheckpoints[2] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Reading reviews and ratings...
                      </span>
                      {searchCheckpoints[2] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Reviews detail chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[2] !== 'pending' ? 'max-h-[50px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
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
                      <img src={calendarImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[3] === 'done' ? '' : searchCheckpoints[3] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Calendar" />
                      <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[3] === 'done' ? 'text-slate-800' : searchCheckpoints[3] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Checking live availability...
                      </span>
                      {searchCheckpoints[3] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Calendar detail chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[3] !== 'pending' ? 'max-h-[60px] opacity-100 mt-2.5' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-8 flex items-center gap-3 bg-[#F8FAFC] border border-slate-100 rounded-xl p-2 hover:border-slate-300 transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm text-slate-600 animate-scale-in">
                          <CalendarBlank size={18} weight="regular" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] text-slate-800 font-bold">Live Openings</span>
                          <span className="text-[11px] text-slate-500 truncate">
                            {searchCheckpoints[3] === 'done' ? '3 slot openings found (Sat Morning)' : 'Syncing calendar availability...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="flex flex-col py-3">
                    <div className="flex items-center gap-3">
                      <img src={rankingImage} className={`w-5 h-5 object-contain shrink-0 transition-all duration-300 ${searchCheckpoints[4] === 'done' ? '' : searchCheckpoints[4] === 'loading' ? 'opacity-80 animate-pulse' : 'opacity-30 grayscale'}`} alt="Ranking" />
                      <span className={`text-[13.5px] font-semibold flex-grow transition-colors duration-300 ${searchCheckpoints[4] === 'done' ? 'text-slate-800' : searchCheckpoints[4] === 'loading' ? 'text-slate-800 animate-pulse' : 'text-slate-400'}`}>
                        Ranking by best match score...
                      </span>
                      {searchCheckpoints[4] === 'done' && <CheckCircle size={18} weight="regular" className="text-[#22C55E] animate-pop-in shrink-0" />}
                    </div>
                    {/* Ranking match score chip */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchCheckpoints[4] !== 'pending' ? 'max-h-[50px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-8 flex items-center gap-2 text-[11px]">
                        <span className="text-slate-500 font-semibold">Top candidate match rate:</span>
                        <span className="text-slate-800 font-bold">98% Match</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Main Pro results list card
          if (msg.type === 'tack_results' && msg.providers) {
            const sorted = getSortedPros(msg.providers);
            
            return (
              <Card 
                key={msg.id} 
                hoverable={false} 
                className="bg-white border border-tt-border rounded-2xl p-5 flex flex-col gap-4 shadow-sm animate-page-in text-left"
              >
                <div className="flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase">Tack</span>
                  </div>
                  
                  {/* Sort dropdown select */}
                  <div className="relative inline-block text-left">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-[13px] text-tt-blue font-bold hover:text-tt-deep outline-none cursor-pointer bg-transparent border-none p-0 pr-1.5 focus:ring-0"
                    >
                      <option value="relevance">Best match</option>
                      <option value="price">Price: Low to High</option>
                      <option value="rating">Rating: High to Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center select-none pb-1 border-b border-slate-100">
                  <span className="text-[15px] font-bold text-[#1D3557]">{msg.content}</span>
                </div>

                {/* Stacking Pro Cards */}
                <div className="flex flex-col gap-2 mt-1">
                  {sorted.map((pro, index) => {
                    const isBest = index === 0 && sortBy === 'relevance';
                    const isExpanded = !!expandedProIds[pro.id];

                    return (
                      <div
                        key={pro.id}
                        className={`bg-white rounded-xl border relative transition-all duration-300 ${
                          isBest 
                            ? 'border-2 border-tt-blue shadow-[0_4px_16px_rgba(0,159,212,0.06)]' 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {/* Best Match Top Badge */}
                        {isBest && (
                          <span className="absolute -top-3 left-4 bg-tt-blue text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow select-none animate-scale-in">
                            ✦ Best match
                          </span>
                        )}

                        {/* Top row */}
                        <div 
                          onClick={() => toggleExpandPro(pro.id)}
                          className="p-4 flex items-center justify-between cursor-pointer select-none flex-wrap sm:flex-nowrap gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar initials={pro.initials} imageSrc={pro.imageSrc} size="sm" className="w-10 h-10 text-[12px] shrink-0 font-bold" />
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[14px] font-bold text-[#1D3557]">{pro.name}</span>
                                {pro.verified && (
                                  <Seal size={14} weight="fill" className="text-tt-blue shrink-0" />
                                )}
                              </div>
                              <span className="text-[11px] text-[#64748B] block font-semibold leading-tight">{pro.service}</span>
                              
                              {/* Rating row */}
                              <div className="flex items-center gap-1 mt-0.5 text-[11px] font-bold text-tt-navy">
                                <Star size={11} weight="fill" color="#F4A623" className="shrink-0" />
                                <span>{pro.rating}</span>
                                <span className="text-[#64748B] font-semibold">({pro.reviewCount})</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 ml-auto sm:ml-0">
                            <div className="text-right shrink-0 font-sans">
                              <span className="text-[14px] font-extrabold text-[#1D3557] block leading-tight">
                                ${pro.price}/{pro.priceUnit}
                              </span>
                              <span className="text-[10px] bg-[#E8F7FC] text-tt-blue px-2 py-0.5 rounded-full font-bold uppercase tracking-wider select-none inline-block mt-0.5">
                                {pro.availability[0]?.split(' ')[0] || 'Sat'}
                              </span>
                            </div>
                            
                            {/* Caret expand */}
                            {isExpanded ? (
                              <CaretUp size={16} weight="regular" className="text-[#64748B]" />
                            ) : (
                              <CaretDown size={16} weight="regular" className="text-[#64748B]" />
                            )}
                          </div>
                        </div>

                        {/* Collapsible details section */}
                        <div
                          className="transition-all duration-300 ease-out overflow-hidden"
                          style={{ maxHeight: isExpanded ? '600px' : '0' }}
                        >
                          <div className="border-t border-slate-100 p-4 flex flex-col gap-3.5 bg-slate-50/50">
                            
                            {/* Bio */}
                            {pro.bio && (
                              <p className="text-[13px] text-[#64748B] leading-relaxed font-semibold">
                                {pro.bio}
                              </p>
                            )}

                            {/* Stats - with regular Phosphor Icons */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-tt-navy font-bold select-none">
                              <div className="flex items-center gap-1.5">
                                <Briefcase size={14} weight="regular" className="text-[#64748B]" />
                                <span>{pro.hireCount.toLocaleString()} hires</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin size={14} weight="regular" className="text-[#64748B]" />
                                <span>{pro.distanceMiles} mi away</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock size={14} weight="regular" className="text-[#64748B]" />
                                <span>Responds in {pro.responseTime}</span>
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] bg-slate-100" />

                            {/* Customer reviews */}
                            <div>
                              <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase block mb-1.5 select-none">
                                What customers say
                              </span>
                              <div className="flex flex-col gap-2">
                                {pro.reviews.map((rev, rIdx) => (
                                  <div key={rIdx} className="text-[12px] text-[#1D3557] font-semibold leading-relaxed">
                                    <Star size={10} weight="fill" color="#F4A623" className="inline mr-1" />
                                    <span>
                                      "{rev.length > 100 ? `${rev.substring(0, 100)}...` : rev}"
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Similar jobs badge */}
                            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B] font-bold select-none mt-1">
                              <CheckCircle size={12} weight="regular" className="text-[#22C55E] shrink-0" />
                              <span>{pro.similarJobsNearby} similar jobs done near you</span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-1 mt-1">
                              <button
                                onClick={() => initiateBooking(pro)}
                                className="bg-[#1C2B33] hover:bg-tt-blue text-white font-bold text-[13px] h-9 px-4 rounded-full flex-1 transition-all cursor-pointer select-none active:scale-98 flex items-center justify-center"
                              >
                                Book now &rarr;
                              </button>
                              <button
                                onClick={() => {
                                  setEstimatePro(pro);
                                  setEstimateDetails(`Need plumbing help: ${currentQuery || 'repair service'}`);
                                  setShowEstimateModal(true);
                                }}
                                className="bg-white hover:bg-slate-50 border border-slate-200 text-[#1D3557] font-bold text-[13px] h-9 px-4 rounded-full flex-1 transition-all cursor-pointer select-none active:scale-98 flex items-center justify-center"
                              >
                                Request estimate
                              </button>
                            </div>

                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          }

          // Default Tack text card
          return (
            <Card 
              key={msg.id} 
              hoverable={false} 
              className="bg-white border border-tt-border rounded-2xl p-4 flex flex-col gap-1.5 shadow-sm animate-page-in text-left"
            >
              <div className="flex items-center gap-1.5 select-none">
                <span className="text-[10px] font-bold text-tt-blue tracking-wider uppercase">Tack</span>
              </div>
              <p className="text-[15px] font-semibold text-[#1D3557] leading-relaxed break-words whitespace-pre-line">
                {msg.content}
              </p>
            </Card>
          );
        })}

        {/* Loading / Typing state indicator */}
        {chatState === 'follow_up' && (
          <div className="bg-white border border-tt-border p-4 rounded-2xl flex gap-1 items-center shadow-sm self-start animate-pulse w-14 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-tt-blue inline-block animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

        <div ref={feedEndRef} />
      </main>

      {/* FIXED BOTTOM CHAT CONTROLS INPUT BAR */}
      <footer 
        className="fixed bottom-0 left-0 w-full z-40 px-4 pt-12 pb-5 pointer-events-none select-none"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
        }}
      >
        <div className="max-w-[680px] w-full mx-auto flex flex-col gap-2 pointer-events-auto">
          
          {/* Derived State Input Mode */}
          {(() => {
            const inputMode = inputText.length > 0 
              ? 'typing' 
              : isRecording 
                ? 'recording' 
                : 'idle';

            return (
              <form 
                onSubmit={handleSend}
                className={`w-full bg-white border flex items-center gap-2 p-1.5 pl-4.5 mx-auto transition-all duration-300 ${
                  inputMode === 'recording'
                    ? 'border-[#009FD4] shadow-[0_0_0_4px_rgba(0,159,212,0.15),0_2px_12px_rgba(0,0,0,0.08)]'
                    : isFocused
                      ? 'border-[#009FD4] shadow-[0_0_0_3px_rgba(0,159,212,0.12),0_2px_8px_rgba(0,0,0,0.06)]'
                      : 'border-[#E2E8F0] shadow-[0_0_0_1px_rgba(0,159,212,0.08),0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]'
                }`}
                style={{
                  maxWidth: inputMode === 'recording' ? '280px' : '680px',
                  borderRadius: '9999px',
                  transition: 'max-width 250ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 200ms ease, box-shadow 200ms ease',
                }}
              >
                
                {/* Text area input bar */}
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputText}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Ask Tack anything..."
                  disabled={inputMode === 'recording'}
                  className="flex-grow bg-transparent border-0 outline-none p-0 py-1.5 text-[15px] font-sans font-semibold text-[#1D3557] placeholder:text-[#94A3B8] focus:ring-0 leading-normal resize-none overflow-y-auto"
                  style={{
                    opacity: inputMode === 'recording' ? 0 : 1,
                    maxWidth: inputMode === 'recording' ? '0px' : 'none',
                    transition: 'opacity 200ms ease, max-width 200ms ease',
                    minHeight: '32px',
                    maxHeight: '120px'
                  }}
                />

                {/* Voice Mode Visualizer */}
                {inputMode === 'recording' && (
                  <div className="flex-grow flex items-center gap-3 select-none animate-page-in min-w-0 pr-2">
                    {/* 5 Waveform bars */}
                    <div className="flex items-end gap-0.5 h-6 shrink-0">
                      <div className="w-[3px] bg-[#009FD4] rounded-full animate-wave-1" />
                      <div className="w-[3px] bg-[#009FD4] rounded-full animate-wave-2" />
                      <div className="w-[3px] bg-[#009FD4] rounded-full animate-wave-3" />
                      <div className="w-[3px] bg-[#009FD4] rounded-full animate-wave-4" />
                      <div className="w-[3px] bg-[#009FD4] rounded-full animate-wave-5" />
                    </div>
                    
                    {/* Ellipsis text */}
                    <span className="text-[14px] font-medium text-[#009FD4] animate-ellipsis whitespace-nowrap">
                      Listening
                    </span>
                  </div>
                )}

                {/* Morphing trigger button */}
                <button
                  type={inputMode === 'typing' ? 'submit' : 'button'}
                  onClick={
                    inputMode === 'idle' 
                      ? handleMicClick 
                      : inputMode === 'recording' 
                        ? handleMicClick 
                        : undefined
                  }
                  className={`group relative h-9 w-9 rounded-full border flex items-center justify-center shrink-0 cursor-pointer select-none overflow-hidden active:scale-95 transition-all duration-200 ${
                    inputMode === 'typing'
                      ? 'hover:bg-tt-blue hover:border-tt-blue hover:scale-[1.05]'
                      : inputMode === 'recording'
                        ? 'hover:bg-[#0B5FB0] hover:border-[#0B5FB0] hover:scale-[1.05]'
                        : 'hover:bg-[#E8F7FC] hover:border-[#009FD4] hover:scale-[1.05]'
                  }`}
                  style={{
                    backgroundColor: inputMode === 'typing' ? '#1C2B33' : inputMode === 'recording' ? '#009FD4' : '#F5F7FA',
                    borderColor: inputMode === 'typing' ? '#1C2B33' : inputMode === 'recording' ? '#009FD4' : '#E2E8F0',
                    transition: 'all 200ms ease, transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Pulse ring on the button when recording */}
                  {inputMode === 'recording' && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#009FD4] animate-btn-pulse pointer-events-none" />
                  )}

                  {/* Icon Microphone (State 1) */}
                  <div 
                    className="absolute flex items-center justify-center transition-all duration-200 group-hover:text-[#009FD4]"
                    style={{
                      opacity: inputMode === 'idle' ? 1 : 0,
                      transform: inputMode === 'idle' ? 'scale(1)' : 'scale(0.7)',
                      color: '#64748B'
                    }}
                  >
                    <Microphone size={18} weight="regular" />
                  </div>

                  {/* Icon ArrowUp (State 2 & 3) */}
                  <div 
                    className="absolute flex items-center justify-center transition-all duration-200"
                    style={{
                      opacity: inputMode !== 'idle' ? 1 : 0,
                      transform: inputMode !== 'idle' ? 'scale(1)' : 'scale(0.7)',
                      color: '#FFFFFF'
                    }}
                  >
                    <ArrowUp size={18} weight="regular" />
                  </div>

                </button>

              </form>
            );
          })()}

          {/* Network tag footer */}
          <div className="text-center text-[11px] text-[#94A3B8] font-bold select-none">
            Powered by Thumbtack's pro network
          </div>
        </div>
      </footer>

      {/* OVERLAY MODAL: BOOKING SUMMARY REVIEW */}
      {chatState === 'booking' && activeProvider && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-page-in">
          {/* Dismiss overlay */}
          <div className="absolute inset-0 cursor-pointer" onClick={cancelBooking} />
          
          <div className="w-full max-w-[680px] bg-white rounded-t-[24px] p-6 shadow-2xl z-10 relative max-h-[85vh] overflow-y-auto transform translate-y-0 transition-transform duration-300 ease-out flex flex-col gap-4 font-sans text-left">
            {/* Top handlebar */}
            <div className="w-8 h-1 bg-[#E2E8F0] rounded-full mx-auto select-none shrink-0" />

            <div className="flex justify-between items-center border-b border-slate-100 pb-2 select-none">
              <h3 className="text-[18px] font-bold font-serif text-[#1D3557]">
                Review your booking
              </h3>
              <button 
                onClick={cancelBooking}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors text-tt-muted cursor-pointerflex items-center justify-center"
              >
                <X size={18} weight="regular" />
              </button>
            </div>

            {/* Pro row */}
            <div className="flex items-center gap-3 py-1 pb-3 border-b border-tt-border select-none">
              <Avatar initials={activeProvider.initials} imageSrc={activeProvider.imageSrc} size="md" className="shrink-0 font-bold" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-bold text-[#1D3557]">{activeProvider.name}</span>
                  {activeProvider.verified && (
                    <Seal size={14} weight="fill" className="text-tt-blue shrink-0" />
                  )}
                </div>
                <span className="text-[12px] text-[#64748B] block font-semibold">{activeProvider.service}</span>
                <span className="text-[12px] font-bold text-tt-navy block mt-0.5">★ {activeProvider.rating} &bull; Licensed</span>
              </div>
            </div>

            {/* Details list - using regular Phosphor Icons */}
            <div className="flex flex-col gap-2.5 select-none font-sans">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-[12px] text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench size={14} weight="regular" className="text-[#64748B]" /> Service
                </span>
                <span className="text-[13px] font-bold text-[#1D3557]">Plumbing repair</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-[12px] text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarBlank size={14} weight="regular" className="text-[#64748B]" /> Date
                </span>
                <span className="text-[13px] font-bold text-[#1D3557]">Saturday, May 3</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-[12px] text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={14} weight="regular" className="text-[#64748B]" /> Time
                </span>
                <span className="text-[13px] font-bold text-[#1D3557]">{activeProvider.availability[0]}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-[12px] text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={14} weight="regular" className="text-[#64748B]" /> Location
                </span>
                <span className="text-[13px] font-bold text-[#1D3557]">94107 &bull; San Francisco</span>
              </div>
            </div>

            {/* AI reasoning card - clean, outline styling, no AI sparkles */}
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 flex flex-col gap-1 shadow-inner select-none font-sans">
              <span className="text-[12px] font-bold text-[#92400E] uppercase tracking-wide">
                Why Tack picked {activeProvider.name.split(' ')[0]}
              </span>
              <p className="text-[12px] text-[#92400E] leading-relaxed font-bold mt-0.5">
                {activeProvider.matchReason || "James has the best availability for Saturday, stays within your budget, and has excellent positive ratings for similar tasks nearby."}
              </p>
            </div>

            {/* Price breakdown */}
            <div className="bg-[#F5F7FA] border border-tt-border rounded-xl p-4 flex flex-col gap-1.5 shadow-inner">
              <div className="flex justify-between text-[12px] text-[#64748B] font-bold select-none">
                <span>Service fee</span>
                <span>${activeProvider.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[12px] text-[#64748B] font-bold select-none">
                <span>Platform fee</span>
                <span>$6.00</span>
              </div>
              <div className="h-[1px] bg-[#E2E8F0] my-1" />
              <div className="flex justify-between text-[14px] font-extrabold text-[#1D3557]">
                <span>Total</span>
                <span>${(activeProvider.price + 6).toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] font-bold justify-center mt-1 select-none">
                <CreditCard size={13} weight="regular" />
                <span>Visa ending in 4242</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={approveBooking}
                className="bg-[#1C2B33] hover:bg-[#009FD4] text-white font-bold text-[15px] h-12 rounded-full transition-all duration-150 cursor-pointer select-none flex items-center justify-center font-sans"
              >
                Approve & book &rarr;
              </button>
              <button
                onClick={cancelBooking}
                className="bg-transparent hover:bg-slate-50 text-[#64748B] font-bold text-[14px] h-10 rounded-full transition-all cursor-pointer select-none flex items-center justify-center border border-transparent hover:border-slate-200 font-sans"
              >
                Cancel
              </button>
            </div>

            {/* Fine print */}
            <div className="text-center text-[11px] text-[#64748B] font-bold select-none">
              Free cancellation up to 2 hours before.
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY MODAL: REQUEST ESTIMATE DETAILS */}
      {showEstimateModal && estimatePro && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-page-in">
          {/* Dismiss overlay */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowEstimateModal(false)} />
          
          <div className="w-full max-w-[680px] bg-white rounded-t-[24px] p-6 shadow-2xl z-10 relative max-h-[85vh] overflow-y-auto flex flex-col gap-4 font-sans text-left">
            <div className="w-8 h-1 bg-[#E2E8F0] rounded-full mx-auto select-none shrink-0" />

            <div className="flex justify-between items-center border-b border-slate-100 pb-2 select-none">
              <h3 className="text-[18px] font-bold font-serif text-[#1D3557]">
                Request an estimate
              </h3>
              <button 
                onClick={() => setShowEstimateModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors text-tt-muted cursor-pointer flex items-center justify-center"
              >
                <X size={18} weight="regular" />
              </button>
            </div>

            <p className="text-[13px] text-[#64748B] font-semibold leading-relaxed select-none">
              {estimatePro.name} will review your request and send a quote within 2 hours.
            </p>

            {/* Project description textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-tt-navy uppercase tracking-wider select-none">Project details</label>
              <textarea
                value={estimateDetails}
                onChange={(e) => setEstimateDetails(e.target.value)}
                rows={4}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[14px] text-tt-navy focus:outline-none focus:border-tt-blue focus:ring-4 focus:ring-tt-blue/10 transition-all font-semibold resize-none"
              />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  sendEstimate(estimatePro, estimateDetails);
                  setShowEstimateModal(false);
                }}
                className="bg-[#009FD4] hover:bg-[#0B5FB0] text-white font-bold text-[15px] h-12 rounded-full shadow transition-all cursor-pointer select-none flex items-center justify-center"
              >
                Send request &rarr;
              </button>
              <button
                type="button"
                onClick={() => setShowEstimateModal(false)}
                className="bg-transparent hover:bg-slate-50 text-[#64748B] font-bold text-[14px] h-10 rounded-full transition-all cursor-pointer select-none flex items-center justify-center font-sans"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
