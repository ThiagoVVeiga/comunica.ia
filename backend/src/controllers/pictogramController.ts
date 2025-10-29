import { Request, Response, NextFunction } from 'express';
import { createError } from '../middleware/errorHandler';
import arasaacService from '../services/arasaacService';

export const pictogramController = {
  // Listar todos os pictogramas
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 50, category, search } = req.query;
      
      // TODO: Implementar busca no banco local
      // Por enquanto, buscar diretamente da ARASAAC
      let pictograms;
      
      if (search) {
        pictograms = await arasaacService.searchPictograms(search as string);
      } else if (category) {
        pictograms = await arasaacService.getPictogramsByCategory(Number(category));
      } else {
        pictograms = await arasaacService.getAllPictograms();
      }

      // Paginação simples
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = startIndex + Number(limit);
      const paginatedPictograms = pictograms.slice(startIndex, endIndex);

      res.json({
        success: true,
        data: paginatedPictograms,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: pictograms.length,
          totalPages: Math.ceil(pictograms.length / Number(limit))
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Buscar pictogramas
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, language = 'pt' } = req.query;
      
      if (!q) {
        throw createError('Termo de busca é obrigatório', 400);
      }

      const pictograms = await arasaacService.searchPictograms(q as string, language as string);
      
      res.json({
        success: true,
        data: pictograms
      });
    } catch (error) {
      next(error);
    }
  },

  // Obter pictogramas por categoria
  async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const { language = 'pt' } = req.query;

      const pictograms = await arasaacService.getPictogramsByCategory(
        Number(categoryId), 
        language as string
      );
      
      res.json({
        success: true,
        data: pictograms
      });
    } catch (error) {
      next(error);
    }
  },

  // Obter pictograma específico
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { language = 'pt' } = req.query;

      const pictogram = await arasaacService.getPictogram(Number(id), language as string);
      
      if (!pictogram) {
        throw createError('Pictograma não encontrado', 404);
      }
      
      res.json({
        success: true,
        data: pictogram
      });
    } catch (error) {
      next(error);
    }
  },

  // Sincronizar com ARASAAC
  async sync(req: Request, res: Response, next: NextFunction) {
    try {
      const { language = 'pt' } = req.body;
      
      await arasaacService.syncPictograms(language);
      
      res.json({
        success: true,
        message: 'Sincronização iniciada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
};