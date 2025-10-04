'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  rightElement?: React.ReactNode;
  className?: string;
}

export default function Header({ rightElement, className = '' }: HeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className={`sticky top-0 z-50 bg-white ${className}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center">
        <button
          onClick={handleLogoClick}
          className="font-h2-20 hover:text-primary-500 flex items-center text-gray-900 transition-colors"
        >
          <img
            src="/image/scholar_logo.webp"
            alt="logo"
            className="h-[3.6875rem] w-auto"
          />
        </button>
        {!rightElement && <div className="ml-auto flex items-center"></div>}
        {rightElement && (
          <div className="ml-auto flex items-center">{rightElement}</div>
        )}
      </div>
    </header>
  );
}
