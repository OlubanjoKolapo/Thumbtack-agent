import React from 'react';
import { Check } from 'lucide-react';

interface IntelligenceRowProps {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  iconBgColor?: string;
  iconColor?: string;
  text: string;
  status: 'pending' | 'loading' | 'done';
}

export const IntelligenceRow: React.FC<IntelligenceRowProps> = ({
  icon: Icon,
  iconBgColor = 'bg-tt-blue-tint',
  iconColor = 'text-tt-blue',
  text,
  status,
}) => {
  return (
    <div className="flex items-center justify-between h-[56px] px-6 border-b border-tt-page last:border-0 font-sans">
      <div className="flex items-center gap-4">
        {/* Source Icon wrapper */}
        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${iconBgColor} ${iconColor}`}>
          <Icon size={16} />
        </div>
        
        {/* Action text */}
        <span className="text-[14px] text-tt-navy font-medium">
          {text}
        </span>
      </div>

      {/* Status indicator on the right */}
      <div className="flex items-center justify-center w-6 h-6">
        {status === 'done' && (
          <div className="text-[#22C55E] bg-[#DCFCE7] p-1 rounded-full animate-scale-in">
            <Check size={14} className="stroke-[3]" />
          </div>
        )}
        {status === 'loading' && (
          <div className="h-4 w-4 border-2 border-tt-blue border-t-transparent rounded-full animate-spin" />
        )}
        {status === 'pending' && (
          <div className="h-4 w-4 rounded-full border border-tt-border" />
        )}
      </div>
    </div>
  );
};
