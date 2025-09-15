# 장학온 프론트엔드

## 프로젝트 세팅 과정

### 기술 스택

[선택한 기술 스택]

- Next.js
- TypeScript
- TanStack Query

패키지 매니저: pnpm

우선 Next.js를 선택한 이유는 장학금의 정보를 보여주는 서비스이기에 SEO 측면에서 이점을 가지고 있어야 한다고 생각했고, 이후에 SEO 작업을 하는 과정에서 SSR을 편리하게 이용하고자 `Next.js`를 선택했습니다. 그리고 검색에 따라 데이터 페칭을 조건에 맞게 그리고 빠르게 해주어야 하기에 `TanStack Query`를 이용하기로 결정했습니다. 추가적으로 페칭된 데이터의 타입 보장을 위해 `zod`도 함께 사용할 예정입니다.

### 세팅 과정

```bash

pnpm create next-app@latest

```

아직 무결성이 보장되지 않은 Turbopack 제외 모두 Yes로 설정

- 여기서 Next.js는 app 라우터를 지원해주고 있고, 이에 따라 라우팅을 하는 방식을 미리 알면 좋을 것 같습니다. app 하위에 생성한 폴더가 경로 이름이 되고, 폴더 내부에 page.tsx 파일을 만들면 해당 파일이 경로로 들어가면 보여주는 화면이 됩니다. 기본적인 페이지 구조에 맞춰 초기 설계를 해 둔 상태니 해당 글을 참고하여 확인하면 좋을것 같아요 :)

---

**eslint와 prettier 설정**

- eslint의 포맷팅 기능과 prettier의 설정 충돌을 막기 위해 `eslint-config-prettier` 패키지 설치 후 적용(extends에 'prettier' 추가)

```bash
pnpm add -D prettier eslint-config-prettier
```

```js
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];

export default eslintConfig;
```

<br />

- tailwind CSS를 편하게 쓰기 위해 tailwind 클래스를 정렬해 주는 라이브러리 설치

```zsh
pnpm add -D prettier-plugin-tailwindcss
```

.prettierrc

```json
{
  // ...
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

<br />

---

**폰트 설정**

1. 공식 깃허브에서 PretendardVariable.woff2 파일 다운로드

링크: https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2

2. app/layout.tsx에 등록

```tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '장학온',
  description:
    '사용자에게 맞는 장학금 정보를 빠르게 탐색할 수 있도록 도와주는 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

**타이포와 폰트 디자인 시스템 적용**

미리 정의된 폰트와 컬러 팔레트 정의

- 컬러 팔레트는 foundation에 제대로 적용되지 않은 상태라 사용하고 있는 색만 지정
  - primary-100 #87BFFA
  - primary-500 #4097F9

- Text
  - H1-22
  - H2-20
  - H3-18
  - H4-18
  - H5-17
  - T1-14
  - T2-14
  - T3-12

```css
@utility font-h1-22 {
  font-weight: 700;
  font-size: 1.375rem; /* font-size: 22px → 1.375rem */
  line-height: 1.5625rem; /* line-height: 25px → 1.5625rem */
  letter-spacing: -0.0186em; /* letter-spacing: -0.41px (font-size 22px 기준) → -0.0186em */
}
@utility font-h2-20 {
  font-weight: 700;
  font-size: 1.25rem; /* font-size: 20px → 1.25rem  (20 ÷ 16 = 1.25) */
  line-height: 1.25rem; /* line-height: 20px → 1.25rem */
  letter-spacing: -0.0205em; /* letter-spacing: -0.41px → -0.0205em  (-0.41 ÷ 20 ≈ -0.0205) */
}
@utility font-h3-18 {
  font-weight: 600;
  font-size: 1.125rem; /* font-size: 18px → 1.125rem (18 ÷ 16 = 1.125) */
  line-height: 1.2; /* line-height: 120% → 1.2 (unitless가 권장, 폰트 크기 기준 비율) */
  letter-spacing: -0.05em; /* letter-spacing: -5% → -0.05em (글자 크기의 -5%) */
}
@utility font-h4-18 {
  font-weight: 500;
  font-size: 1.125rem; /* font-size: 18px → 1.125rem (18 ÷ 16 = 1.125) */
  line-height: 1.25rem; /* line-height: 20px → 1.25rem (20 ÷ 16 = 1.25) */
  letter-spacing: -0.0228em; /* letter-spacing: -0.41px → -0.0228em (-0.41 ÷ 18 ≈ -0.0228) */
}
@utility font-h5-17 {
  font-weight: 600;
  font-size: 1.0625rem;
  line-height: 1.5625rem;
  letter-spacing: -0.0241em;
}

@utility font-t1-14 {
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: -0.0293em;
}
@utility font-t2-14 {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5625rem;
  letter-spacing: -0.0293em;
}
@utility font-t3-12 {
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.5625rem;
  letter-spacing: -0.0342em;
}

/* ... */

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary-100: #87bffa;
  --color-primary-500: #4097f9;
}
```

---

## 브랜치 전략

- main과 develop은 서로 rebase
- develop에서 feature 브랜치를 파서 작업을 한 후 squash merge로 develop에 머지 

