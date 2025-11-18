import React, { useState, useEffect } from 'react';
import { VisualReportTool } from './components/VisualReportTool';
import { ChatRoom } from './components/ChatRoom';
import { AgendaBoard } from './components/AgendaBoard';
import { PageHeader, NavButton } from './components/PageHeader';
import { WelcomePage } from './components/WelcomePage';
import { LoginPage } from './components/LoginPage';
import { MagicWandIcon } from './components/icons/MagicWandIcon';
import { ChatBubbleIcon } from './components/icons/ChatBubbleIcon';
import { ClipboardListIcon } from './components/icons/ClipboardListIcon';
import { HomeIcon } from './components/icons/HomeIcon';
import { WelcomeBanner } from './components/WelcomeBanner';
import { LocaleProvider, useLocale } from './contexts/LocaleContext';


export type View = 'welcome' | 'agenda' | 'report' | 'chat' | 'login';

export interface User {
  name: string;
  email: string;
}

function AppContent() {
  const [activeView, setActiveView] = useState<View>('welcome');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { t } = useLocale();

  useEffect(() => {
    // Check for a logged-in user in localStorage when the app loads
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = async (email: string, pass: string): Promise<void> => {
    // This is a mock authentication. In a real app, you'd call an API.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock check for existing user
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email] && storedUsers[email].password === pass) {
          const user = { name: storedUsers[email].name, email };
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setActiveView('welcome');
          resolve();
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 1000);
    });
  };

  const handleSignup = async (name: string, email: string, pass: string): Promise<void> => {
    // Mock user creation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email]) {
          reject(new Error('An account with this email already exists.'));
          return;
        }
        
        storedUsers[email] = { name, password: pass };
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        const user = { name, email };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        setActiveView('welcome');
        resolve();
      }, 1000);
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveView('welcome');
  };

  const protectedViews: View[] = ['report', 'chat'];

  const renderContent = () => {
    if (protectedViews.includes(activeView) && !currentUser) {
      // If trying to access a protected view while logged out, show login page.
      return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
    }

    switch (activeView) {
      case 'welcome':
        return <WelcomePage setActiveView={setActiveView} />;
      case 'agenda':
        return <AgendaBoard />;
      case 'report':
        // currentUser is guaranteed to be non-null here due to the check above
        return <VisualReportTool />;
      case 'chat':
        // currentUser is guaranteed to be non-null here due to the check above
        return <ChatRoom currentUser={currentUser!} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
      default:
        return <WelcomePage setActiveView={setActiveView} />;
    }
  };

  // Determine the view that should be highlighted in the UI.
  // If we are redirecting to login from a protected route, the UI should show "Login" as active.
  const isRedirectingToLogin = protectedViews.includes(activeView) && !currentUser;
  const effectiveView = isRedirectingToLogin ? 'login' : activeView;


  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col font-sans">
      <PageHeader
        activeView={effectiveView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      {activeView === 'welcome' && <WelcomeBanner />}
      <nav className="bg-slate-800 border-b border-slate-700">
          <div className="container mx-auto px-4 md:px-8 flex justify-center items-center h-14">
            <div className="flex items-center gap-2">
                <NavButton
                  viewName="welcome"
                  label={t('nav.home')}
                  icon={<HomeIcon className="w-5 h-5" />}
                  activeView={effectiveView}
                  onClick={setActiveView}
                />
                <NavButton
                  viewName="agenda"
                  label={t('nav.agenda')}
                  icon={<ClipboardListIcon className="w-5 h-5" />}
                  activeView={effectiveView}
                  onClick={setActiveView}
                />
                <NavButton
                  viewName="report"
                  label={t('nav.report')}
                  icon={<MagicWandIcon className="w-5 h-5" />}
                  activeView={effectiveView}
                  onClick={setActiveView}
                />
                <NavButton
                  viewName="chat"
                  label={t('nav.chat')}
                  icon={<ChatBubbleIcon className="w-5 h-5" />}
                  activeView={effectiveView}
                  onClick={setActiveView}
                />
            </div>
          </div>
      </nav>
      {renderContent()}
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}