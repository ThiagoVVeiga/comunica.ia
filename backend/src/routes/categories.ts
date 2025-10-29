import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';

const router = Router();

// GET /api/categories - Listar categorias
router.get('/', categoryController.getAll);

// GET /api/categories/:id - Obter categoria específica
router.get('/:id', categoryController.getById);

// POST /api/categories/sync - Sincronizar categorias
router.post('/sync', categoryController.sync);

export default router;