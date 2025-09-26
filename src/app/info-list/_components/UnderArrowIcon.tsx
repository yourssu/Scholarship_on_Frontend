import { SVGProps } from 'react';

interface UnderArrowIconProps extends SVGProps<SVGSVGElement> {}

export function UnderArrowIcon({ fill, ...props }: UnderArrowIconProps) {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 1L9 9L1 1"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
