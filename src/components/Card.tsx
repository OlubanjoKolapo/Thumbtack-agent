import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'featured';
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = true,
  className = '',
  ...props
}) => {
  let baseClasses = 'bg-white rounded-2xl p-6 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) font-sans';

  // Variant configurations - reduced brand blue, using neutral dark/slate
  const variants = {
    default: 'border border-tt-border shadow-[0_2px_8px_rgba(28,43,51,0.04)]',
    elevated: 'border border-transparent shadow-[0_12px_24px_rgba(28,43,51,0.06),0_1px_3px_rgba(28,43,51,0.02)]',
    bordered: 'border border-tt-border shadow-none',
    featured: 'border-2 border-tt-dark shadow-[0_8px_32px_rgba(28,43,51,0.06)]',
  };

  // Hover animations config - using slate instead of brand blue
  const hoverClasses = hoverable
    ? `hover:-translate-y-1 ${
        variant === 'featured'
          ? 'hover:shadow-[0_16px_36px_rgba(28,43,51,0.12)] hover:border-slate-800'
          : 'hover:shadow-[0_16px_36px_rgba(28,43,51,0.08)] hover:border-slate-400'
      }`
    : '';

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
