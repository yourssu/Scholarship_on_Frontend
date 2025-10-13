export type RecruitmentStatus = 'recruiting' | 'scheduled' | 'completed';

/**
 * 날짜를 기반으로 현재 모집 상태를 반환합니다.
 * @param startDate - 모집 시작일 (YYYY-MM-DD)
 * @param endDate - 모집 종료일 (YYYY-MM-DD)
 * @returns {RecruitmentStatus} 'scheduled', 'recruiting', 또는 'finished'
 */
export const getRecruitmentStatus = (
  startDate: string,
  endDate: string,
): RecruitmentStatus => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 날짜의 시간 부분을 0으로 설정하여 날짜만 비교
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (today < start) {
    return 'scheduled'; // 모집예정
  } else if (today >= start && today <= end) {
    return 'recruiting'; // 모집중
  } else {
    return 'completed'; // 모집마감
  }
};

export const getStatusText = (status: RecruitmentStatus): string => {
  switch (status) {
    case 'recruiting':
      return '모집중';
    case 'scheduled':
      return '모집예정';
    case 'completed':
      return '모집완료';
    default:
      return '모집예정';
  }
};

export const getStatusColor = (status: RecruitmentStatus): string => {
  switch (status) {
    case 'recruiting':
      return '#4097F9';
    case 'scheduled':
      return '#7B7B7B';
    case 'completed':
      return '#87BFFA';
    default:
      return '#7B7B7B';
  }
};

/**
 * 날짜 문자열을 'YYYY.MM.DD.(요일)' 형태로 포맷합니다.
 */
export const formatDateWithDay = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  return `${year}.${month}.${day}.(${dayOfWeek})`;
};
