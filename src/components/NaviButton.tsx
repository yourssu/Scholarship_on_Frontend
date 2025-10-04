'use client';

import { usePathname } from 'next/navigation';

interface NaviButtonProps {
  onRecommendClick?: () => void;
  onMyClick?: () => void;
  className?: string;
}

export default function NaviButton({
  onRecommendClick,
  onMyClick,
  className = 'rounded-full p-2 transition-colors hover:bg-gray-100 font-h5-17 text-neutral-800',
}: NaviButtonProps) {
  const pathname = usePathname();

  // Mock 데이터 - 로그인 상태 (나중에 API 연동시 변경)
  const isLoggedIn = true;

  if (pathname === '/') {
    return (
      <>
        {isLoggedIn ? (
          <button onClick={onMyClick} className={className} aria-label="My">
            <p>My</p>
          </button>
        ) : (
          <button
            onClick={onMyClick}
            className={className}
            aria-label="정보입력"
          >
            <p>정보입력</p>
          </button>
        )}
      </>
    );
  }

  if (pathname === '/write-info') {
    return (
      <button onClick={onMyClick} className={className} aria-label="정보입력">
        <p>정보입력</p>
      </button>
    );
  }

  if (pathname === '/info-list') {
    return (
      <button onClick={onMyClick} className={className} aria-label="My">
        <p>My</p>
      </button>
    );
  }

  if (pathname === '/info-modal') {
    return (
      <>
        <button
          onClick={onRecommendClick}
          className={className}
          aria-label="추천공고"
        >
          <p>추천공고</p>
        </button>
        <button onClick={onMyClick} className={className} aria-label="My">
          <p>My</p>
        </button>
      </>
    );
  }

  if (pathname === '/search') {
    return (
      <>
        <button
          onClick={onRecommendClick}
          className={className}
          aria-label="추천공고"
        >
          <p>추천공고</p>
        </button>
        <button onClick={onMyClick} className={className} aria-label="My">
          <p>My</p>
        </button>
      </>
    );
  }

  return (
    <button
      onClick={onRecommendClick}
      className={className}
      aria-label="추천공고"
    >
      <p>추천공고</p>
    </button>
  );
}
