import mixpanel, { Dict, Mixpanel } from 'mixpanel-browser';

let isMixpanelInitialized = false;

export const initMixpanel = () => {
  if (typeof window !== 'undefined') {
    mixpanel.init('5e00eab31e7e6cec7242fba4445ef9f4', {
      debug: process.env.NODE_ENV !== 'production',
      track_pageview: false,
      persistence: 'localStorage',
    });
    isMixpanelInitialized = true;
  }
};

/**
 * 이벤트를 추적합니다.
 * @param eventName - 이벤트 이름
 * @param properties - 이벤트 속성 (선택 사항)
 */
export const trackEvent = (eventName: string, properties: Dict = {}) => {
  // 개발 환경에서는 데이터를 수집하지 않음
  // if (process.env.NODE_ENV !== 'production') {
  //   console.log('[Mixpanel DEV]', eventName, properties); // 개발용 콘솔 로그
  //   return;
  // }

  if (!isMixpanelInitialized) return;
  mixpanel.track(eventName, properties);
};

/**
 * 사용자 프로필 속성을 설정합니다. (Mixpanel의 People 탭)
 * @param properties - 설정할 사용자 속성
 */
export const setUserProperties = (properties: Dict) => {
  if (!isMixpanelInitialized) return;
  mixpanel.people.set(properties);
};

/**
 * 모든 이벤트에 포함될 공통 속성(Super Properties)을 등록합니다.
 * (예: 학력, 전공 등)
 * @param properties - 등록할 공통 속성
 */
export const setSuperProperties = (properties: Dict) => {
  if (!isMixpanelInitialized) return;
  mixpanel.register(properties);
};

/**
 * 사용자 프로필의 숫자형 속성을 증가시킵니다. (카운트 용도)
 * @param propertyName - 증가시킬 속성 이름
 * @param by - 증가시킬 값 (기본값: 1)
 */
export const incrementUserProperty = (propertyName: string, by: number = 1) => {
  if (!isMixpanelInitialized) return;
  mixpanel.people.increment(propertyName, by);
};
