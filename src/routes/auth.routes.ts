import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { usuarioController } from '../controllers/usuario.controller';

export const authRouter = Router();

authRouter.post(
  '/signup',
  usuarioController.paraSiExisteElUsuario,
  authController.signupUsuario
);

authRouter.post(
  '/login',
  usuarioController.sigueSiExisteElUsuario,
  authController.loginUsuario
);

authRouter.get('/logout', authController.logoutUsuario);