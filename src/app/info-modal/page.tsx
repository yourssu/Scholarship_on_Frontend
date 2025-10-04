'use client';
import { useRouter } from 'next/navigation';
import { DetailDescription } from './_components/DetailDescription';
import { ShortDescription } from './_components/ScholarshipName';
import { Button, Header, NaviButton } from '@/components';

export default function InfoModalPage() {
  const router = useRouter();
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <div className="w-full">
        <Header
          rightElement={
            <NaviButton
              onRecommendClick={() => {
                router.push('/info-list');
              }}
              onMyClick={() => {
                router.push('/write-info');
              }}
            />
          }
        />
      </div>
      <div className="flex flex-col gap-10">
        <ShortDescription
          name={'소득연계형 국가장학금'}
          description={'소득연계형 국가장학금은 소득연계형 국가장학금입니다.'}
        />
        <DetailDescription
          title={'주관기관'}
          content={'한국 장학 재단'}
          extra_title={'서류 제출'}
          extra_content={'2025. 5. 23.(금) 9시 ~ 2025. 6. 30.(월) 18시'}
        />
      </div>
      <Button variant="primary" size="lg" showInfoText={true}>
        자세히 보러가기
      </Button>
    </div>
  );
}
