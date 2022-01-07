import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { usuarioController } from '../controllers/usuario.controller';
import { authValidation } from '../validations/auth.validations';

export const authRouter = Router();

authRouter.post(
  '/signup',
  authValidation.signupValidation,
  usuarioController.paraSiExisteElUsuario,
  authController.signupUsuario
);

authRouter.post(
  '/login',
  authValidation.loginValidation,
  usuarioController.sigueSiExisteElUsuario,
  authController.loginUsuario
);

// Desloguea un usuario
authRouter.get('/logout', authController.logoutUsuario);
