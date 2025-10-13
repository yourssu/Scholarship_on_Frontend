import apiClient from '@/api/api';
import type {
  ApiResponse,
  Scholarship,
  SuggestScholarshipsData,
  SearchScholarshipsData,
} from '@/api/types/scholarship';

interface ScholarshipListParams {
  page?: number;
  each?: number;
}

export const getScholarshipList = async ({
  page,
  each,
}: ScholarshipListParams = {}): Promise<ApiResponse<Scholarship[]>> => {
  const response = await apiClient.get('api/info', {
    searchParams: { page, each },
  });
  return response.json<ApiResponse<Scholarship[]>>();
};

export const getScholarshipTotalCount = async (): Promise<
  ApiResponse<number>
> => {
  const response = await apiClient.get('api/info/lenth');
  return response.json<ApiResponse<number>>();
};

interface SuggestScholarshipsParams {
  classOfSchool: string;
  majorOfSchool: string;
  location: string;
  levelOfIncome: string;
  grade: string;
  page?: number;
  each?: number;
}

export const getSuggestScholarships = async (
  params: SuggestScholarshipsParams,
): Promise<ApiResponse<SuggestScholarshipsData>> => {
  const { page = 0, each = 10, ...searchOptions } = params;
  const response = await apiClient.get('api/info/recommendation', {
    searchParams: { ...searchOptions, page, each },
  });
  return response.json<ApiResponse<SuggestScholarshipsData>>();
};

/**
 * 검색 API 파라미터 타입 정의
 */
interface SearchScholarshipsParams {
  keywords: string; // 필수 검색어
  page?: number;
  each?: number;
}

/**
 * 키워드를 기반으로 장학금을 검색합니다.
 * @param params - keywords, page, each
 * @returns 검색된 장학금 목록과 페이지네이션 정보
 */
export const searchScholarships = async (
  params: SearchScholarshipsParams,
): Promise<ApiResponse<SearchScholarshipsData>> => {
  // page와 each의 기본값을 설정합니다.
  const { keywords, page = 0, each = 10 } = params;

  const response = await apiClient.get('api/info/search', {
    searchParams: {
      keywords,
      page,
      each,
    },
  });

  return response.json<ApiResponse<SearchScholarshipsData>>();
};
