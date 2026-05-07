import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_change_in_production';

// POST /api/v1/auth/register - Registrar nuevo usuario
export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { email, name, password } = req.body;

  // Verificar si el usuario ya existe
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }

  // Hash de contraseña
  const hashedPassword = await bcryptjs.hash(password, 10);

  // Crear nuevo usuario
  user = new User({
    email,
    name,
    password: hashedPassword
  });

  await user.save();

  // Generar token JWT
  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d'
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      },
      token
    }
  });
});

// POST /api/v1/auth/login - Login
export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  // Buscar usuario
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Comparar contraseña
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Generar token JWT
  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d'
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      },
      token
    }
  });
});
