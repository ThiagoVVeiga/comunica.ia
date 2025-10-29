import { Request, Response, NextFunction } from 'express';
import { createError } from '../middleware/errorHandler';

export const phraseController = {
  // Listar frases
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Implementar busca no banco local
      res.json({
        success: true,
        data: [],
        message: 'Funcionalidade em desenvolvimento'
      });
    } catch (error) {
      next(error);
    }
  },

  // Obter frase específica
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      // TODO: Implementar busca no banco local
      throw createError('Funcionalidade em desenvolvimento', 501);
    } catch (error) {
      next(error);
    }
  },

  // Criar nova frase
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, text, pictograms } = req.body;
      
      if (!name || !text) {
        throw createError('Nome e texto são obrigatórios', 400);
      }
      
      // TODO: Implementar criação no banco local
      res.json({
        success: true,
        message: 'Frase criada com sucesso',
        data: { id: 'temp-id', name, text }
      });
    } catch (error) {
      next(error);
    }
  },

  // Atualizar frase
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      // TODO: Implementar atualização no banco local
      throw createError('Funcionalidade em desenvolvimento', 501);
    } catch (error) {
      next(error);
    }
  },

  // Excluir frase
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      // TODO: Implementar exclusão no banco local
      throw createError('Funcionalidade em desenvolvimento', 501);
    } catch (error) {
      next(error);
    }
  }
};