'use client';
import { Header, NaviButton } from '@/components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <div className="w-full">
        <Header
          rightElement={
            <NaviButton
              onMyClick={() => {
                router.push('/write-info');
              }}
            />
          }
        />
      </div>
      장학온
    </div>
  );
}
