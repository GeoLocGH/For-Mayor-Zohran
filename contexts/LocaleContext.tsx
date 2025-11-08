import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the context
interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

// List of available languages
export const availableLanguages: { [key: string]: string } = {
  en: 'English',
  ar: 'العربية',
  de: 'Deutsch',
  fr: 'Français',
  hi: 'हिन्दी',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  nl: 'Nederlands',
  ps: 'پښتو',
  ru: 'Русский',
  so: 'Soomaali',
  sw: 'Kiswahili',
  ta: 'தமிழ்',
  th: 'ไทย',
  ur: 'اردو',
  zh: '中文',
  pt: 'Português',
  ee: 'Ewe',
  wo: 'Wolof',
  ak: 'Twi',
};

// Create the context with a default value
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Helper function to get nested values from an object using a dot-separated key
const getNestedTranslation = (obj: any, key: string): string | undefined => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};


// Create the provider component
export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>('en');
  const [translations, setTranslations] = useState<{ [key: string]: any }>({});
  const [fallbackTranslations, setFallbackTranslations] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    // Load the fallback English translations once
    fetch('/locales/en.json')
      .then(response => response.json())
      .then(data => setFallbackTranslations(data))
      .catch(error => console.error('Failed to load fallback translations:', error));
  }, []);

  useEffect(() => {
    // Load the translations for the selected locale
    if (locale === 'en' && Object.keys(fallbackTranslations).length > 0) {
        setTranslations(fallbackTranslations);
    } else {
        fetch(`/locales/${locale}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load ${locale} translations`);
            }
            return response.json();
        })
        .then(data => setTranslations(data))
        .catch(error => {
            console.error(error);
            // Fallback to English if the selected locale file fails to load
            setTranslations(fallbackTranslations);
        });
    }
  }, [locale, fallbackTranslations]);

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = getNestedTranslation(translations, key) || getNestedTranslation(fallbackTranslations, key) || key;

    if (params) {
        Object.keys(params).forEach(paramKey => {
            const regex = new RegExp(`{${paramKey}}`, 'g');
            translation = translation.replace(regex, String(params[paramKey]));
        });
    }

    return translation;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook to use the locale context
export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};