import React from 'react';

interface ProgressDotsProps {
  totalSteps?: number;
  currentStep: number; // 0-indexed
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({
  totalSteps = 3,
  currentStep,
}) => {
  return (
    <div className="flex justify-center items-center gap-[6px]">
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <div
          key={idx}
          className={`h-2 w-2 rounded-full transition-colors duration-150 ${
            idx === currentStep ? 'bg-tt-blue' : 'bg-tt-border'
          }`}
        />
      ))}
    </div>
  );
};
