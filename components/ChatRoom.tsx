import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import type { User } from '../App';

// Define a new message structure for the community chat
interface CommunityMessage {
  user: User;
  content: string;
  timestamp: number;
}

// Define props for the ChatRoom component
interface ChatRoomProps {
    currentUser: User;
}

export function ChatRoom({ currentUser }: ChatRoomProps) {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState<CommunityMessage[]>([]);
    const { t } = useLocale();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const CHAT_STORAGE_KEY = 'communityChatHistory';

    // Load chat history from localStorage on initial render
    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem(CHAT_STORAGE_KEY);
            if (storedHistory) {
                const parsedHistory: CommunityMessage[] = JSON.parse(storedHistory);
                // Simple validation to ensure it's an array
                if (Array.isArray(parsedHistory)) {
                    setChatHistory(parsedHistory);
                }
            } else {
                // Add an initial system message to guide users
                const welcomeMessage: CommunityMessage = {
                    user: { name: 'System', email: 'system@nyc.gov' },
                    content: t('chat.initialMessage'),
                    timestamp: Date.now(),
                };
                setChatHistory([welcomeMessage]);
                localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([welcomeMessage]));
            }
        } catch (e) {
            console.error("Failed to load chat history from localStorage", e);
            // In case of a parsing error, start with a fresh chat history
            setChatHistory([]);
        }
    }, [t]);

    // Scroll to the bottom of the chat container whenever the history updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        const newMessage: CommunityMessage = {
            user: currentUser,
            content: userInput.trim(),
            timestamp: Date.now(),
        };

        const updatedHistory = [...chatHistory, newMessage];
        setChatHistory(updatedHistory);
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedHistory));

        setUserInput('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Helper function to generate initials from a user's name for the avatar
    const getInitials = (name: string) => {
        if (!name) return '?';
        const nameParts = name.split(' ');
        if (nameParts.length > 1 && nameParts[0] && nameParts[nameParts.length - 1]) {
            return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <>
            <main ref={chatContainerRef} className="flex-grow container mx-auto p-4 md:p-8 flex flex-col overflow-y-auto">
                <div className="flex-grow space-y-6">
                    {chatHistory.map((message, index) => {
                        const isCurrentUser = message.user.email === currentUser.email;
                        const isSystemMessage = message.user.email === 'system@nyc.gov';

                        // Special rendering for system messages
                        if (isSystemMessage) {
                            return (
                                <div key={index} className="text-center my-4">
                                    <p className="text-xs text-slate-500 italic bg-slate-800 inline-block px-3 py-1 rounded-full">{message.content}</p>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className={`flex items-end gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div 
                                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${isCurrentUser ? 'bg-orange-500' : 'bg-slate-700'}`}
                                    title={message.user.name}
                                >
                                    {getInitials(message.user.name)}
                                </div>
                                <div className={`p-4 rounded-lg max-w-xl ${isCurrentUser ? 'bg-orange-600 text-white rounded-br-none' : 'bg-slate-700 text-white rounded-bl-none'}`}>
                                    {!isCurrentUser && <p className="text-xs font-bold text-orange-300 mb-1">{message.user.name}</p>}
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        );
                    })}
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
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!userInput.trim()}
                            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            {t('chat.send')}
                        </button>
                    </div>
                </div>
            </footer>
        </>
    );
}