'use client';

import { ResultInfo } from '@/app/info-list/_components/ResultInfo';
import { ResultList } from '@/app/info-list/_components/ResultItem';
import { UnderArrowIcon } from './_components/UnderArrowIcon';
import { Header, NaviButton } from '@/components';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Scholarship, UserInfo } from '@/api/types/scholarship';
import { getSuggestScholarships } from '@/api/scholarshipAPI';
import ScholarshipDetailModal from '../_components/ScholarshipDetailModal';
import { setUserProperties, trackEvent } from '@/lib/mixpanelClient';

const PAGE_SIZE = 12;
const PREVIEW_SIZE = 11;

const USER_INFO_KEYS: (keyof UserInfo)[] = [
  'school',
  'classOfSchool',
  'majorOfSchool',
  'location',
  'levelOfIncome',
  'grade',
];

export default function InfoListPage() {
  const router = useRouter();

  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [isExpanded, setIsExpanded] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreScholarships = useCallback(
    async (currentPage: number) => {
      // 함수 호출 시 로컬 스토리지에서 직접 사용자 정보를 읽어옴
      const userInfo: Partial<UserInfo> = {};
      USER_INFO_KEYS.forEach(key => {
        userInfo[key] = localStorage.getItem(key) ?? undefined;
      });

      // 로딩 중이거나, 다음 페이지가 없으면 중단
      if (isLoading || !hasNextPage) return;
      setIsLoading(true);

      try {
        // console.log('API 요청 시작, 페이지:', currentPage);

        const response = await getSuggestScholarships({
          ...(userInfo as UserInfo),
          page: currentPage,
          each: PAGE_SIZE,
        });

        if (response.success) {
          setScholarships(prev => [...prev, ...response.data.scholarships]);
          setPage(prev => prev + 1);

          // 첫 페이지 로딩 시에만 totalCount를 설정
          if (currentPage === 0) {
            const count = response.data.pagination.totalCount;

            setTotalCount(count);

            setUserProperties({ recommended_scholarship_count: count });
          }
          setHasNextPage(response.data.pagination.hasNext);
        }
      } catch (error) {
        console.error('추천 장학금 데이터를 불러오는 데 실패했습니다.', error);
        setHasNextPage(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasNextPage],
  );

  useEffect(() => {
    // 이미 데이터 로딩이 시작되었으면 다시 실행하지 않음
    if (scholarships.length > 0) return;

    // 페이지 접근 권한 확인
    const hasAllInfo = USER_INFO_KEYS.every(key => localStorage.getItem(key));
    if (!hasAllInfo) {
      alert('정보입력 후 이용 가능한 페이지입니다.');
      router.replace('/write-info');
      return; // 리디렉션 후 함수 종료
    }

    // 초기 데이터 로딩 (첫 페이지, page: 0)
    loadMoreScholarships(0);
  }, [router, scholarships.length, loadMoreScholarships]);

  useEffect(() => {
    if (!isExpanded || !hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreScholarships(page); // 현재 page 상태를 인자로 전달
        }
      },
      { threshold: 1.0 },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [isExpanded, hasNextPage, isLoading, page, loadMoreScholarships]);

  // --- 브라우저 뒤로가기 버튼 감지 ---
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '') {
        setSelectedScholarship(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // --- 모달 열기 핸들러 ---
  const handleItemClick = (item: Scholarship) => {
    trackEvent('clicked_detail_list', {
      scholarship_id: item.번호,
      scholarship_organization: item.운영기관명,
    });

    setSelectedScholarship(item);
    window.location.hash = 'detail'; // URL에 #detail 해시 추가
  };

  // --- 모달 닫기 핸들러 ---
  const handleCloseModal = useCallback(() => {
    setSelectedScholarship(null);
    // URL 해시가 있으면 뒤로가기로 제거, 없으면 아무것도 안 함
    if (window.location.hash === '#detail') {
      router.back();
    }
  }, [router]);

  return (
    <div
      className={`flex grid-rows-[20px_1fr_20px] py-2 font-sans transition-all duration-300 ${
        isExpanded ? 'min-h-screen flex-col' : 'h-[100dvh] flex-col'
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
        <div className="w-full justify-self-start px-8">
          <ResultInfo num={totalCount} />
        </div>
      </div>

      <div className="flex-1 px-8">
        <ResultList
          scholarships={
            isExpanded ? scholarships : scholarships.slice(0, PREVIEW_SIZE)
          }
          onItemClick={handleItemClick}
        />
      </div>

      {isExpanded && hasNextPage && (
        <div ref={loaderRef} className="p-4 text-center">
          {isLoading && scholarships.length > 0 && <p>로딩 중...</p>}
        </div>
      )}

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

      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
