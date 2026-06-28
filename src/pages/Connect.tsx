import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus } from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';
import type { AgentType } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressDots } from '../components/ProgressDots';
import { Badge } from '../components/Badge';

// Import image assets
import claudeLogo from '../assets/claude logo.png';
import chatgptLogo from '../assets/ChatGPT-Logo.png';
import mcpLogo from '../assets/Mcp logo.webp';

export const Connect: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedAgent,
    setSelectedAgent,
    spendLimit,
    setSpendLimit,
    requireApproval,
    setRequireApproval,
  } = useBooking();

  const handleAgentSelect = (agent: AgentType) => {
    setSelectedAgent(agent);
  };

  const handleIncrement = () => {
    setSpendLimit((spendLimit || 0) + 50);
  };

  const handleDecrement = () => {
    setSpendLimit(Math.max(0, (spendLimit || 0) - 50));
  };

  const handleNext = () => {
    navigate('/request');
  };

  const agentLabel = selectedAgent === 'claude' 
    ? 'Claude' 
    : selectedAgent === 'chatgpt' 
      ? 'ChatGPT' 
      : 'MCP Agent';

  return (
    <div className="flex-grow bg-tt-page min-h-screen py-12 px-4 flex items-center justify-center animate-page-in font-sans relative overflow-hidden">
      {/* Ambient background blur lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-tt-blue-tint/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[480px] flex flex-col gap-6 relative z-10 text-left">
        
        {/* Onboarding steps progress dots */}
        <div className="flex justify-center">
          <ProgressDots totalSteps={3} currentStep={0} />
        </div>

        {/* Header titles */}
        <div className="text-center">
          <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-tight select-none">
            Connect your agent
          </h2>
          <p className="text-[12px] text-tt-muted font-semibold mt-1 max-w-[320px] mx-auto leading-relaxed">
            Link Tack with your favorite AI assistant to automate scheduling and booking.
          </p>
        </div>

        {/* MAIN PANEL */}
        <div className="flex flex-col gap-4">
          
          {/* List layout of AI card selectors */}
          <div className="flex flex-col gap-2.5">
            
            {/* Claude card */}
            <div
              onClick={() => handleAgentSelect('claude')}
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none active:scale-[0.99] ${
                selectedAgent === 'claude'
                  ? 'border-tt-dark bg-slate-50 ring-2 ring-tt-dark/10 shadow-md -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-100 p-1.5 shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
                  <img src={claudeLogo} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" alt="Claude logo" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-tt-navy leading-snug">Claude</span>
                    {selectedAgent === 'claude' && (
                      <Badge variant="dark" className="text-[10px] font-bold px-1.5 py-0.5 tracking-wide">Connected</Badge>
                    )}
                  </div>
                  <div className="text-[12px] text-tt-muted font-semibold font-sans">by Anthropic &bull; Recommended</div>
                </div>
              </div>
              
              {/* Radio Indicator */}
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                selectedAgent === 'claude' 
                  ? 'border-tt-dark bg-white shadow-inner' 
                  : 'border-slate-300 bg-white'
              }`}>
                {selectedAgent === 'claude' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-tt-dark animate-scale-in" />
                )}
              </div>
            </div>

            {/* ChatGPT card */}
            <div
              onClick={() => handleAgentSelect('chatgpt')}
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none active:scale-[0.99] ${
                selectedAgent === 'chatgpt'
                  ? 'border-tt-dark bg-slate-50 ring-2 ring-tt-dark/10 shadow-md -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-100 p-1.5 shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
                  <img src={chatgptLogo} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" alt="ChatGPT logo" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-tt-navy leading-snug">ChatGPT</span>
                    {selectedAgent === 'chatgpt' && (
                      <Badge variant="dark" className="text-[10px] font-bold px-1.5 py-0.5 tracking-wide">Connected</Badge>
                    )}
                  </div>
                  <div className="text-[12px] text-tt-muted font-semibold font-sans">by OpenAI &bull; Core GPT-4o</div>
                </div>
              </div>
              
              {/* Radio Indicator */}
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                selectedAgent === 'chatgpt' 
                  ? 'border-tt-dark bg-white shadow-inner' 
                  : 'border-slate-300 bg-white'
              }`}>
                {selectedAgent === 'chatgpt' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-tt-dark animate-scale-in" />
                )}
              </div>
            </div>

            {/* Custom MCP Agent card */}
            <div
              onClick={() => handleAgentSelect('custom')}
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none active:scale-[0.99] ${
                selectedAgent === 'custom'
                  ? 'border-tt-dark bg-slate-50 ring-2 ring-tt-dark/10 shadow-md -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-100 p-1 shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
                  <img src={mcpLogo} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" alt="MCP logo" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-tt-navy leading-snug">Custom agent</span>
                    {selectedAgent === 'custom' && (
                      <Badge variant="dark" className="text-[10px] font-bold px-1.5 py-0.5 tracking-wide">Connected</Badge>
                    )}
                  </div>
                  <div className="text-[12px] text-tt-muted font-semibold font-sans">Any MCP-compatible AI &bull; Protocol</div>
                </div>
              </div>
              
              {/* Radio Indicator */}
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                selectedAgent === 'custom' 
                  ? 'border-tt-dark bg-white shadow-inner' 
                  : 'border-slate-300 bg-white'
              }`}>
                {selectedAgent === 'custom' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-tt-dark animate-scale-in" />
                )}
              </div>
            </div>

          </div>

          {/* Spend limit and approval card */}
          <Card hoverable={false} className="flex flex-col gap-4 border border-slate-200 bg-white p-5 rounded-2xl shadow-sm">
            <div>
              <label className="text-[12px] font-bold tracking-wider text-tt-navy uppercase block mb-1">
                Set a spending limit
              </label>
              <span className="text-[12px] text-tt-muted block leading-relaxed font-semibold">
                Your agent won't book anything above this amount without your explicit approval.
              </span>
            </div>

            {/* Increment/decrement buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDecrement}
                className="h-9 w-9 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 rounded-xl flex items-center justify-center text-tt-navy shrink-0 transition-all duration-300 select-none cursor-pointer"
              >
                <Minus size={15} weight="regular" />
              </button>

              <div className="relative flex-grow flex items-center bg-white border border-slate-200 rounded-xl px-4 h-11 focus-within:border-tt-dark focus-within:ring-4 focus-within:ring-tt-dark/10 transition-all duration-300">
                <span className="text-tt-navy font-extrabold mr-1.5 text-[15px] select-none">$</span>
                <input
                  type="number"
                  value={spendLimit || ''}
                  onChange={(e) => setSpendLimit(Number(e.target.value))}
                  className="bg-transparent border-0 outline-none w-full font-bold text-tt-navy text-[15px] h-full focus:ring-0 p-0"
                  placeholder="0"
                />
                <span className="text-[12px] text-tt-muted font-bold ml-2 shrink-0 select-none">/booking</span>
              </div>

              <button
                type="button"
                onClick={handleIncrement}
                className="h-9 w-9 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 rounded-xl flex items-center justify-center text-tt-navy shrink-0 transition-all duration-300 select-none cursor-pointer"
              >
                <Plus size={15} weight="regular" />
              </button>
            </div>

            {/* Divider line */}
            <div className="h-[1px] bg-slate-100 my-0.5" />

            {/* Sliding Toggle Switch Row */}
            <div className="flex items-center justify-between py-1 select-none">
              <span className="text-[15px] font-bold text-tt-navy">
                Require approval for all bookings
              </span>
              <button
                type="button"
                onClick={() => setRequireApproval(!requireApproval)}
                className={`w-[44px] h-[24px] rounded-full transition-colors duration-300 relative focus:outline-none cursor-pointer flex items-center ${
                  requireApproval ? 'bg-tt-dark shadow-[0_2px_6px_rgba(28,43,51,0.2)]' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`absolute bg-white w-4.5 h-4.5 rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    requireApproval ? 'translate-x-[22px]' : 'translate-x-[4px]'
                  }`}
                />
              </button>
            </div>
          </Card>

          {/* CTA Submit Button */}
          <Button variant="primary" size="lg" className="w-full active-press shadow-md font-bold text-[15px] flex items-center justify-center gap-1.5" onClick={handleNext}>
            <span>Connect {agentLabel}</span>
            <ArrowRight size={16} weight="regular" className="shrink-0" />
          </Button>

        </div>
      </div>
    </div>
  );
};
