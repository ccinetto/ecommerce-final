import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { usuarioController } from '../controllers/usuario.controller';

export const routerUsuario = Router();

routerUsuario.get('/', authController.adminOnly, usuarioController.listAll);

routerUsuario.delete(
  '/',
  usuarioController.sigueSiExisteElUsuario,
  usuarioController.deleteUsuario
);
