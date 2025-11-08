import React, { useState } from 'react';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import { AnnouncementBoard } from './AnnouncementBoard';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import type { View } from '../App';
import { useLocale } from '../contexts/LocaleContext';

interface WelcomePageProps {
  setActiveView: (view: View) => void;
}

const ActionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  viewName: View;
}> = ({ icon, title, description, onClick, viewName }) => (
  <button
    onClick={onClick}
    aria-label={`Navigate to ${title}`}
    className="bg-slate-800 rounded-lg p-6 shadow-xl border border-slate-700 hover:border-orange-500 hover:bg-slate-700/50 transition-all duration-200 text-left w-full h-full flex flex-col hover:scale-105"
  >
    <div className="flex-shrink-0 flex items-center gap-4 mb-3">
      <div className="bg-slate-700 p-2 rounded-lg">{icon}</div>
      <h3 className="font-bold text-xl text-white">{title}</h3>
    </div>
    <p className="text-slate-400 text-sm flex-grow">{description}</p>
  </button>
);

export const WelcomePage: React.FC<WelcomePageProps> = ({ setActiveView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useLocale();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      console.log('Subscribed with email:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000); // Reset after 5 seconds
    }
  };

  const skylineSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><polygon fill='%23334155' points='0,100 100,100 100,90 95,90 95,70 90,70 90,85 85,85 85,60 78,60 78,100 70,100 70,50 65,50 65,100 55,100 55,75 50,75 50,100 45,100 45,65 40,65 40,100 30,100 30,40 22,40 22,100 15,100 15,80 8,80 8,100 0,100'/></svg>`;
  const bgImageUrl = `url("data:image/svg+xml,${skylineSvg}")`;

  return (
    <main className="relative flex-grow animate-fade-in bg-slate-900 flex flex-col overflow-hidden">
        {/* Background SVG */}
        <div
            className="absolute bottom-0 left-0 right-0 h-64 bg-no-repeat bg-bottom opacity-20 blur-[2px]"
            style={{
            backgroundImage: bgImageUrl,
            backgroundSize: '100% 100%',
            }}
            aria-hidden="true"
        />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-8 pb-16 flex-grow">
        <div
          className="grid md:grid-cols-3 gap-6 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <ActionCard
            icon={<ClipboardListIcon className="w-8 h-8 text-orange-400" />}
            title={t('welcomePage.agendaTitle')}
            description={t('welcomePage.agendaDescription')}
            onClick={() => setActiveView('agenda')}
            viewName="agenda"
          />
          <ActionCard
            icon={<MagicWandIcon className="w-8 h-8 text-orange-400" />}
            title={t('welcomePage.reportTitle')}
            description={t('welcomePage.reportDescription')}
            onClick={() => setActiveView('report')}
            viewName="report"
          />
          <ActionCard
            icon={<ChatBubbleIcon className="w-8 h-8 text-orange-400" />}
            title={t('welcomePage.chatTitle')}
            description={t('welcomePage.chatDescription')}
            onClick={() => setActiveView('chat')}
            viewName="chat"
          />
        </div>

        <div className="mt-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <AnnouncementBoard />
        </div>
        
        <div className="mt-16 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="max-w-2xl mx-auto bg-slate-800 rounded-lg p-8 shadow-xl border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-700 p-2 rounded-lg">
                    <EnvelopeIcon className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                    <h3 className="font-bold text-xl text-white">{t('welcomePage.newsletterTitle')}</h3>
                    <p className="text-slate-400 text-sm">{t('welcomePage.newsletterDescription')}</p>
                </div>
            </div>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('welcomePage.subscribePlaceholder')}
                  required
                  className="flex-grow w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-4 py-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  {t('welcomePage.subscribeButton')}
                </button>
              </form>
            ) : (
              <p className="text-green-400 text-center font-semibold mt-4 bg-green-900/50 p-3 rounded-md">
                {t('welcomePage.subscribeSuccess')}
              </p>
            )}
          </div>
        </div>
      </div>
       <footer className="relative z-10 text-center py-8 text-sm text-slate-500 border-t border-slate-800 mt-auto">
          <p>{t('welcomePage.footer', { year: new Date().getFullYear() })}</p>
       </footer>
    </main>
  );
};