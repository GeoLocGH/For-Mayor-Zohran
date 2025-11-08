import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ThumbsUpIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      d="M9 14.5a1 1 0 001 1h6.838a1 1 0 00.99-1.162l-1-5.25a1 1 0 00-.99-.838H15v-3a1 1 0 00-1-1h-2.5a1 1 0 00-1 1v3H9.462a1 1 0 00-.99 1.162l1 5.25z"
    />
    <path
      d="M6.5 5.5a1 1 0 00-1 1v4a1 1 0 001 1h1V5.5h-1z"
    />
  </svg>
);
