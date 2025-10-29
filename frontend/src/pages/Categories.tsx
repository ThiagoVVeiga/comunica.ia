import React, { useState, useEffect, useMemo } from 'react';
import { Grid3X3, ChevronRight, Plus, X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📁');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const { settings } = useSettings();

  // Example categories
  const exampleCategories = useMemo(() => [
    { id: 1, name: 'Pessoas', icon: '👥', color: 'bg-blue-100', count: 45 },
    { id: 2, name: 'Ações', icon: '🏃', color: 'bg-green-100', count: 32 },
    { id: 3, name: 'Comida', icon: '🍎', color: 'bg-orange-100', count: 28 },
    { id: 4, name: 'Lugares', icon: '🏠', color: 'bg-purple-100', count: 22 },
    { id: 5, name: 'Objetos', icon: '📱', color: 'bg-gray-100', count: 67 },
    { id: 6, name: 'Emoções', icon: '😊', color: 'bg-yellow-100', count: 15 },
  ], []);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCategories(exampleCategories);
      setLoading(false);
    }, 1000);
  }, [exampleCategories]);

  const getFontSize = () => {
    switch (settings?.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    // TODO: Implement navigation to category pictograms
    console.log('Selected category:', category);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory = {
      id: Date.now(),
      name: newCategoryName,
      icon: newCategoryIcon,
      color: 'bg-gray-100',
      count: 0
    };
    
    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    setNewCategoryIcon('📁');
    setShowAddForm(false);
  };

  const handleDeleteCategory = (categoryId: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory(null);
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
            onClick={() => handleCategoryClick(category)}
            className={`card hover:shadow-lg transition-shadow cursor-pointer group ${
              selectedCategory?.id === category.id ? 'ring-2 ring-primary-500' : ''
            }`}
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

      {/* Formulário para adicionar nova categoria */}
      {showAddForm ? (
        <div className="card max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Nova Categoria</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Ex: Animais, Transporte..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ícone
              </label>
              <input
                type="text"
                value={newCategoryIcon}
                onChange={(e) => setNewCategoryIcon(e.target.value)}
                placeholder="📁"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleAddCategory}
                className="btn-primary flex-1"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Nova Categoria
          </button>
        </div>
      )}

      {/* Categoria selecionada */}
      {selectedCategory && (
        <div className="card bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-2">
            Categoria Selecionada: {selectedCategory.name}
          </h3>
          <p className="text-primary-600 mb-4">
            Esta categoria contém {selectedCategory.count} pictogramas.
          </p>
          <div className="flex space-x-3">
            <button className="btn-primary">
              Ver Pictogramas
            </button>
            <button 
              onClick={() => handleDeleteCategory(selectedCategory.id)}
              className="btn-secondary text-red-600 hover:text-red-700"
            >
              Excluir Categoria
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
