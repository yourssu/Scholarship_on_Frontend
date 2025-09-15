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
    <html lang="en" className={pretendard.variable}>
      <body className={`${pretendard.className} antialiased`}>{children}</body>
    </html>
  );
}
