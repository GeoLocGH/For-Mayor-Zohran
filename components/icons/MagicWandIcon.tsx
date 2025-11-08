import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const MagicWandIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.118 2.25 2.25 0 0 1-2.475-2.118c0-.497.158-.957.44-1.332a3 3 0 0 0 5.78-1.128 2.25 2.25 0 0 1 2.475-2.118 2.25 2.25 0 0 1 2.475 2.118c0 .497-.158.957-.44 1.332z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.25 10.25 2.25 2.25m-2.25-2.25 2.25-2.25m0 0-2.25-2.25m2.25 2.25 2.25 2.25M15 4.5l1.546-.864a2.25 2.25 0 0 1 2.877 0L21 4.5m0 0 1.546.864a2.25 2.25 0 0 1 0 2.877l-1.06 1.837a2.25 2.25 0 0 1-2.877 0l-1.546-.864m0 0L15 4.5m6 0-3 5.197"
    />
  </svg>
);
