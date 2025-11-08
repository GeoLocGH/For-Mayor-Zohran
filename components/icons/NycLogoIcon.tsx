import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const NycLogoIcon: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="100" height="100" rx="20" ry="20" fill="#f97316" />
    <text
      x="50%"
      y="22%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontWeight="900"
      fontFamily="sans-serif"
      letterSpacing="-1"
    >
      NEW
    </text>
    <text
      x="50%"
      y="41%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontWeight="900"
      fontFamily="sans-serif"
      letterSpacing="-1"
    >
      YORK
    </text>
    <text
      x="50%"
      y="60%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontWeight="900"
      fontFamily="sans-serif"
      letterSpacing="-1"
    >
      MAYOR
    </text>
    <text
      x="50%"
      y="79%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontWeight="900"
      fontFamily="sans-serif"
      letterSpacing="-1"
    >
      ZOHRAN
    </text>
  </svg>
);
