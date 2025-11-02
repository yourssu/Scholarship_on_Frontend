// src/app/search-list/SearchResults.tsx

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Scholarship } from '@/api/types/scholarship';
import { searchScholarships } from '@/api/scholarshipAPI';
import { ResultList } from '@/app/info-list/_components/ResultItem';
import ScholarshipDetailModal from '@/app/_components/ScholarshipDetailModal';
import { trackEvent } from '@/lib/mixpanelClient';

const PAGE_SIZE = 15;

export default function SearchResults() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';

  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  // --- 모달 관련 핸들러 및 Effect 추가 ---
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '') setSelectedScholarship(null);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleItemClick = (item: Scholarship) => {
    trackEvent('clicked_detail_list', {
      scholarship_id: item.번호,
      scholarship_organization: item.운영기관명,
    });

    setSelectedScholarship(item);
    window.location.hash = 'detail';
  };

  const handleCloseModal = useCallback(() => {
    setSelectedScholarship(null);
    if (window.location.hash === '#detail') router.back();
  }, [router]);

  const loadMoreResults = useCallback(async () => {
    if (!keyword || isLoading || !hasNextPage) return;
    setIsLoading(true);

    try {
      const response = await searchScholarships({
        keywords: keyword,
        page,
        each: PAGE_SIZE,
      });
      if (response.success) {
        setScholarships(prev => [...prev, ...response.data.scholarships]);
        setPage(prev => prev + 1);
        setTotalCount(response.data.pagination.totalCount);
        setHasNextPage(response.data.pagination.hasNext);
      }
    } catch (error) {
      console.error('검색 데이터를 불러오는 데 실패했습니다.', error);
      setHasNextPage(false);
    } finally {
      setIsLoading(false);
    }
  }, [keyword, page, isLoading, hasNextPage]);

  useEffect(() => {
    setScholarships([]);
    setPage(0);
    setHasNextPage(true);
    setTotalCount(0);
    setIsLoading(true);

    if (keyword) {
      searchScholarships({ keywords: keyword, page: 0, each: PAGE_SIZE })
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
  }, [keyword]);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMoreResults();
      },
      { threshold: 1.0 },
    );
    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasNextPage, isLoading, loadMoreResults]);

  // --- 렌더링 로직 ---
  if (isLoading && scholarships.length === 0) {
    return <p className="font-h3-18 mt-10 text-center">검색 중...</p>;
  }

  if (!isLoading && totalCount === 0) {
    return (
      <div className="font-h3-18 flex flex-col items-center justify-center pt-20 text-center">
        <p className="text-neutral-800">검색 결과가 없어요</p>
        <p className="text-neutral-500">다른 키워드로 검색해보세요!</p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <ResultList scholarships={scholarships} onItemClick={handleItemClick} />
      {hasNextPage && (
        <div ref={loaderRef} className="p-4 text-center">
          {isLoading && <p>로딩 중...</p>}
        </div>
      )}

      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
