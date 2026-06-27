import React from 'react';

interface AvatarProps {
  initials: string;
  imageSrc?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  imageSrc,
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'flex items-center justify-center rounded-full bg-tt-blue-tint text-tt-blue font-sans font-bold select-none overflow-hidden';

  const sizes = {
    sm: 'h-8 w-8 text-[12px]',
    md: 'h-12 w-12 text-[15px]',
    lg: 'h-16 w-16 text-[15px]',
  };

  return (
    <div className={`${baseClasses} ${sizes[size]} ${className}`}>
      {imageSrc ? (
        <img src={imageSrc} className="w-full h-full object-cover" alt={initials} />
      ) : (
        initials.toUpperCase()
      )}
    </div>
  );
};
