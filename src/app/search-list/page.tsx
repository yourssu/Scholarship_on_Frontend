'use client';

import { Suspense } from 'react'; // Suspense 임포트
import { Header, NaviButton } from '@/components';
import { useRouter } from 'next/navigation';
import { MainSearchIcon } from '../_components/icon/MainSearchIcon';
import { useSearchKey } from '@/hooks/useSearchKey';
import SearchResults from './_components/SearchResults';

export default function SearchListPage() {
  const router = useRouter();

  // useSearchParams를 사용하는 로직은 자식 컴포넌트로 이동했으므로
  // initialSearchKeyword는 여기서는 필요 없습니다.
  // useSearchKey는 검색창 입력을 위해 그대로 사용합니다.
  const { searchKeyword, setSearchKeyword, handleKeyDown, handleSearch } =
    useSearchKey();

  return (
    <div className="min-h-screen">
      <Header
        className="bg-primary-100"
        rightElement={
          <NaviButton
            onRecommendClick={() => router.push('/info-list')}
            onMyClick={() => router.push('/write-info')}
          />
        }
      />
      <section className="bg-primary-100 flex w-full justify-center pt-6 pb-4">
        <div className="flex h-[2.75rem] w-[19.875rem] items-center rounded-full bg-[#F9F9F9] px-5">
          <input
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="font-t1-14 flex-1 placeholder:text-neutral-500 focus:outline-none"
            placeholder="장학금명/기관명을 입력해주세요."
          />
          <button onClick={handleSearch}>
            <MainSearchIcon />
          </button>
        </div>
      </section>

      <section>
        <Suspense
          fallback={
            <p className="font-h3-18 mt-10 text-center">
              검색 결과를 불러오는 중...
            </p>
          }
        >
          <SearchResults />
        </Suspense>
      </section>
    </div>
  );
}
