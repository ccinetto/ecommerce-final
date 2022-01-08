import { Request, Response, NextFunction } from 'express';
import { IDireccion, IOrden } from '../models/orden.model';
import { usuarioModel } from '../models/usuario.model';
import { carritoService } from '../services/carrito.service';
import { ordenService } from '../services/orden.service';

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

  static async agregaProductoACarrito(req: Request, res: Response) {
    const usuario_id = res.locals.verified._id;
    const aCarrito = res.locals.aCarrito;
    const actualizado = await carritoService.agregaProductoAlCarrito(
      usuario_id,
      aCarrito
    );
    res.status(200).json({ carrito: actualizado });
  }

  // Se pasa la direccion a traves del req.body:
  // - calle
  // - altura
  // - zipcode (para ahorrar a la hora de escribir)
  // - piso
  // - departamento
  // Calcula el total de los items en el carro, junta toda la info y crea una orden en la colección
  static async preparaOrden(req: Request, res: Response) {
    const usuario_id = res.locals.verified._id;
    const email: string = res.locals.verified.email;
    const direccion: IDireccion = { ...req.body };
    const carrito = await carritoService.preparaOrden(usuario_id);
    const payload: IOrden = {
      usuario_id,
      email,
      ...carrito,
      estado: 'generado',
      direccion,
    };
    const orden = await ordenService.creaOrden(payload);
    await carritoService.vaciaCarrito(usuario_id);
    res.status(200).json({ orden });
  }

  static async eliminaProductoEnCarrito(req: Request, res: Response) {}

  // Middlewares
  // Detiene ejecución si el carrito está vacío
  static async paraSiEstaVacio(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (await carritoService.estaVacio(res.locals.verified._id)) {
      return res.status(400).json({ msg: 'El carrito no tiene productos' });
    }
    next();
  }

  static async estaProductoEnCarrito(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const usuario_id = res.locals.verified._id;
    const producto_id = req.body.producto_id;
    console.log(usuario_id, producto_id);
    const esta = await carritoService.estaProductoEnCarrito(
      usuario_id,
      producto_id
    );
    console.log(esta);
    if (!esta) {
      return res
        .status(400)
        .json({ msg: `El producto ${producto_id} no esta en el carrito` });
    }
    res.locals.encarrito = esta;
    next();
  }

  static async quedaSuficiente(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.json({ msg: res.locals.encarrito });
    // const aEliminar = req.body.cantidad
    // const existente = res.locals.encarrito.cantidad
  }
}
