'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  showInfoText?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary:
    'bg-[#4097F9] text-white hover:bg-[#3388e5] focus:ring-[#3388e5]/20 ',
  disabled:
    'bg-neutral-300 text-white hover:bg-neutral-300 focus:ring-neutral-300/20',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-4 font-semibold text-lg ',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  showInfoText = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled;

  return (
    <div className="flex w-full flex-col gap-2">
      {showInfoText && (
        <p className="pb-4 text-center text-xs whitespace-nowrap text-neutral-500 sm:text-sm md:text-base">
          대상 대학, 지원 금액 등의 사항은 홈페이지를 통해 알 수 있어요!
        </p>
      )}
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[12px] font-medium transition-all duration-200',
          'focus:ring-2 focus:ring-offset-2 focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        disabled={isDisabled}
        {...props}
      >
        <span>{children}</span>
      </button>
    </div>
  );
}
