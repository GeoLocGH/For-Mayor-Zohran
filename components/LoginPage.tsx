import React, { useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onSignup: (name: string, email: string, pass: string) => Promise<void>;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (isLoginView) {
        await onLogin(email, password);
      } else {
        await onSignup(name, email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-xl border border-slate-700 animate-slide-up">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-1">{isLoginView ? t('login.welcomeBack') : t('login.createAccount')}</h2>
          <p className="text-sm text-slate-400 text-center mb-6">{isLoginView ? t('login.loginToContinue') : t('login.joinCommunity')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">{t('login.fullName')}</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">{t('login.email')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">{t('login.password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                 <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
              ) : (
                isLoginView ? t('login.loginButton') : t('login.signupButton')
              )}
            </button>
          </form>
        </div>
        <div className="bg-slate-800/50 border-t border-slate-700 px-8 py-4 rounded-b-lg text-center">
          <p className="text-sm text-slate-400">
            {isLoginView ? t('login.noAccount') : t('login.hasAccount')}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError(null);
              }}
              className="font-semibold text-orange-400 hover:text-orange-500 ml-1"
            >
              {isLoginView ? t('login.signupButton') : t('login.loginButton')}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};