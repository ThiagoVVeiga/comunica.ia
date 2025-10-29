import React, { createContext, useContext, useState, useCallback } from 'react';
// Local types to avoid circular dependency
interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: string;
  language: string;
}

interface SpeechContextType {
  isSupported: boolean;
  isSpeaking: boolean;
  speak: (text: string) => Promise<void>;
  stop: () => void;
  settings: SpeechSettings;
  updateSettings: (newSettings: Partial<SpeechSettings>) => void;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [settings, setSettings] = useState<SpeechSettings>({
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    language: 'pt-BR'
  });

  const isSupported = 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  const speak = useCallback(async (text: string) => {
    if (!isSupported) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    if (isSpeaking) {
      stop();
    }

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      utterance.lang = settings.language;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsSpeaking(false);
        resolve();
      };

      speechSynthesis.speak(utterance);
    });
  }, [isSupported, isSpeaking, settings, stop]);

  const updateSettings = useCallback((newSettings: Partial<SpeechSettings>) => {
    setSettings((prev: SpeechSettings) => ({ ...prev, ...newSettings }));
  }, []);

  const value: SpeechContextType = {
    isSupported,
    isSpeaking,
    speak,
    stop,
    settings,
    updateSettings
  };

  return (
    <SpeechContext.Provider value={value}>
      {children}
    </SpeechContext.Provider>
  );
};
