import React from 'react';
import { InformationCircleIcon } from './icons/InformationCircleIcon';
import { XIcon } from './icons/XIcon';

interface WelcomeMessageProps {
  onDismiss: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onDismiss }) => {
  return (
    <div className="bg-indigo-900/50 border-b border-indigo-700/50 animate-fade-in">
      <div className="container mx-auto py-3 px-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-indigo-300 flex-shrink-0" />
            <p className="text-sm text-indigo-200">
              <span className="font-bold">A personal welcome from Mayor Zohran Mamdani.</span> This platform is a direct line to my office. Your voice is crucial in shaping our city's future. I'm listening.
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-full text-indigo-300 hover:bg-indigo-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Dismiss welcome message"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};