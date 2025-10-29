'use client';

import { Header } from '@/components';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import WriteInfoItem from './_components/WriteInfoItem';
import WriteInfoInput from './_components/WriteInfoInput';
import WriteInfoSelect from './_components/WriteInfoSelect';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/api/types/scholarship';

const formFields: {
  key: keyof UserInfo;
  label: string;
  type: 'text' | 'select';
  placeholder?: string;
  description?: React.ReactNode;
  options?: string[];
}[] = [
  {
    key: 'school',
    label: '학교',
    type: 'text',
    placeholder: '현재 재학중인 학교명을 입력해주세요!',
  },
  {
    key: 'classOfSchool',
    label: '학년',
    type: 'select',
    options: [
      '학년 정보를 선택 해주세요!',
      '1학년',
      '2학년',
      '3학년',
      '4학년',
      '기타',
    ],
  },
  {
    key: 'majorOfSchool',
    label: '전공 계열',
    type: 'select',
    options: [
      '전공계열을 선택 해주세요!',
      '공학계열',
      '교육계열',
      '사회계열',
      '예체능계열',
      '의약계열',
      '인문계열',
      '자연계열',
      '제한없음',
    ],
  },
  {
    key: 'location',
    label: '거주지역',
    type: 'text',
    placeholder: '현재 거주하시는 지역을 입력해주세요! (ex 서울시)',
  },
  {
    key: 'levelOfIncome',
    label: '소득분위',
    type: 'select',
    options: [
      '소득분위를 선택 해주세요!',
      ...Array.from({ length: 10 }, (_, i) => `${i + 1}분위`),
    ],
    description: (
      <>
        ※ 소득분위는{' '}
        <a
          href="https://www.kosaf.go.kr/ko/main.do"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          한국장학재단 홈페이지
        </a>
        에서 확인 가능합니다!
      </>
    ),
  },
  {
    key: 'grade',
    label: '성적',
    type: 'text',
    placeholder: '직전학기의 성적을 입력해주세요!',
  },
];

const USER_INFO_KEYS = formFields.map(field => field.key);

