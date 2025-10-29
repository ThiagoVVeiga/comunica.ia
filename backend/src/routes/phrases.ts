import { Router } from 'express';
import { phraseController } from '../controllers/phraseController';

const router = Router();

// GET /api/phrases - Listar frases
router.get('/', phraseController.getAll);

// GET /api/phrases/:id - Obter frase específica
router.get('/:id', phraseController.getById);

// POST /api/phrases - Criar nova frase
router.post('/', phraseController.create);

// PUT /api/phrases/:id - Atualizar frase
router.put('/:id', phraseController.update);

// DELETE /api/phrases/:id - Excluir frase
router.delete('/:id', phraseController.delete);

export default router;