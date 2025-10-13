'use client';
import { Header, NaviButton } from '@/components';
import { useRouter } from 'next/navigation';
import { MainSearchIcon } from './_components/icon/MainSearchIcon';
import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ResultList } from './info-list/_components/ResultItem';
import { useSearchKey } from '@/hooks/useSearchKey';
import { Scholarship } from '@/api/types/scholarship';
import { getScholarshipList } from '@/api/scholarshipAPI';
import { UnderArrowIcon } from './info-list/_components/UnderArrowIcon';

type SortType = 'popular' | 'latest' | 'suggest';
const PAGE_SIZE = 15;

export default function Home() {
  const router = useRouter();

  // const [sortKey, setSortKey] = useState<SortType>('latest');
  const { searchKeyword, setSearchKeyword, handleKeyDown, handleSearch } =
    useSearchKey();

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true); // 다음 페이지 존재 여부
  const loaderRef = useRef<HTMLDivElement>(null); // 감지할 요소

  const [isExpanded, setIsExpanded] = useState(false);

  const loadMoreScholarships = useCallback(async () => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);

    try {
      const response = await getScholarshipList({ page, each: PAGE_SIZE });

      if (response.success && response.data.length > 0) {
        setScholarships(prev => [...prev, ...response.data]);
        setPage(prev => prev + 1);

        if (response.data.length < PAGE_SIZE) {
          setHasNextPage(false);
        }
      }
    } catch (error) {
      console.error('데이터를 불러오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasNextPage]);

  // 초기 데이터 로딩
  useEffect(() => {
    if (scholarships.length === 0) {
      loadMoreScholarships();
    }
  }, [loadMoreScholarships, scholarships.length]);

  // 무한 스크롤 감지
  useEffect(() => {
    if (!isExpanded || !hasNextPage) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreScholarships();
      }
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [isExpanded, hasNextPage, loadMoreScholarships]);

  useEffect(() => {
    console.log('장학금 데이터', scholarships);
  }, [scholarships]);

  return (
    <div className="min-h-screen items-center">
      <div className="w-full">
        <Header
          className="bg-primary-100"
          rightElement={
            <NaviButton
              onMyClick={() => {
                router.push('/write-info');
              }}
            />
          }
        />
      </div>
      <section className="bg-primary-100 flex w-full flex-col items-center justify-center">
        <div className="mt-6 flex h-[2.75rem] w-[19.875rem] items-center rounded-full bg-[#F9F9F9] px-5">
          <input
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="font-t2-14 flex-1 placeholder:text-neutral-500 focus:outline-none"
            placeholder="장학금명/기관명을 입력해주세요."
          />
          <button onClick={handleSearch}>
            <MainSearchIcon />
          </button>
        </div>
        <Image
          width={380}
          height={180}
          src={'/image/main-banner.png'}
          alt="메인 배너"
          className="mt-7 cursor-pointer"
          onClick={() => router.push('/info-list')}
        />
      </section>
      <section className="mt-7 w-full px-3.5">
        <div className="flex h-[2.5rem] w-full items-center justify-between">
          <p className="font-h5-17">장학금 공고 전체보기</p>
          {/* <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value as SortType)}
            className="font-t3-12"
          >
            <option value="popular">인기순</option>
            <option value="latest">최신순</option>
            <option value="recommended">추천순</option>
          </select> */}
        </div>
        <div className="flex-1">
          <ResultList
            scholarships={isExpanded ? scholarships : scholarships.slice(0, 5)}
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

        {isExpanded && hasNextPage && (
          <div ref={loaderRef} className="p-4 text-center">
            {isLoading && <p>로딩 중...</p>}
          </div>
        )}
        {isExpanded && !hasNextPage && scholarships.length > PAGE_SIZE && (
          <div className="p-4 text-center text-gray-500">
            <p>마지막 공고입니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
