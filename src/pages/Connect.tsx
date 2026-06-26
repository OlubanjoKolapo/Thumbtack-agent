import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, ToggleLeft, ToggleRight, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import type { AgentType } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressDots } from '../components/ProgressDots';

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
    <div className="flex-grow flex items-center justify-center px-4 py-12 bg-tt-page animate-page-in">
      <div className="w-full max-w-[480px] flex flex-col gap-6">
        
        {/* Wordmark logo & progress */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="font-serif text-[28px] font-bold text-tt-dark">Tack</span>
            <span className="text-[12px] text-tt-muted tracking-wide font-sans">by Thumbtack</span>
          </div>
          <ProgressDots currentStep={0} totalSteps={3} />
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-5">
          {/* Header text */}
          <div className="text-center">
            <h2 className="text-[28px] font-bold font-serif text-tt-navy mb-1.5">
              Connect your agent
            </h2>
            <p className="text-[15px] text-tt-muted font-sans">
              Choose the AI you already use. Tack works with any MCP-compatible agent.
            </p>
          </div>

          {/* Cards select list */}
          <div className="flex flex-col gap-3">
            
            {/* Claude card */}
            <div
              onClick={() => handleAgentSelect('claude')}
              className={`flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                selectedAgent === 'claude'
                  ? 'border-2 border-tt-blue bg-tt-blue-tint'
                  : 'border-tt-border bg-white hover:border-tt-blue'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Logo wrapper */}
                <div className="flex items-center justify-center h-10 w-10 bg-[#D97706]/10 text-[#D97706] font-bold text-lg rounded-full select-none">
                  C
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-tt-navy leading-snug">Claude</div>
                  <div className="text-[12px] text-tt-muted">by Anthropic</div>
                </div>
              </div>
              
              {/* Radio mock */}
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                selectedAgent === 'claude' 
                  ? 'border-tt-blue bg-white' 
                  : 'border-tt-border'
              }`}>
                {selectedAgent === 'claude' && (
                  <div className="h-3 w-3 rounded-full bg-tt-blue" />
                )}
              </div>
            </div>

            {/* ChatGPT card */}
            <div
              onClick={() => handleAgentSelect('chatgpt')}
              className={`flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                selectedAgent === 'chatgpt'
                  ? 'border-2 border-tt-blue bg-tt-blue-tint'
                  : 'border-tt-border bg-white hover:border-tt-blue'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Logo wrapper */}
                <div className="flex items-center justify-center h-10 w-10 bg-[#10B981]/10 text-[#10B981] font-bold text-sm rounded-full select-none">
                  GPT
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-tt-navy leading-snug">ChatGPT</div>
                  <div className="text-[12px] text-tt-muted">by OpenAI</div>
                </div>
              </div>
              
              {/* Radio mock */}
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                selectedAgent === 'chatgpt' 
                  ? 'border-tt-blue bg-white' 
                  : 'border-tt-border'
              }`}>
                {selectedAgent === 'chatgpt' && (
                  <div className="h-3 w-3 rounded-full bg-tt-blue" />
                )}
              </div>
            </div>

            {/* Custom MCP Agent card */}
            <div
              onClick={() => handleAgentSelect('custom')}
              className={`flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                selectedAgent === 'custom'
                  ? 'border-2 border-tt-blue bg-tt-blue-tint'
                  : 'border-tt-border bg-white hover:border-tt-blue'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Logo wrapper */}
                <div className="flex items-center justify-center h-10 w-10 bg-[#64748B]/10 text-[#64748B] rounded-full">
                  <Cpu size={20} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-tt-navy leading-snug">Custom agent</div>
                  <div className="text-[12px] text-tt-muted">Any MCP-compatible AI</div>
                </div>
              </div>
              
              {/* Radio mock */}
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                selectedAgent === 'custom' 
                  ? 'border-tt-blue bg-white' 
                  : 'border-tt-border'
              }`}>
                {selectedAgent === 'custom' && (
                  <div className="h-3 w-3 rounded-full bg-tt-blue" />
                )}
              </div>
            </div>

          </div>

          {/* Spend limit and approval checks */}
          <Card hoverable={false} className="flex flex-col gap-4 border border-tt-border bg-white p-5 rounded-2xl">
            <div>
              <label className="text-[13px] font-semibold text-tt-navy block mb-0.5">
                Set a spending limit (optional)
              </label>
              <span className="text-[12px] text-tt-muted block leading-normal">
                Your agent won't book anything above this amount without your explicit approval.
              </span>
            </div>

            {/* Input wrap */}
            <div className="relative flex items-center bg-white border border-tt-border rounded-xl px-4 h-12 w-full focus-within:border-tt-blue">
              <span className="text-tt-navy font-semibold mr-1.5">$</span>
              <input
                type="number"
                value={spendLimit || ''}
                onChange={(e) => setSpendLimit(Number(e.target.value))}
                className="bg-transparent border-0 outline-none w-full font-semibold text-tt-navy text-base h-full focus:ring-0 p-0"
                placeholder="0"
              />
              <span className="text-tt-muted text-sm font-medium ml-2 shrink-0">/booking</span>
            </div>

            {/* Divider line */}
            <div className="h-[1px] bg-tt-border my-1" />

            {/* Toggle row */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-tt-navy">
                Require approval for all bookings
              </span>
              <button
                type="button"
                onClick={() => setRequireApproval(!requireApproval)}
                className="text-tt-blue focus:outline-none transition-transform active:scale-95 cursor-pointer"
              >
                {requireApproval ? (
                  <ToggleRight size={40} className="stroke-[1.5]" />
                ) : (
                  <ToggleLeft size={40} className="text-tt-muted stroke-[1.5]" />
                )}
              </button>
            </div>
          </Card>

          {/* CTA Submit Button */}
          <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
            Connect {agentLabel} <ArrowRight size={16} className="ml-1 shrink-0" />
          </Button>

        </div>
      </div>
    </div>
  );
};
