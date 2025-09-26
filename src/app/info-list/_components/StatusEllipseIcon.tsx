import { SVGProps } from 'react';

interface StatusEllipseIconProps extends SVGProps<SVGSVGElement> {}

export function StatusEllipseIcon({ fill, ...props }: StatusEllipseIconProps) {
  return (
    <svg
      width="5"
      height="5"
      viewBox="0 0 5 5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill={fill} />
    </svg>
  );
}
