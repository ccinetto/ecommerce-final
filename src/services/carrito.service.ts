import { Types } from 'mongoose';
import { carritoModel, ICarrito } from '../models/carrito.model';

export const creaCarrito = async (
  usuario_id: Types.ObjectId
): Promise<ICarrito> => {
  const newCarrito = new carritoModel({ usuario_id, productos: [] });
  newCarrito.save();
  return newCarrito;
};

export const borraCarrito = async (
  usuario_id: Types.ObjectId
): Promise<void> => {
  await carritoModel.findOneAndDelete({ usuario_id });
};