export default function WriteInfoPage() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    school: '',
    classOfSchool: '',
    majorOfSchool: '',
    location: '',
    levelOfIncome: '',
    grade: '',
  });
  const [agreements, setAgreements] = useState({
    personalInfo: false,
    termsOfService: false,
    sensitiveInfo: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [agreementError, setAgreementError] = useState<string>('');

  // isDataSaved: 로컬스토리지에 데이터가 저장되어 있는지 여부
  // isEditMode: 저장된 데이터를 수정하는 모드인지 여부
  const [isDataSaved, setIsDataSaved] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

  useEffect(() => {
    const savedUserInfo: Partial<UserInfo> = {};
    let allDataExists = true;

    USER_INFO_KEYS.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        savedUserInfo[key] = value;
      } else {
        allDataExists = false;
      }
    });

    if (allDataExists) {
      setUserInfo(savedUserInfo as UserInfo);
      setIsDataSaved(true);
      setIsEditMode(false); // 처음에는 보기 모드로
    } else {
      setIsDataSaved(false);
      setIsEditMode(true); // 데이터가 없으면 바로 입력 모드로
    }
  }, []);

  const validate = () => {
    const newErrors: Partial<Record<keyof UserInfo, string>> = {};
    let isValid = true;

    Object.entries(userInfo).forEach(([key, value]) => {
      if (!value.trim()) {
        const field = formFields.find(f => f.key === key);
        newErrors[key as keyof UserInfo] = `${field?.label}을(를) 입력해주세요`;
        isValid = false;
      }
    });

    if (!isDataSaved) {
      if (
        !agreements.personalInfo ||
        !agreements.termsOfService ||
        !agreements.sensitiveInfo
      ) {
        setAgreementError('모든 약관에 동의해주세요.');
        isValid = false;
      } else {
        setAgreementError('');
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveAndNavigate = () => {
    if (!validate()) return;

    USER_INFO_KEYS.forEach(key => {
      localStorage.setItem(key, userInfo[key]);
    });

    router.push('/info-list');
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleLogout = () => {
    USER_INFO_KEYS.forEach(key => {
      localStorage.removeItem(key);
    });
    setIsDataSaved(false);
    setIsEditMode(true);
    setUserInfo({
      school: '',
      classOfSchool: '',
      majorOfSchool: '',
      location: '',
      levelOfIncome: '',
      grade: '',
    });
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 1. userInfo 객체의 모든 값이 비어있지 않은지 확인
  const isFormFilled = Object.values(userInfo).every(
    value => value.trim() !== '',
  );
  // 2. agreements 객체의 모든 값이 true인지 확인
  const areAgreementsChecked =
    isDataSaved || Object.values(agreements).every(checked => checked);
  // 3. 위 두 조건이 모두 충족되지 않으면 버튼을 비활성화
  const isButtonDisabled = !isFormFilled || !areAgreementsChecked;

  if (isDataSaved && !isEditMode) {
    return (
      <section className="flex h-screen flex-col justify-center">
        <Image
          width={114}
          height={114}
          src={'/image/scholar_logo.png'}
          alt="로고 이미지"
          className="mx-auto mb-10 cursor-pointer"
          onClick={() => router.push('/')}
        />
        <div className="flex flex-col gap-3 px-8">
          {formFields.map(field => (
            <WriteInfoItem
              key={field.key}
              category={field.label}
              value={userInfo[field.key]}
            />
          ))}
        </div>
        <div className="mt-4 px-8 text-center text-sm text-gray-500">
          <button onClick={handleEdit} className="hover:underline">
            정보 수정
          </button>
          <span className="mx-2">|</span>
          <button onClick={handleLogout} className="hover:underline">
            로그아웃
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <section className="mt-7 w-full px-10">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-h5-17">내 정보 입력</h1>
          <p className="font-t1-14-semibold text-neutral-500">
            정보를 입력하고 지원 가능한 장학금을 확인해보세요!
          </p>
        </div>

        {formFields.map(field =>
          field.type === 'select' ? (
            <WriteInfoSelect
              key={field.key}
              category={field.label}
              value={userInfo[field.key]}
              onChange={v => setUserInfo(prev => ({ ...prev, [field.key]: v }))}
              error={errors[field.key]}
              options={field.options}
              description={field.description}
            />
          ) : (
            <WriteInfoInput
              key={field.key}
              category={field.label}
              value={userInfo[field.key]}
              onChange={v => setUserInfo(prev => ({ ...prev, [field.key]: v }))}
              error={errors[field.key]}
              placeholder={field.placeholder}
              description={field.description}
            />
          ),
        )}

        {/* 개인정보 수집 동의 */}
        {!isDataSaved && (
          <div className="mt-10">
            <h2 className="font-h5-17">개인정보 수집 및 이용 동의</h2>
            <p className="font-t3-12 mt-3">
              입력하신 개인정보는 맞춤형 장학금 공고 추천을 위해서만 사용되며,
              이용자님의 웹 브라우저에만 저장됩니다.
            </p>

            <div className="mt-[1.375rem] flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={agreements.personalInfo}
                  onChange={() => handleAgreementChange('personalInfo')}
                />{' '}
                개인정보 수집 및 이용에 동의합니다.
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={agreements.termsOfService}
                  onChange={() => handleAgreementChange('termsOfService')}
                />{' '}
                이용약관에 동의합니다.
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={agreements.sensitiveInfo}
                  onChange={() => handleAgreementChange('sensitiveInfo')}
                />{' '}
                민감정보 수집 및 이용에 동의합니다.
              </div>
            </div>

            <div className="font-t2-14 text-primary-500 mt-[1.375rem] flex flex-col">
              <a href="https://usaint.ddns.net/common/privacy" target="_blank">
                [개인정보처리방침 전체보기]
              </a>
              <a href="https://usaint.ddns.net/common/term" target="_blank">
                [이용약관 전체보기]
              </a>
              <a href="https://usaint.ddns.net/common/sensitive">
                [민감정보 이용약관 전체보기]
              </a>
            </div>

            {agreementError && (
              <p className="font-t3-12 mt-1 text-red-500">{agreementError}</p>
            )}
          </div>
        )}
      </section>

      {/* 완료 버튼 */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4">
        <button
          onClick={handleSaveAndNavigate}
          className="h-12 w-full rounded-lg bg-blue-500 font-bold text-white disabled:bg-neutral-300"
          disabled={isButtonDisabled}
        >
          {isDataSaved ? '수정 완료' : '입력 완료'}
        </button>
      </div>
    </div>
  );
}
