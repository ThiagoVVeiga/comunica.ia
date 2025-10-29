import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Volume2, Eye, Grid3X3 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useSpeech } from '../contexts/SpeechContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const { speak, settings: speechSettings, updateSettings: updateSpeechSettings } = useSpeech();
  const [isSaving, setIsSaving] = useState(false);

  const handleThemeChange = (theme: string) => {
    updateSettings({ theme: theme as any });
  };

  const handleFontSizeChange = (fontSize: string) => {
    updateSettings({ fontSize: fontSize as any });
  };

  const handleGridSizeChange = (gridSize: string) => {
    updateSettings({ gridSize: gridSize as any });
  };

  const handleSpeechRateChange = (rate: number) => {
    updateSpeechSettings({ rate });
  };

  const handleSpeechPitchChange = (pitch: number) => {
    updateSpeechSettings({ pitch });
  };

  const handleSpeechVolumeChange = (volume: number) => {
    updateSpeechSettings({ volume });
  };

  const handleTestSpeech = async () => {
    await speak('Este é um teste da síntese de voz.');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // As configurações já são salvas automaticamente via context
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      console.log('Configurações salvas!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsSaving(false);
    }
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
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="w-8 h-8 text-primary-600" />
        <h1 className={`text-3xl font-bold ${getFontSize()}`}>
          Configurações
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Aparência */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Eye className="w-5 h-5 text-primary-600" />
            <h2 className={`text-xl font-semibold ${getFontSize()}`}>
              Aparência
            </h2>
          </div>

          <div className="space-y-6">
            {/* Tema */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${getFontSize()}`}>
                Tema
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Claro', icon: '☀️' },
                  { value: 'dark', label: 'Escuro', icon: '🌙' },
                  { value: 'high-contrast', label: 'Alto Contraste', icon: '🔆' }
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange(theme.value)}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      settings?.theme === theme.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{theme.icon}</div>
                    <div className="text-sm font-medium">{theme.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tamanho da Fonte */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${getFontSize()}`}>
                Tamanho da Fonte
              </label>
              <select
                value={settings?.fontSize || 'medium'}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="small">Pequeno</option>
                <option value="medium">Médio</option>
                <option value="large">Grande</option>
                <option value="extra-large">Extra Grande</option>
              </select>
            </div>

            {/* Tamanho da Grade */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${getFontSize()}`}>
                Tamanho da Grade
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'small', label: 'Pequena', icon: '🔲' },
                  { value: 'medium', label: 'Média', icon: '🔳' },
                  { value: 'large', label: 'Grande', icon: '⬜' }
                ].map((size) => (
                  <button
                    key={size.value}
                    onClick={() => handleGridSizeChange(size.value)}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      settings?.gridSize === size.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{size.icon}</div>
                    <div className="text-sm font-medium">{size.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Síntese de Voz */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Volume2 className="w-5 h-5 text-primary-600" />
            <h2 className={`text-xl font-semibold ${getFontSize()}`}>
              Síntese de Voz
            </h2>
          </div>

          <div className="space-y-6">
            {/* Velocidade */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${getFontSize()}`}>
                Velocidade: {speechSettings.rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechSettings.rate}
                onChange={(e) => handleSpeechRateChange(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Tom */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${getFontSize()}`}>
                Tom: {speechSettings.pitch.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechSettings.pitch}
                onChange={(e) => handleSpeechPitchChange(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Volume */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${getFontSize()}`}>
                Volume: {Math.round(speechSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={speechSettings.volume}
                onChange={(e) => handleSpeechVolumeChange(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Teste */}
            <div className="pt-4 border-t">
              <button
                onClick={handleTestSpeech}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Testar Síntese de Voz</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Salvando...' : 'Salvar Configurações'}</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;