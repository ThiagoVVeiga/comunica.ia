import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, MessageSquare, Settings, Volume2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useSpeech } from '../contexts/SpeechContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { settings } = useSettings();
  const { isSpeaking, stop } = useSpeech();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Categorias', href: '/categories', icon: Grid3X3 },
    { name: 'Frases', href: '/phrases', icon: MessageSquare },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ];

  const getThemeClasses = () => {
    if (settings?.theme === 'dark') {
      return 'bg-gray-900 text-white';
    }
    if (settings?.theme === 'high-contrast') {
      return 'bg-black text-white border-2 border-white';
    }
    return 'bg-white text-gray-900';
  };

  const getFontSize = () => {
    switch (settings?.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()}`}>
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className={`text-xl font-bold ${getFontSize()}`}>
                TD Snap Web
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isSpeaking && (
                <button
                  onClick={stop}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm">Parar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-100 dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                      } ${getFontSize()}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
