import express from 'express';
import { body } from 'express-validator';
import {
  getSnippets,
  createSnippet,
  getSnippet,
  updateSnippet,
  deleteSnippet
} from '../controllers/snippetController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Middleware: Proteger todas las rutas con autenticación
router.use(verifyToken);

// Validación para crear/editar snippet
const validateSnippet = [
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),
  body('code')
    .notEmpty()
    .withMessage('Code is required'),
  body('language')
    .optional()
    .trim()
];

// Rutas
router.get('/', getSnippets);
router.post('/', validateSnippet, createSnippet);
router.get('/:id', getSnippet);
router.put('/:id', validateSnippet, updateSnippet);
router.delete('/:id', deleteSnippet);

export default router;
