import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import type { AgentType } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressDots } from '../components/ProgressDots';

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

  const handleNext = () => {
    navigate('/request');
  };

  const agentLabel = selectedAgent === 'claude' 
    ? 'Claude' 
    : selectedAgent === 'chatgpt' 
    ? 'ChatGPT' 
    : 'Custom Agent';

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16 bg-tt-page animate-page-in font-sans relative overflow-hidden">
      {/* Ambient background blur lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-tt-blue-tint/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[480px] flex flex-col gap-8 relative z-10">
        
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
          <ProgressDots currentStep={0} totalSteps={3} />
        </div>

        {/* Content Box */}
        <div className="flex flex-col gap-6">
          
          {/* Header Text */}
          <div className="text-center">
            <h2 className="text-[28px] font-bold font-serif text-tt-navy leading-snug mb-1">
              Connect your agent
            </h2>
            <p className="text-[12px] text-tt-muted leading-relaxed max-w-[340px] mx-auto font-semibold">
              Choose the AI you already use. Tack works with any MCP-compatible agent.
            </p>
          </div>

          {/* Cards selection list */}
          <div className="flex flex-col gap-3">
            
            {/* Claude card */}
            <div
              onClick={() => handleAgentSelect('claude')}
              className={`flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none active:scale-[0.99] ${
                selectedAgent === 'claude'
                  ? 'border-2 border-tt-blue bg-tt-blue-tint shadow-[0_8px_20px_rgba(0,159,212,0.08)] -translate-y-0.5'
                  : 'border-tt-border bg-white hover:border-tt-blue/50 hover:shadow-[0_4px_12px_rgba(28,43,51,0.03)] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={claudeLogo} className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm" alt="Claude logo" />
                <div>
                  <div className="text-[15px] font-bold text-tt-navy leading-snug">Claude</div>
                  <div className="text-[12px] text-tt-muted font-semibold">by Anthropic</div>
                </div>
              </div>
              
              {/* Custom Radio Button */}
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                selectedAgent === 'claude' 
                  ? 'border-tt-blue bg-white shadow-sm' 
                  : 'border-tt-border bg-white'
              }`}>
                {selectedAgent === 'claude' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-tt-blue animate-scale-in" />
                )}
              </div>
            </div>

            {/* ChatGPT card */}
            <div
              onClick={() => handleAgentSelect('chatgpt')}
              className={`flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none active:scale-[0.99] ${
                selectedAgent === 'chatgpt'
                  ? 'border-2 border-tt-blue bg-tt-blue-tint shadow-[0_8px_20px_rgba(0,159,212,0.08)] -translate-y-0.5'
                  : 'border-tt-border bg-white hover:border-tt-blue/50 hover:shadow-[0_4px_12px_rgba(28,43,51,0.03)] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={chatgptLogo} className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm" alt="ChatGPT logo" />
                <div>
                  <div className="text-[15px] font-bold text-tt-navy leading-snug">ChatGPT</div>
                  <div className="text-[12px] text-tt-muted font-semibold">by OpenAI</div>
                </div>
              </div>
              
              {/* Custom Radio Button */}
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                selectedAgent === 'chatgpt' 
                  ? 'border-tt-blue bg-white shadow-sm' 
                  : 'border-tt-border bg-white'
              }`}>
                {selectedAgent === 'chatgpt' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-tt-blue animate-scale-in" />
                )}
              </div>
            </div>

            {/* Custom MCP Agent card */}
            <div
              onClick={() => handleAgentSelect('custom')}
              className={`flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none active:scale-[0.99] ${
                selectedAgent === 'custom'
                  ? 'border-2 border-tt-blue bg-tt-blue-tint shadow-[0_8px_20px_rgba(0,159,212,0.08)] -translate-y-0.5'
                  : 'border-tt-border bg-white hover:border-tt-blue/50 hover:shadow-[0_4px_12px_rgba(28,43,51,0.03)] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={mcpLogo} className="w-10 h-10 rounded-full object-contain shrink-0 shadow-sm p-1 bg-slate-50 border border-slate-100" alt="MCP logo" />
                <div>
                  <div className="text-[15px] font-bold text-tt-navy leading-snug">Custom agent</div>
                  <div className="text-[12px] text-tt-muted font-semibold">Any MCP-compatible AI</div>
                </div>
              </div>
              
              {/* Custom Radio Button */}
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                selectedAgent === 'custom' 
                  ? 'border-tt-blue bg-white shadow-sm' 
                  : 'border-tt-border bg-white'
              }`}>
                {selectedAgent === 'custom' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-tt-blue animate-scale-in" />
                )}
              </div>
            </div>

          </div>

          {/* Spend limit and approval checks */}
          <Card hoverable={false} className="flex flex-col gap-4 border border-tt-border bg-white p-5 rounded-2xl shadow-sm">
            <div>
              <label className="text-[12px] font-bold tracking-wider text-tt-navy uppercase block mb-1">
                Set a spending limit
              </label>
              <span className="text-[12px] text-tt-muted block leading-relaxed">
                Your agent won't book anything above this amount without your explicit approval.
              </span>
            </div>

            {/* Glowing input row */}
            <div className="relative flex items-center bg-white border border-tt-border rounded-xl px-4 h-12 w-full focus-within:border-tt-blue focus-within:ring-4 focus-within:ring-tt-blue/10 transition-all duration-300">
              <span className="text-tt-navy font-bold mr-1.5">$</span>
              <input
                type="number"
                value={spendLimit || ''}
                onChange={(e) => setSpendLimit(Number(e.target.value))}
                className="bg-transparent border-0 outline-none w-full font-bold text-tt-navy text-[15px] h-full focus:ring-0 p-0"
                placeholder="0"
              />
              <span className="text-[12px] text-tt-muted font-bold ml-2 shrink-0 select-none">/booking</span>
            </div>

            {/* Divider line */}
            <div className="h-[1px] bg-tt-border my-0.5" />

            {/* Sliding Toggle Switch Row */}
            <div className="flex items-center justify-between py-1">
              <span className="text-[15px] font-bold text-tt-navy">
                Require approval for all bookings
              </span>
              <button
                type="button"
                onClick={() => setRequireApproval(!requireApproval)}
                className={`w-[48px] h-[26px] rounded-full transition-colors duration-300 relative focus:outline-none cursor-pointer flex items-center ${
                  requireApproval ? 'bg-tt-blue shadow-[0_2px_6px_rgba(0,159,212,0.3)]' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`absolute bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    requireApproval ? 'translate-x-[24px]' : 'translate-x-[4px]'
                  }`}
                />
              </button>
            </div>
          </Card>

          {/* CTA Submit Button */}
          <Button variant="primary" size="lg" className="w-full active-press shadow-md" onClick={handleNext}>
            Connect {agentLabel} <ArrowRight size={16} className="ml-1 shrink-0" />
          </Button>

        </div>
      </div>
    </div>
  );
};
