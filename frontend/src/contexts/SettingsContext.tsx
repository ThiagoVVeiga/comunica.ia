import React, { createContext, useContext, useReducer, useEffect } from 'react';
// Local types to avoid circular dependency
interface UserSettings {
  id?: string;
  userId?: string;
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  gridSize: 'small' | 'medium' | 'large';
  language: string;
  speechRate?: number;
  speechPitch?: number;
  speechVolume?: number;
  showText?: boolean;
  showImages?: boolean;
  autoSpeak?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
}

type SettingsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SETTINGS'; payload: UserSettings }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> };

const initialState: SettingsState = {
  settings: null,
  loading: true,
  error: null
};

const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: state.settings ? { ...state.settings, ...action.payload } : null
      };
    default:
      return state;
  }
};

interface SettingsContextType {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
  loadSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const loadSettings = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Implement API call
      // For now, use default settings
      const defaultSettings: UserSettings = {
        id: 'default',
        userId: 'default',
        theme: 'light',
        fontSize: 'medium',
        speechRate: 1.0,
        speechPitch: 1.0,
        speechVolume: 1.0,
        language: 'pt-BR',
        showText: true,
        showImages: true,
        gridSize: 'medium',
        autoSpeak: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      dispatch({ type: 'SET_SETTINGS', payload: defaultSettings });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error loading settings' });
    }
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    try {
      dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
      
      // TODO: Implement API call
      // console.log('Updating settings:', newSettings);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error updating settings' });
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const value: SettingsContextType = {
    settings: state.settings,
    loading: state.loading,
    error: state.error,
    updateSettings,
    loadSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
