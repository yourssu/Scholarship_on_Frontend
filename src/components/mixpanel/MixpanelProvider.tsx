'use client';

import { initMixpanel } from '@/lib/mixpanelClient';
import { useEffect } from 'react';

export default function MixpanelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 앱이 마운트될 때 믹스패널 초기화
    initMixpanel();
  }, []);

  return <>{children}</>;
}
