import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'flex items-center justify-center rounded-full bg-tt-blue-tint text-tt-blue font-sans font-bold select-none';

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-xl',
  };

  return (
    <div className={`${baseClasses} ${sizes[size]} ${className}`}>
      {initials.toUpperCase()}
    </div>
  );
};
