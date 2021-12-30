import { Request, Response, NextFunction } from 'express';
import { ICarrito } from '../models/carrito.model';
import { ILogin, IUsuarioDoc, IUsuarioInput } from '../models/usuario.model';
import { firmaToken, verificaToken } from '../services/auth.service';
import { creaCarrito } from '../services/carrito.service';
import { autorizadoPorEmail, creaUsuario } from '../services/usuario.service';

export const signupUsuario = async (req: Request, res: Response) => {
  const entrada: IUsuarioInput = req.body;
  const nuevoUsuario: IUsuarioDoc = await creaUsuario(entrada);
  if (nuevoUsuario) {
    const nuevoCarrito: ICarrito = await creaCarrito(nuevoUsuario._id);
    res.status(200).json({
      msg: `Usuario ${nuevoUsuario.email} agregado exitosamente.`,
      carrito: nuevoCarrito.productos,
    });
  } else {
    res.status(400).json({ msg: `Fallo al registrar usuario` });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const entrada: ILogin = req.body;
  const autorizado = await autorizadoPorEmail(entrada.email, entrada.password);
  if (autorizado) {
    const token = await firmaToken(entrada.email);
    req.app.locals.token = token;
    // updateToken(token);
    res
      .header('auth-token', token)
      .status(201)
      .json({ msg: `Bienvenido ${entrada.email}` });
  } else {
    res.status(401).json({ msg: `No estás autorizado` });
  }
};

export const logoutUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.app.locals.token = '';
  // await clearToken();
  res.json({ msg: `Usuario deslogueado` });
};

export const verificaTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.app.locals.token;
  // const token = TOKEN;
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });
  try {
    const verified = await verificaToken(token);
    console.log(verified);
    res.locals.verified = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' });
  }
};

export const adminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.verified.admin) {
    next();
  } else {
    return res.status(401).json({ error: 'No estás autorizado' });
  }
};
