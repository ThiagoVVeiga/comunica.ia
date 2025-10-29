import { Router } from 'express';
import { settingsController } from '../controllers/settingsController';

const router = Router();

// GET /api/settings - Obter configurações do usuário
router.get('/', settingsController.get);

// PUT /api/settings - Atualizar configurações do usuário
router.put('/', settingsController.update);

export default router;
