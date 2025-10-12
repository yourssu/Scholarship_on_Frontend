'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Header, NaviButton } from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { MainSearchIcon } from '../_components/icon/MainSearchIcon';
import { useSearchKey } from '@/hooks/useSearchKey';
import { ResultList } from '../info-list/_components/ResultItem';
import { Scholarship } from '@/api/types/scholarship';
import { HTTPError } from 'ky';
import { searchScholarships } from '@/api/scholarshipAPI';

const PAGE_SIZE = 15;

export default function SearchListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchKeyword = searchParams.get('keyword') ?? '';

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태는 true
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // 검색 결과 총 개수
  const loaderRef = useRef<HTMLDivElement>(null);

  const { searchKeyword, setSearchKeyword, handleKeyDown, handleSearch } =
    useSearchKey({ initialSearchKeyword });

  const loadMoreResults = useCallback(async () => {
    // 키워드가 없거나, 로딩 중이거나, 마지막 페이지면 중단
    if (!initialSearchKeyword || isLoading || !hasNextPage) return;
    setIsLoading(true);

    try {
      const response = await searchScholarships({
        keywords: initialSearchKeyword,
        page,
        each: PAGE_SIZE,
      });

      if (response.success) {
        setScholarships(prev => [...prev, ...response.data.scholarships]);
        setPage(prev => prev + 1);
        setTotalCount(response.data.pagination.totalCount); // 총 개수 업데이트
        setHasNextPage(response.data.pagination.hasNext); // 다음 페이지 여부 업데이트
      }
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        console.error('검색어 없음 에러:', error);
      } else {
        console.error('검색 데이터를 불러오는 데 실패했습니다.', error);
      }
      setHasNextPage(false); // 에러 발생 시 더 이상 로드하지 않도록 설정
    } finally {
      setIsLoading(false);
    }
  }, [initialSearchKeyword, page, isLoading, hasNextPage]);

  useEffect(() => {
    // keyword가 변경되면 모든 상태를 초기화
    setScholarships([]);
    setPage(0);
    setHasNextPage(true);
    setTotalCount(0);
    setIsLoading(true); // 새로운 검색 시작이므로 로딩 상태로 변경

    // 즉시 첫 페이지 로드 함수를 호출합니다.
    // useCallback으로 생성된 함수이므로 직접 호출해도 안전합니다.
    if (initialSearchKeyword) {
      searchScholarships({
        keywords: initialSearchKeyword,
        page: 0,
        each: PAGE_SIZE,
      })
        .then(response => {
          if (response.success) {
            setScholarships(response.data.scholarships);
            setPage(1);
            setTotalCount(response.data.pagination.totalCount);
            setHasNextPage(response.data.pagination.hasNext);
          }
        })
        .catch(error => {
          console.error('초기 검색 실패:', error);
          setHasNextPage(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [initialSearchKeyword]);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreResults();
        }
      },
      { threshold: 1.0 },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasNextPage, loadMoreResults]);

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
            className="font-t2-14 flex-1 placeholder:text-neutral-500 focus:outline-none"
            placeholder="장학금명/기관명을 입력해주세요."
          />
          <button onClick={handleSearch}>
            <MainSearchIcon />
          </button>
        </div>
      </section>
      <section>
        {isLoading && scholarships.length === 0 ? (
          <p className="font-h3-18 mt-10 text-center">검색 중...</p>
        ) : !isLoading && totalCount === 0 ? (
          // 검색 결과가 없을 때
          <div className="font-h3-18 flex flex-col items-center justify-center pt-20 text-center">
            <p className="text-neutral-800">검색 결과가 없어요</p>
            <p className="text-neutral-500">다른 키워드로 검색해보세요!</p>
          </div>
        ) : (
          // 검색 결과가 있을 때
          <div className="px-4">
            <ResultList scholarships={scholarships} />

            {hasNextPage && (
              <div ref={loaderRef} className="p-4 text-center">
                {isLoading && <p>로딩 중...</p>}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
