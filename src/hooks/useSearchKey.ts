import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

interface UseSearchKeyProps {
  initialSearchKeyword?: string;
}

export const useSearchKey = ({
  initialSearchKeyword = '',
}: UseSearchKeyProps = {}) => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] =
    useState<string>(initialSearchKeyword);

  const handleSearch = () => {
    if (searchKeyword.trim() !== '') {
      router.push(
        `/search-list?keyword=${encodeURIComponent(searchKeyword.trim())}`,
      );
    } else {
      alert('검색어를 입력해주세요.');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return {
    searchKeyword,
    setSearchKeyword,
    handleKeyDown,
    handleSearch,
  };
};
