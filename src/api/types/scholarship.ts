export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

export interface Scholarship {
  번호: string;
  운영기관명: string;
  상품명: string;
  운영기관구분: string;
  상품구분: string;
  학자금유형구분: string;
  대학구분: string;
  학년구분: string;
  학과구분: string;
  '성적기준 상세내용': string;
  '소득기준 상세내용': string;
  '지원내역 상세내용': string;
  '특정자격 상세내용': string;
  '지역거주여부 상세내용': string;
  '선발방법 상세내용': string;
  '선발인원 상세내용': string;
  '자격제한 상세내용': string;
  '추천필요여부 상세내용': string;
  '제출서류 상세내용': string;
  '홈페이지 주소': string;
  모집시작일: string;
  모집종료일: string;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SuggestScholarshipsData {
  scholarships: Scholarship[];
  pagination: PaginationInfo;
}

export interface SearchScholarshipsData {
  scholarships: Scholarship[];
  pagination: PaginationInfo;
}

export interface UserInfo {
  school: string;
  classOfSchool: string;
  majorOfSchool: string;
  location: string;
  levelOfIncome: string;
  grade: string;
}
