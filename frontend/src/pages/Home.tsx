import React, { useState, useEffect } from 'react';
import { Search, Grid3X3, MessageSquare, Volume2 } from 'lucide-react';
import { useSpeech } from '../contexts/SpeechContext';
import { useSettings } from '../contexts/SettingsContext';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pictograms, setPictograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { speak, isSpeaking } = useSpeech();
  const { settings } = useSettings();

  // Pictogramas de exemplo para demonstração
  const examplePictograms = [
    { id: 1, name: 'Casa', imageUrl: 'https://api.arasaac.org/pictograms/1?download=false&color=true&width=200' },
    { id: 2, name: 'Água', imageUrl: 'https://api.arasaac.org/pictograms/2?download=false&color=true&width=200' },
    { id: 3, name: 'Comida', imageUrl: 'https://api.arasaac.org/pictograms/3?download=false&color=true&width=200' },
    { id: 4, name: 'Família', imageUrl: 'https://api.arasaac.org/pictograms/4?download=false&color=true&width=200' },
    { id: 5, name: 'Escola', imageUrl: 'https://api.arasaac.org/pictograms/5?download=false&color=true&width=200' },
    { id: 6, name: 'Trabalho', imageUrl: 'https://api.arasaac.org/pictograms/6?download=false&color=true&width=200' },
  ];

  useEffect(() => {
    setPictograms(examplePictograms);
  }, []);

  const handlePictogramClick = async (pictogram: any) => {
    if (settings?.autoSpeak) {
      await speak(pictogram.name);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      // TODO: Implementar busca real na API
      console.log('Buscando:', searchTerm);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Por enquanto, filtrar os pictogramas de exemplo
      const filtered = examplePictograms.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPictograms(filtered);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGridSize = () => {
    switch (settings?.gridSize) {
      case 'small': return 'grid-cols-6';
      case 'large': return 'grid-cols-3';
      default: return 'grid-cols-4';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${getFontSize()}`}>
          Bem-vindo ao TD Snap Web
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Plataforma de comunicação alternativa
        </p>
      </div>

      {/* Barra de Pesquisa */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar pictogramas..."
            className={`w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getFontSize()}`}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <Grid3X3 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <h3 className={`font-semibold ${getFontSize()}`}>Categorias</h3>
          <p className="text-2xl font-bold text-primary-600">12</p>
        </div>
        
        <div className="card text-center">
          <MessageSquare className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
          <h3 className={`font-semibold ${getFontSize()}`}>Frases</h3>
          <p className="text-2xl font-bold text-secondary-600">8</p>
        </div>
        
        <div className="card text-center">
          <Volume2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className={`font-semibold ${getFontSize()}`}>Síntese de Voz</h3>
          <p className="text-2xl font-bold text-green-600">
            {isSpeaking ? 'Ativa' : 'Inativa'}
          </p>
        </div>
      </div>

      {/* Pictogramas */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${getFontSize()}`}>
          Pictogramas Populares
        </h2>
        
        <div className={`grid ${getGridSize()} gap-4`}>
          {pictograms.map((pictogram) => (
            <button
              key={pictogram.id}
              onClick={() => handlePictogramClick(pictogram)}
              className="pictogram-button group"
            >
              <div className="aspect-square mb-2">
                <img
                  src={pictogram.imageUrl}
                  alt={pictogram.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback para imagem quebrada
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gTmFvIENhcnJlZ2FkYTwvdGV4dD4KPC9zdmc+';
                  }}
                />
              </div>
              {settings?.showText && (
                <p className={`text-center font-medium group-hover:text-primary-600 ${getFontSize()}`}>
                  {pictogram.name}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;