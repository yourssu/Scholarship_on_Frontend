import {
  RecruitmentStatus,
  getStatusText,
  getStatusColor,
} from '../_utils/recruitmentUtils';
import { StatusEllipseIcon } from './StatusEllipseIcon';

interface ResultListProp {
  title: string;
  recruitmentStatus: RecruitmentStatus;
  facility: string;
  isExpanded?: boolean;
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

export function ResultItem({
  title,
  recruitmentStatus,
  facility,
}: ResultListProp) {
  return (
    <div className="] flex h-[3rem] w-full items-center justify-between border-b-[0.03125rem] border-[#7B7B7B] text-left text-[0.875rem] leading-[1rem] font-normal tracking-[-0.0256rem] text-black">
      <div className="mx-auto flex justify-center">{title}</div>
      <div className="flex justify-between">
        <div className="mx-auto flex w-28 items-center justify-center">
          {facility}
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
    </div>
  );
}

export function ResultList({
  title,
  recruitmentStatus,
  facility,
  isExpanded = false,
}: ResultListProp) {
  const items = Array.from({ length: 11 }, (_, index) => (
    <ResultItem
      key={index}
      title={title || '소득연계형 국가장학금'}
      recruitmentStatus={recruitmentStatus || 'recruiting'}
      facility={facility || '한국장학재단'}
    />
  ));

  return (
    <div className="mt-6 flex h-full w-full flex-col self-start">
      <div className="flex-shrink-0">
        <ResultListHeader />
      </div>
      <div
        className={`transition-all duration-300 ${
          isExpanded
            ? 'overflow-y-auto'
            : 'max-h-[calc(100vh-300px)] overflow-hidden'
        }`}
      >
        {items}
      </div>
    </div>
  );
}
