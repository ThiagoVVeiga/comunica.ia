import { Router } from 'express';
import { validate, categorySchema } from '../middleware/validation';
import { categoryController } from '../controllers/categoryController';

const router = Router();

// GET /api/categories - List all categories
router.get('/', categoryController.getAll);

// GET /api/categories/:id - Get specific category
router.get('/:id', categoryController.getById);

// POST /api/categories - Create new category
router.post('/', validate(categorySchema), categoryController.create);

// PUT /api/categories/:id - Update category
router.put('/:id', validate(categorySchema), categoryController.update);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', categoryController.delete);

// POST /api/categories/sync - Sync categories
router.post('/sync', categoryController.sync);

export default router;
