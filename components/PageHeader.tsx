import React from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { NycLogoIcon } from './icons/NycLogoIcon';
import type { View, User } from '../App';
import { useLocale } from '../contexts/LocaleContext';
import { LanguageSelector } from './LanguageSelector';

interface PageHeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const NavButton: React.FC<{
  viewName: View;
  label: string;
  icon: React.ReactNode;
  activeView: View;
  onClick: (view: View) => void;
  customClassName?: string;
}> = ({ viewName, label, icon, activeView, onClick, customClassName }) => (
  <button
    onClick={() => onClick(viewName)}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
      activeView === viewName
        ? 'bg-orange-500 text-white'
        : customClassName || 'text-slate-300 hover:bg-slate-700'
    }`}
    aria-current={activeView === viewName ? 'page' : undefined}
  >
    {icon}
    {label}
  </button>
);

export const PageHeader: React.FC<PageHeaderProps> = ({
  activeView,
  setActiveView,
  currentUser,
  onLogout,
}) => {
  const { t } = useLocale();

  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        <button
          onClick={() => setActiveView('welcome')}
          className="flex items-center gap-4 text-left rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500"
          aria-label="Go to home page"
        >
          <NycLogoIcon className="h-16 w-16" />
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-white">{t('header.title')}</h1>
            <p className="text-sm text-slate-400">{t('header.subtitle')}</p>
          </div>
        </button>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300 hidden sm:inline">{t('header.welcome', { name: currentUser.name })}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-700 rounded-md transition-colors"
              >
                {t('header.logout')}
              </button>
            </div>
          ) : (
            <NavButton
              viewName="login"
              label={t('header.login')}
              icon={<UserCircleIcon className="w-5 h-5" />}
              activeView={activeView}
              onClick={setActiveView}
              customClassName="bg-slate-700 text-white hover:bg-slate-600"
            />
          )}
        </div>
      </div>
    </header>
  );
};