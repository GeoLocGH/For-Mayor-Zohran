import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { useLocale } from '../contexts/LocaleContext';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const TypingIndicator: React.FC = () => {
    const { t } = useLocale();
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">{t('chat.typing')}</span>
            <div className="flex gap-1">
                <span className="animate-bounce delay-75 w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                <span className="animate-bounce delay-150 w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                <span className="animate-bounce delay-300 w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
            </div>
        </div>
    );
};


const getFriendlyErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes('api key not valid')) {
      // Avoid exposing API key details to the user, as per security best practices.
      return "There's an issue with the application's configuration. Please try again later.";
    }
    if (message.includes('network') || message.includes('fetch failed')) {
      return "Unable to connect to the server. Please check your internet connection and try again.";
    }
    if (message.includes('429') || message.includes('rate limit')) {
      return "The service is currently busy due to high traffic. Please try again in a few moments.";
    }
    if (message.includes('500') || message.includes('internal server error')) {
      return "A temporary issue occurred on our end. Please try your request again shortly.";
    }
    if (message.includes('safety') || message.includes('blocked')) {
      return "Your message couldn't be processed due to safety policies. Please try rephrasing it.";
    }
    // For other cases, provide a generic but clear message.
    return 'An unexpected error occurred while communicating with the service. Please try again.';
  }
  return 'An unknown error occurred. Please try again.';
};


export function ChatRoom() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocale();
  
  const chatRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever chat history updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const initializeChat = () => {
    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "You are the Mayor of New York City. Engage directly with constituents in this chat room. Speak in a confident, decisive, and official tone. Address their concerns, provide updates on your agenda, and gather feedback on community issues. Your goal is to foster a sense of direct access and accountability.",
        },
      });
      // Add initial welcome message from the model
      setChatHistory([{
        role: 'model',
        content: t('chat.initialMessage')
      }]);
    }
  };

  useEffect(() => {
    initializeChat();
  }, [t]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    setIsLoading(true);
    setError(null);
    const userMessage: ChatMessage = { role: 'user', content: userInput };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');

    try {
      const stream = await chatRef.current.sendMessageStream({ message: userInput });

      let modelResponse = '';
      setChatHistory(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].content = modelResponse;
          return newHistory;
        });
      }

    } catch (err) {
      setError(getFriendlyErrorMessage(err));
      // Remove the empty model message on error
      setChatHistory(prev => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <main ref={chatContainerRef} className="flex-grow container mx-auto p-4 md:p-8 flex flex-col overflow-y-auto">
        <div className="flex-grow space-y-6">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex items-end gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 ${message.role === 'user' ? 'bg-orange-500' : 'bg-slate-700'} flex items-center justify-center text-sm font-bold`}>
                {message.role === 'user' ? t('chat.you') : t('chat.mayor')}
              </div>
              <div className={`p-4 rounded-lg max-w-xl ${message.role === 'user' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-slate-700 text-white rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-3 flex-row">
              <div className="w-8 h-8 rounded-full flex-shrink-0 bg-slate-700 flex items-center justify-center text-sm font-bold">{t('chat.mayor')}</div>
              <div className="p-4 rounded-lg bg-slate-700 text-white rounded-bl-none">
                 <TypingIndicator />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 bg-slate-900/80 backdrop-blur-sm p-4 border-t border-slate-700 z-10">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.placeholder')}
              className="flex-grow w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-4 py-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!userInput.trim() || isLoading}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {t('chat.send')}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center md:text-left">{error}</p>}
        </div>
      </footer>
    </>
  );
}