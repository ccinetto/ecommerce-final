import { Router } from 'express';
import {
  loginUsuario,
  signupUsuario,
  logoutUsuario,
} from '../controllers/auth.controller';
import {
  paraSiExisteElUsuario,
  sigueSiExisteElUsuario,
} from '../controllers/usuario.controller';

export const authRouter = Router();

authRouter.post('/signup', paraSiExisteElUsuario, signupUsuario);

authRouter.post('/login', sigueSiExisteElUsuario, loginUsuario);

authRouter.get('/logout', logoutUsuario);
