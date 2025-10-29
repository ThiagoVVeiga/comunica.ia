import { Request, Response, NextFunction } from 'express';
import { createError } from '../middleware/errorHandler';

export const settingsController = {
  // Obter configurações do usuário
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Implementar busca no banco local
      const defaultSettings = {
        theme: 'light',
        fontSize: 'medium',
        speechRate: 1.0,
        speechPitch: 1.0,
        speechVolume: 1.0,
        language: 'pt-BR',
        showText: true,
        showImages: true,
        gridSize: 'medium',
        autoSpeak: true
      };
      
      res.json({
        success: true,
        data: defaultSettings
      });
    } catch (error) {
      next(error);
    }
  },

  // Atualizar configurações do usuário
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = req.body;
      
      // Validações básicas
      if (settings.theme && !['light', 'dark', 'high-contrast'].includes(settings.theme)) {
        throw createError('Tema inválido', 400);
      }
      
      if (settings.fontSize && !['small', 'medium', 'large', 'extra-large'].includes(settings.fontSize)) {
        throw createError('Tamanho de fonte inválido', 400);
      }
      
      if (settings.gridSize && !['small', 'medium', 'large'].includes(settings.gridSize)) {
        throw createError('Tamanho da grade inválido', 400);
      }
      
      // TODO: Implementar atualização no banco local
      res.json({
        success: true,
        message: 'Configurações atualizadas com sucesso',
        data: settings
      });
    } catch (error) {
      next(error);
    }
  }
};