import { Request, Response, NextFunction } from 'express';
import { createError } from '../middleware/errorHandler';
import arasaacService from '../services/arasaacService';

export const categoryController = {
  // Listar todas as categorias
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { language = 'pt' } = req.query;
      
      const categories = await arasaacService.getCategories(language as string);
      
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      next(error);
    }
  },

  // Obter categoria específica
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { language = 'pt' } = req.query;

      const categories = await arasaacService.getCategories(language as string);
      const category = categories.find(cat => cat.id === Number(id));
      
      if (!category) {
        throw createError('Categoria não encontrada', 404);
      }
      
      res.json({
        success: true,
        data: category
      });
    } catch (error) {
      next(error);
    }
  },

  // Sincronizar categorias
  async sync(req: Request, res: Response, next: NextFunction) {
    try {
      const { language = 'pt' } = req.body;
      
      const categories = await arasaacService.getCategories(language);
      
      // TODO: Implementar sincronização com banco local
      console.log(`Sincronizando ${categories.length} categorias`);
      
      res.json({
        success: true,
        message: 'Categorias sincronizadas com sucesso',
        data: { count: categories.length }
      });
    } catch (error) {
      next(error);
    }
  }
};
