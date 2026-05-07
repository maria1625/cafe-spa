import { validationResult } from 'express-validator';
import Snippet from '../models/Snippet.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// GET /api/v1/snippets - Listar snippets del usuario autenticado
export const getSnippets = asyncHandler(async (req, res) => {
  const snippets = await Snippet.find({ user: req.user._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    data: snippets,
    count: snippets.length
  });
});

// POST /api/v1/snippets - Crear nuevo snippet
export const createSnippet = asyncHandler(async (req, res) => {
  // Validar entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { title, language, code, tags, description } = req.body;

  const snippet = new Snippet({
    user: req.user._id,  // ← Seguridad: Extraer del JWT, NO del body
    title,
    language,
    code,
    tags: tags || [],
    description
  });

  await snippet.save();
  await snippet.populate('user', 'name email');

  res.status(201).json({
    success: true,
    message: 'Snippet created successfully',
    data: snippet
  });
});

// GET /api/v1/snippets/:id - Obtener un snippet específico
export const getSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id).populate('user', 'name email');

  if (!snippet) {
    return res.status(404).json({
      success: false,
      message: 'Snippet not found'
    });
  }

  // Verificar que el snippet pertenece al usuario
  if (snippet.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this snippet'
    });
  }

  res.status(200).json({
    success: true,
    data: snippet
  });
});

// PUT /api/v1/snippets/:id - Editar snippet
export const updateSnippet = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  let snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    return res.status(404).json({
      success: false,
      message: 'Snippet not found'
    });
  }

  // Muro de Privacidad: Verificar ownership
  if (snippet.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this snippet'
    });
  }

  const { title, language, code, tags, description } = req.body;

  snippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    { title, language, code, tags, description },
    { new: true, runValidators: true }
  ).populate('user', 'name email');

  res.status(200).json({
    success: true,
    message: 'Snippet updated successfully',
    data: snippet
  });
});

// DELETE /api/v1/snippets/:id - Borrar snippet
export const deleteSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    return res.status(404).json({
      success: false,
      message: 'Snippet not found'
    });
  }

  // Muro de Privacidad: Verificar ownership
  if (snippet.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this snippet'
    });
  }

  await Snippet.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Snippet deleted successfully'
  });
});
