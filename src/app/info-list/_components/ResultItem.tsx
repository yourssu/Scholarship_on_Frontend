import { Scholarship } from '@/api/types/scholarship';
import {
  getStatusText,
  getStatusColor,
  getRecruitmentStatus,
} from '../_utils/recruitmentUtils';
import { StatusEllipseIcon } from './StatusEllipseIcon';

interface ResultItemProps {
  item: Scholarship;
  onClick?: (item: Scholarship) => void;
}

interface ResultListProps {
  scholarships: Scholarship[];
  onItemClick?: (item: Scholarship) => void;
}

export function ResultListHeader() {
  return (
    <div className="font-pretendard flex h-[1.875rem] w-full items-center justify-between border-b-[0.0625rem] border-[#191919] text-left text-[0.875rem] leading-[1.5625rem] font-semibold tracking-[-0.0256rem] text-black">
      <div className="mx-auto flex justify-center">장학금명</div>
      <div className="flex justify-between">
        <div className="mx-auto flex w-28 justify-center">기관명</div>
        <div className="mx-auto flex w-16 justify-center">모집현황</div>
      </div>
    </div>
  );
}

export function ResultItem({ item, onClick }: ResultItemProps) {
  const recruitmentStatus = getRecruitmentStatus(
    item.모집시작일,
    item.모집종료일,
  );

  return (
    <button
      onClick={() => onClick?.(item)}
      disabled={!onClick}
      className="flex h-[3rem] w-full items-center justify-between border-b-[0.03125rem] border-[#7B7B7B] text-left text-[0.875rem] leading-[1rem] font-normal tracking-[-0.0256rem] text-black"
    >
      <div className="mx-auto flex justify-center">
        <p className="line-clamp-1">{item.상품명}</p>
      </div>
      <div className="flex justify-between">
        <div className="mx-auto flex w-28 items-center justify-center">
          <p className="line-clamp-1">{item.운영기관명}</p>
        </div>
        <div
          className="mx-auto flex w-16 items-center justify-center gap-0.5 pr-[0.25rem] text-[0.75rem] leading-[1.5625rem] font-medium"
          style={{ color: getStatusColor(recruitmentStatus) }}
        >
          <StatusEllipseIcon fill={getStatusColor(recruitmentStatus)} />
          &nbsp;
          {getStatusText(recruitmentStatus)}
        </div>
      </div>
    </button>
  );
}

export function ResultList({ scholarships, onItemClick }: ResultListProps) {
  return (
    <div className="mt-6 flex h-full w-full flex-col self-start">
      <div className="flex-shrink-0">
        <ResultListHeader />
      </div>
      <div>
        {scholarships.map(item => (
          <ResultItem key={item.번호} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}
