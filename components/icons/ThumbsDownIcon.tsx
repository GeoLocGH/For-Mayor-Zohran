import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ThumbsDownIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      d="M11 5.5a1 1 0 00-1-1H3.162a1 1 0 00-.991.838l-1 5.25a1 1 0 00.99 1.162H5v3a1 1 0 001 1h2.5a1 1 0 001-1v-3h1.538a1 1 0 00.99-1.162l-1-5.25z"
    />
    <path
      d="M13.5 12.5a1 1 0 001-1v-4a1 1 0 00-1-1h-1v6h1z"
    />
  </svg>
);
