import { NextFunction, Request, Response } from 'express';
import { borraCarrito } from '../services/carrito.service';
import {
  borraUsuarioPorEmail,
  existeUsuario,
  listaUsuariosTodos,
} from '../services/usuario.service';

// Middlewares
export const paraSiExisteElUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email!;
  const existe = await existeUsuario(email);
  if (existe) {
    return res.status(200).json({ msg: `Ya está registrado ${email}` });
  } else {
    next();
  }
};

export const sigueSiExisteElUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email!;
  const existe = await existeUsuario(email);
  if (!existe) {
    return res.status(400).json({ msg: `${email} no está registrado` });
  } else {
    next();
  }
};

//  Endpoints
export const listAll = async (req: Request, res: Response) => {
  const todos = await listaUsuariosTodos();
  res.status(200).json({ usuarios: todos });
};

export const deleteUsuario = async (req: Request, res: Response) => {
  // const entrada = req.body;
  await borraUsuarioPorEmail(res.locals.verified.email);
  await borraCarrito(res.locals.verified.usuario_id);
  req.app.locals.token = '';
  res.status(200).json({
    msg: `Usuario ${res.locals.verified.email} eliminado exitosamente `,
  });
};
