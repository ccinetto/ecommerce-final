import { Request, Response, NextFunction } from 'express';
import { IProducto } from '../models/producto.model';
import { productoService } from '../services/producto.service';

export class productoController {
  // Middlewares
  // Detiene la ejecución si no existe el producto cuya id se indica en el body con req.body.producto_id O en params
  // con req.params.id
  static async paraSiNoExisteElProducto(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.body.producto_id || req.params.id;
    const existe = await productoService.listaUnProductoPorId(id);
    if (!existe) {
      return res
        .status(400)
        .json({ msg: `El producto ${id} no se encuentra registrado` });
    }
    next();
  }

  // Middleware donde se preparan los campos de productos usados en el carrito
  // se requiere un body con:
  // - producto_id
  // - cantidad
  // se guarda en res.local.aCarrito
  // se detiene la ejecucion  si la cantidad solicitada supera el stock disponible
  static async productoACarrito(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const producto_id = req.body.producto_id;
    const cantidad = req.body.cantidad;
    const aCarrito = await productoService.preparaProductoParaCarrito(
      producto_id,
      cantidad
    );
    if (!aCarrito) {
      return res.status(400).json({
        msg: `No hay suficientes existencias del producto ${producto_id}`,
      });
    }
    res.locals.aCarrito = aCarrito;
    next();
  }

  // Para los endpoints
  static async listAllProductos(req: Request, res: Response) {
    const todos = await productoService.listaProductosTodos();
    res.status(200).json({ productos: todos });
  }

  static async listaUnProducto(req: Request, res: Response) {
    const id = req.params.id;
    const uno = await productoService.listaUnProductoPorId(id);
    if (!uno) {
      return res.status(400).json({ msg: `No existe el producto ${id}` });
    }
    res.status(200).json({ usuario: uno });
  }

  static async listaUnProductoPorCategoria(req: Request, res: Response) {
    const categoria = req.params.categoria;
    const varios = await productoService.encuentraProductoPorCategoria(
      categoria
    );
    if (!varios) {
      return res.status(400).json({
        msg: `Ningun producto tiene la categoria ${categoria} asignada`,
      });
    }
    res.status(200).json({ categoria: varios });
  }

  // Se requiere un body con:
  // - nombre
  // - descripcion
  // - categoria
  // - precio
  // - stock
  // - fotos (en array)
  // Genera un 201 si si crea exitosamente el producto
  static async creaProducto(req: Request, res: Response) {
    const payload = req.body;
    if (!payload) {
      return res
        .status(400)
        .json({ msg: `No se suministró informacion de entrada` });
    }
    const nuevo = await productoService.creaProducto(payload);
    res.status(201).json({ nuevo: nuevo });
  }

  // Asegurarse que no exista ese producto en ninguna orden no entregada ni en ningun carrito
  static async deleteProducto(req: Request, res: Response) {
    const id = req.params.id;
    const eliminado = await productoService.borraProductoPorId(id);
    res.status(200).json({
      msg: eliminado,
    });
  }

  static async updateProducto(req: Request, res: Response) {
    const id: string = req.params.id;
    const payload: IProducto = req.body;
    await productoService.actualizaProductoPorId(id, payload);
    res.status(200).json({ msg: `Actualizado el producto ${id}` });
  }
}
