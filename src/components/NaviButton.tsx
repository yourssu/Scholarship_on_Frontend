'use client';

import { UserInfo } from '@/api/types/scholarship';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NaviButtonProps {
  onRecommendClick?: () => void;
  onMyClick?: () => void;
  className?: string;
}

const USER_INFO_KEYS: (keyof UserInfo)[] = [
  'school',
  'classOfSchool',
  'majorOfSchool',
  'location',
  'levelOfIncome',
  'grade',
];

export default function NaviButton({
  onRecommendClick,
  onMyClick,
  className = 'rounded-full p-2 transition-colors hover:bg-gray-100 font-h5-17 text-neutral-800',
}: NaviButtonProps) {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // USER_INFO_KEYS 배열의 모든 키가 localStorage에 존재하는지 확인
    const hasAllInfo = USER_INFO_KEYS.every(key => localStorage.getItem(key));
    setIsLoggedIn(hasAllInfo);
  }, []);

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

  if (pathname === '/search-list') {
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
