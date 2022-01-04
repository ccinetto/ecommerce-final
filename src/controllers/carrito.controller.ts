import { Request, Response, NextFunction } from 'express';
import { IDireccion } from '../models/orden.model';
import { carritoService } from '../services/carrito.service';

export class carritoController {
  static async listAllCarrito(req: Request, res: Response) {
    const usuarioId = res.locals.verified._id;
    const todos = await carritoService.listaCarritoTodos(usuarioId);
    res.status(200).json({ carrito: todos });
  }

  static async creaCarrito(req: Request, res: Response) {
    const payload = { usuario_id: res.locals.verified._id, ...req.body };
    // console.log(payload);
    if (!payload) {
      return res
        .status(400)
        .json({ msg: `No se suministró informacion de entrada` });
    }
    const nuevo = await carritoService.creaCarrito(payload);
    res.status(201).json({ nuevo: nuevo });
  }

  static async agregaProdcutoACarrito(req: Request, res: Response) {
    const usuario_id = res.locals.verified._id;
    const aCarrito = res.locals.aCarrito;
    const actualizado = await carritoService.agregaProductoAlCarrito(
      usuario_id,
      aCarrito
    );
    res.status(200).json({ carrito: actualizado });
  }

  static async preparaOrden(req: Request, res: Response) {
    const usuario_id = res.locals.verified._id;
    const email = res.locals.verified.email;
    const direccion = { ...req.body };
    const orden = await carritoService.preparaOrden(usuario_id);
    res.status(200).json({ email, ...orden, direccion });
  }

  // Middlewares
  static async paraSiEstaVacio(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (await carritoService.estaVacio(res.locals.verified.usuario_id)) {
      return res.status(400).json({ msg: 'El carrito no tiene productos' });
    }
    next();
  }
}
