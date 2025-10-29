import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Play, Edit, Trash2 } from 'lucide-react';
import { useSpeech } from '../contexts/SpeechContext';
import { useSettings } from '../contexts/SettingsContext';

const Phrases: React.FC = () => {
  const [phrases, setPhrases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { speak } = useSpeech();
  const { settings } = useSettings();

  // Frases de exemplo
  const examplePhrases = [
    { id: 1, name: 'Bom dia', text: 'Bom dia!', pictograms: ['👋', '☀️'] },
    { id: 2, name: 'Obrigado', text: 'Obrigado!', pictograms: ['🙏'] },
    { id: 3, name: 'Preciso de ajuda', text: 'Preciso de ajuda', pictograms: ['❓', '🤝'] },
    { id: 4, name: 'Estou com fome', text: 'Estou com fome', pictograms: ['🍽️', '😋'] },
    { id: 5, name: 'Vou para casa', text: 'Vou para casa', pictograms: ['🏠', '🚶'] },
    { id: 6, name: 'Estou feliz', text: 'Estou feliz!', pictograms: ['😊'] },
  ];

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setPhrases(examplePhrases);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSpeak = async (phrase: any) => {
    await speak(phrase.text);
  };

  const getFontSize = () => {
    switch (settings?.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-8 h-8 text-primary-600" />
          <h1 className={`text-3xl font-bold ${getFontSize()}`}>
            Frases
          </h1>
        </div>
        
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nova Frase</span>
        </button>
      </div>

      <p className="text-gray-600 dark:text-gray-300">
        Gerencie suas frases personalizadas para comunicação rápida
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phrases.map((phrase) => (
          <div
            key={phrase.id}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className={`font-semibold ${getFontSize()}`}>
                {phrase.name}
              </h3>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSpeak(phrase)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Falar frase"
                >
                  <Play className="w-4 h-4" />
                </button>
                
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar frase"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir frase"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {phrase.text}
            </p>
            
            <div className="flex space-x-2">
              {phrase.pictograms.map((pictogram: string, index: number) => (
                <span
                  key={index}
                  className="text-2xl bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
                >
                  {pictogram}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {phrases.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className={`text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 ${getFontSize()}`}>
            Nenhuma frase criada ainda
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Crie sua primeira frase personalizada para começar
          </p>
          <button className="btn-primary">
            Criar Primeira Frase
          </button>
        </div>
      )}
    </div>
  );
};

export default Phrases;