'use client';

import { ResultInfo } from '@/app/info-list/_components/ResultInfo';
import { ResultList } from '@/app/info-list/_components/ResultItem';
import { UnderArrowIcon } from './_components/UnderArrowIcon';
import { Header, NaviButton } from '@/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InfoListPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex grid-rows-[20px_1fr_20px] px-8 py-2 font-sans transition-all duration-300 ${
        isExpanded
          ? 'min-h-screen flex-col'
          : 'h-screen flex-col overflow-hidden'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
        <Header
          rightElement={
            <NaviButton
              onMyClick={() => {
                router.push('/write-info');
              }}
            />
          }
        />
        <div className="w-full justify-self-start">
          <ResultInfo num={251} />
        </div>
      </div>

      <div className="flex-1 sm:px-20">
        <ResultList
          title={'소득연계형 국가장학금'}
          recruitmentStatus={'scheduled'}
          facility={'한국장학재단'}
          isExpanded={isExpanded}
        />
      </div>

      <div className="flex w-full justify-center py-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="transition-transform duration-300 hover:scale-110"
        >
          <UnderArrowIcon
            fill="#7B7B7B"
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );
}
