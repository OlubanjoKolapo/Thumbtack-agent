import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  withArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  withArrow = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes (all pill shape)
  let baseClasses = 'inline-flex items-center justify-center font-sans font-semibold rounded-full transition-all duration-150 active:scale-95 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  // Variant styles
  const variants = {
    primary: 'bg-tt-dark text-white hover:bg-tt-blue border border-transparent shadow-sm',
    secondary: 'bg-white text-tt-navy border border-tt-border hover:border-tt-navy hover:bg-tt-page',
    outline: 'bg-white text-tt-navy border border-tt-border hover:border-tt-blue hover:text-tt-blue',
    ghost: 'bg-transparent text-tt-navy hover:bg-tt-blue-tint hover:text-tt-blue',
  };

  // Sizes classes
  const sizes = {
    sm: 'h-[36px] px-4 text-[12px]',
    md: 'h-[44px] px-5 text-[15px]',
    lg: 'h-[48px] px-6 text-[15px]',
  };

  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <span className="flex items-center gap-1.5">
          {children}
          {withArrow && <span className="font-sans">→</span>}
        </span>
      )}
    </button>
  );
};
