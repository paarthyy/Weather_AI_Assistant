import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const base = 'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200';
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-900/30 hover:brightness-110',
    secondary: 'border border-slate-700 bg-slate-900/70 text-slate-200 hover:border-cyan-400/60',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/60',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
