import React from 'react';
import { useLocale } from '../contexts/LocaleContext';

export const WelcomeBanner: React.FC = () => {
  const { t } = useLocale();

  // A simple, abstract SVG skyline. The color %23334155 corresponds to slate-700.
  const skylineSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><polygon fill='%23334155' points='0,100 100,100 100,90 95,90 95,70 90,70 90,85 85,85 85,60 78,60 78,100 70,100 70,50 65,50 65,100 55,100 55,75 50,75 50,100 45,100 45,65 40,65 40,100 30,100 30,40 22,40 22,100 15,100 15,80 8,80 8,100 0,100'/></svg>`;
  const bgImageUrl = `url("data:image/svg+xml,${skylineSvg}")`;

  return (
    <div className="relative bg-slate-900 border-b border-slate-700 overflow-hidden">
      {/* Background SVG with a slight blur and opacity for a subtle effect */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-bottom opacity-20 blur-[2px]"
        style={{
          backgroundImage: bgImageUrl,
          backgroundSize: '100% 100px', // Cover width, fixed height
        }}
      ></div>
      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

      <div className="relative container mx-auto px-4 md:px-8 py-12 text-center animate-fade-in z-10">
        <h2 className="text-4xl font-extrabold text-orange-500 tracking-tight mb-3">
          {t('welcomeBanner.title')}
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-slate-300">
          {t('welcomeBanner.description')}
        </p>
      </div>
    </div>
  );
};