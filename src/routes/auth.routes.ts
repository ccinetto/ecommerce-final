import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { usuarioController } from '../controllers/usuario.controller';
import { authValidation } from '../validations/auth.validations';

export const authRouter = Router();

// Verifica que haya un body en el request, detiene la ejecución si el usuario YA esta registrado, registra un usuario
authRouter.post(
  '/signup',
  authValidation.signupValidation,
  usuarioController.paraSiExisteElUsuario,
  authController.signupUsuario
);

// Verifica que haya un body en el request, detiene la ejecución si el usuario NO esta registrado, loguea un usuario
authRouter.post(
  '/login',
  authValidation.loginValidation,
  usuarioController.sigueSiExisteElUsuario,
  authController.loginUsuario
);

// Desloguea un usuario
authRouter.get('/logout', authController.logoutUsuario);
