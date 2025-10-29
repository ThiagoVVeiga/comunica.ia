import React, { useState, useEffect } from 'react';
import { Grid3X3, ChevronRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  // Categorias de exemplo
  const exampleCategories = [
    { id: 1, name: 'Pessoas', icon: '👥', color: 'bg-blue-100', count: 45 },
    { id: 2, name: 'Ações', icon: '🏃', color: 'bg-green-100', count: 32 },
    { id: 3, name: 'Comida', icon: '🍎', color: 'bg-orange-100', count: 28 },
    { id: 4, name: 'Lugares', icon: '🏠', color: 'bg-purple-100', count: 22 },
    { id: 5, name: 'Objetos', icon: '📱', color: 'bg-gray-100', count: 67 },
    { id: 6, name: 'Emoções', icon: '😊', color: 'bg-yellow-100', count: 15 },
  ];

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setCategories(exampleCategories);
      setLoading(false);
    }, 1000);
  }, []);

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
      <div className="flex items-center space-x-3">
        <Grid3X3 className="w-8 h-8 text-primary-600" />
        <h1 className={`text-3xl font-bold ${getFontSize()}`}>
          Categorias
        </h1>
      </div>

      <p className="text-gray-600 dark:text-gray-300">
        Explore as categorias de pictogramas disponíveis
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center text-2xl`}>
                {category.icon}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold group-hover:text-primary-600 transition-colors ${getFontSize()}`}>
                  {category.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {category.count} pictogramas
                </p>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Botão para adicionar nova categoria */}
      <div className="text-center">
        <button className="btn-primary">
          Adicionar Nova Categoria
        </button>
      </div>
    </div>
  );
};

export default Categories;