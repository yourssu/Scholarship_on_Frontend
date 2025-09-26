import { ResultInfo } from '@/app/info-list/_components/ResultInfo';
import { ResultList } from '@/app/info-list/_components/ResultItem';
import { UnderArrowIcon } from './_components/UnderArrowIcon';

export default function InfoListPage() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <div className="w-full">
        <div>{/*헤더가 들어갑니다*/}</div>
        <div className="w-full justify-self-start">
          <ResultInfo num={251} />
        </div>
      </div>
      <ResultList
        title={'소득연계형 국가장학금'}
        recruitmentStatus={'recruiting'}
        facility={'한국장학재단'}
      />
      <div className="flex h-full w-full justify-center pt-14">
        <UnderArrowIcon fill="#7B7B7B" />
      </div>
    </div>
  );
}
