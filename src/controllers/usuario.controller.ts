import { NextFunction, Request, Response } from 'express';
import { carritoService } from '../services/carrito.service';
import { usuarioService } from '../services/usuario.service';

export class usuarioController {
  // Middlewares
  static async paraSiExisteElUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const email = req.body.email!;
    const existe = await usuarioService.existeUsuario(email);
    if (existe) {
      return res.status(200).json({ msg: `Ya está registrado ${email}` });
    } else {
      next();
    }
  }

  static async sigueSiExisteElUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const email = req.body.email!;
    const existe = await usuarioService.existeUsuario(email);
    if (!existe) {
      return res.status(400).json({ msg: `${email} no está registrado` });
    } else {
      next();
    }
  }

  //  Endpoints
  static async listAll(req: Request, res: Response) {
    const todos = await usuarioService.listaUsuariosTodos();
    res.status(200).json({ usuarios: todos });
  }

  static async deleteUsuario(req: Request, res: Response) {
    // const entrada = req.body;
    await usuarioService.borraUsuarioPorEmail(res.locals.verified.email);
    await carritoService.borraCarrito(res.locals.verified.usuario_id);
    req.app.locals.token = '';
    res.status(200).json({
      msg: `Usuario ${res.locals.verified.email} eliminado exitosamente `,
    });
  }
}
