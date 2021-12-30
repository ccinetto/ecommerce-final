import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import { IProducto } from '../models/producto.model';
import {
  actualizaProductoPorId,
  borraProductoPorId,
  existeProducto,
  listaProductosTodos,
} from '../services/producto.service';

// Middlewares
export const paraSiNoExisteElProducto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const existe = await existeProducto(id);
  if (!existe) {
    return res.status(400).json({ msg: `No existe el producto ${id}` });
  } else {
    next();
  }
};

export const listAll = async (req: Request, res: Response) => {
  const todos = await listaProductosTodos();
  res.status(200).json({ usuarios: todos });
};

// Asegurarse que no exista ese producto en ninguna orden no entregada ni en ningun carrito
export const deleteProducto = async (req: Request, res: Response) => {
  const id = req.params.id;
  await borraProductoPorId(id);
  res.status(200).json({
    msg: `Producto eliminado exitosamente `,
  });
};

export const updateProducto = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const payload: IProducto = req.body;
  await actualizaProductoPorId(id, payload);
  res.status(200).json({ msg: `Actualizado el producto ${id}` });
};
