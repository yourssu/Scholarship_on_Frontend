import { ResultInfo } from '@/app/info-list/_components/ResultInfo';
import { ResultList } from '@/app/info-list/_components/ResultItem';

export default function InfoListPage() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <ResultInfo num={251} />
      <ResultList
        title={'소득연계형 국가장학금'}
        recruitmentStatus={'recruiting'}
        facility={'한국장학재단'}
      />
    </div>
  );
}
