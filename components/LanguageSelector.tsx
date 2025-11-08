import React from 'react';
import { useLocale, availableLanguages } from '../contexts/LocaleContext';
import { GlobeIcon } from './icons/GlobeIcon';

export const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value);
  };

  return (
    <div className="relative flex items-center">
      <GlobeIcon className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
      <select
        value={locale}
        onChange={handleLanguageChange}
        className="appearance-none w-full md:w-auto bg-slate-700 text-white text-sm font-semibold rounded-md pl-10 pr-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition cursor-pointer hover:bg-slate-600"
        aria-label="Select language"
      >
        {Object.entries(availableLanguages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Create a simple GlobeIcon for the language selector
const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
            d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.1 8.25 15 9.75M9 8.25c0 2.121.5 4.208 1.5 6.021M9 8.25a2.25 2.25 0 01-1.883-1.183l-3.26-5.433A2.25 2.25 0 003 3.75V4.5m12 12.75v-2.25c0-.921-.38-1.8-1.03-2.468-1.428-1.29-3.235-2.036-5.215-2.036H9m6 6.75v-2.25c0-.921.38-1.8 1.03-2.468 1.428-1.29 3.235-2.036 5.215-2.036H21m-3.334-5.25c.184.34.333.693.456 1.06l.66 2.115m-1.58 2.835a2.25 2.25 0 01-1.883-1.183l-3.26-5.433A2.25 2.25 0 009 3.75V4.5" 
        />
    </svg>
);
