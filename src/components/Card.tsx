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
  let baseClasses = 'bg-white rounded-2xl p-6 transition-all duration-150 font-sans';

  // Variant configurations
  const variants = {
    default: 'border border-tt-border shadow-[0_1px_4px_rgba(0,0,0,0.06)]',
    elevated: 'border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.02)]',
    bordered: 'border border-tt-border shadow-none',
    featured: 'border-2 border-tt-blue shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
  };

  // Hover animations config
  const hoverClasses = hoverable
    ? 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-tt-blue'
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
