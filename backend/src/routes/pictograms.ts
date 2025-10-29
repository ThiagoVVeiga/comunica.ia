import { Router } from 'express';
import { pictogramController } from '../controllers/pictogramController';

const router = Router();

// GET /api/pictograms - Listar pictogramas
router.get('/', pictogramController.getAll);

// GET /api/pictograms/search - Buscar pictogramas
router.get('/search', pictogramController.search);

// GET /api/pictograms/category/:categoryId - Pictogramas por categoria
router.get('/category/:categoryId', pictogramController.getByCategory);

// GET /api/pictograms/:id - Obter pictograma específico
router.get('/:id', pictogramController.getById);

// POST /api/pictograms/sync - Sincronizar com ARASAAC
router.post('/sync', pictogramController.sync);

export default router;
