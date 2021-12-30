import { Router } from 'express';
import { adminOnly } from '../controllers/auth.controller';
import {
  deleteUsuario,
  listAll,
  // loginUsuario,
  paraSiExisteElUsuario,
  // signupUsuario,
  sigueSiExisteElUsuario,
  // verifyToken,
} from '../controllers/usuario.controller';

export const routerUsuario = Router();

// routerUsuario.get('/', verifyToken, listAll);
routerUsuario.get('/', adminOnly, listAll);

// routerUsuario.post('/signup', paraSiExisteElUsuario, signupUsuario);

// routerUsuario.post('/login', sigueSiExisteElUsuario, loginUsuario);

routerUsuario.delete('/', sigueSiExisteElUsuario, deleteUsuario);
