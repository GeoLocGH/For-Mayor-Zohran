import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ViewfinderCircleIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M21 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12.75 3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12.75 21a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 8.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" 
    />
  </svg>
);