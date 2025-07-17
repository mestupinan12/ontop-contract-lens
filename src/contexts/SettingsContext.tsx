import { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  webhookUrl: string;
  apiKey: string;
  isConnected: boolean;
  setWebhookUrl: (url: string) => void;
  setApiKey: (key: string) => void;
  setIsConnected: (connected: boolean) => void;
  saveSettings: () => void;
  loadSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: any;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    try {
      const savedWebhookUrl = localStorage.getItem('n8n-webhook-url');
      const savedApiKey = localStorage.getItem('n8n-api-key');
      
      if (savedWebhookUrl) {
        setWebhookUrl(savedWebhookUrl);
      }
      if (savedApiKey) {
        setApiKey(savedApiKey);
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('n8n-webhook-url', webhookUrl);
      localStorage.setItem('n8n-api-key', apiKey);
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  };

  const contextValue: SettingsContextType = {
    webhookUrl,
    apiKey,
    isConnected,
    setWebhookUrl,
    setApiKey,
    setIsConnected,
    saveSettings,
    loadSettings,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}; 