import { Request, Response, NextFunction } from 'express';
import { ILogin, IUsuario } from '../models/usuario.model';
import { authService } from '../services/auth.service';
import { carritoService } from '../services/carrito.service';
import { usuarioService } from '../services/usuario.service';

export class authController {
  static async signupUsuario(req: Request, res: Response) {
    const entrada: IUsuario = req.body;
    const nuevoUsuario: IUsuario = await usuarioService.creaUsuario(entrada);
    if (nuevoUsuario) {
      await carritoService.creaCarrito(nuevoUsuario._id);
      res.status(200).json({
        msg: `Usuario ${nuevoUsuario.email} agregado exitosamente.`,
      });
    } else {
      res.status(400).json({ msg: `Fallo al registrar usuario` });
    }
  }

  static async loginUsuario(req: Request, res: Response) {
    const entrada: ILogin = req.body;
    const autorizado = await usuarioService.autorizadoPorEmail(
      entrada.email,
      entrada.password
    );
    if (autorizado) {
      const token = await authService.firmaToken(entrada.email);
      req.app.locals.token = token;
      res
        .header('auth-token', token)
        .status(201)
        .json({ msg: `Bienvenido ${entrada.email}` });
    } else {
      res.status(401).json({ msg: `No estás autorizado` });
    }
  }

  static async logoutUsuario(req: Request, res: Response, next: NextFunction) {
    req.app.locals.token = '';
    res.json({ msg: `Usuario deslogueado` });
  }

  static async verificaTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.app.locals.token;
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
      const verified = await authService.verificaToken(token);
      res.locals.verified = verified;
      next(); // continuamos
    } catch (error) {
      res.status(400).json({ error: 'token no es válido' });
    }
  }

  static async adminOnly(req: Request, res: Response, next: NextFunction) {
    if (res.locals.verified.admin) {
      next();
    } else {
      return res.status(401).json({ error: 'No estás autorizado' });
    }
  }

  static async checkForBody(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ msg: 'Por favor suministra los datos solicitados' });
    }
    next();
  }
}
