'use client';
import { useRouter } from 'next/navigation';
import { Scholarship } from '@/api/types/scholarship';
import { Button, Header, NaviButton } from '@/components';
import { formatDateWithDay } from '../info-list/_utils/recruitmentUtils';
import { DetailDescription } from '../info-modal/_components/DetailDescription';
import { ShortDescription } from '../info-modal/_components/ScholarshipName';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship;
  onClose: () => void;
}

// TODO: 개별 데이터 조회 API 구현 후 페이지로 변경
export default function ScholarshipDetailModal({
  scholarship,
  onClose,
}: ScholarshipDetailModalProps) {
  const router = useRouter();

  const applicationPeriod = `${formatDateWithDay(scholarship.모집시작일)} ~ ${formatDateWithDay(scholarship.모집종료일)}`;

  const eligibilityContent = (
    <div className="flex flex-col text-black">
      <span>자격제한: {scholarship['자격제한 상세내용']}</span>
      <br />
      <span>추천필요여부: {scholarship['추천필요여부 상세내용']}</span>
      <br />
      <span>지역거주여부: {scholarship['지역거주여부 상세내용']}</span>
      <br />
      <span>{scholarship['특정자격 상세내용']}</span>
    </div>
  );

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}
    >
      {/* 모달 컨텐츠 (이벤트 버블링 방지) */}
      <div
        className="relative h-full w-full max-w-2xl overflow-y-auto bg-white"
        onClick={e => e.stopPropagation()}
      >
        <Header
          rightElement={
            <NaviButton
              onRecommendClick={() => router.push('/info-list')}
              onMyClick={() => router.push('/write-info')}
            />
          }
        />

        <div className="flex flex-col gap-10 px-8">
          {/* [수정] description prop 제거 */}
          <ShortDescription name={scholarship.상품명} />

          {/* [수정] 데이터 매핑 */}
          <DetailDescription
            title={'주관 기관'}
            content={scholarship.운영기관명}
          />
          <DetailDescription
            title={'신청 일정'}
            content={applicationPeriod}
            extra_content={scholarship['제출서류 상세내용']}
          />
          <DetailDescription title={'지원자격'} content={eligibilityContent} />
          <DetailDescription
            title={'장학혜택'}
            content={scholarship['지원내역 상세내용']}
          />
        </div>

        <div className="mt-16 px-8 pb-8 text-center">
          {/* [수정] 새 창으로 홈페이지 열기 */}
          <a
            href={scholarship['홈페이지 주소']}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" showInfoText={true}>
              자세히 보러가기
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
