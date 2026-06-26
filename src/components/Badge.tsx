import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'green' | 'yellow' | 'gray' | 'dark';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-sans';

  const variants = {
    blue: 'bg-tt-blue-tint text-tt-blue border border-tt-blue/20',
    green: 'bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/10',
    yellow: 'bg-[#FEF9EE] text-[#F4A623] border border-[#F4A623]/20',
    gray: 'bg-tt-page text-tt-muted border border-tt-border',
    dark: 'bg-tt-dark text-white',
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
