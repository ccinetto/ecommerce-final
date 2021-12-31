import { Types } from 'mongoose';
import { carritoModel, ICarrito } from '../models/carrito.model';

export class carritoService {
  static async creaCarrito(usuario_id: Types.ObjectId): Promise<ICarrito> {
    const newCarrito = new carritoModel({ usuario_id, productos: [] });
    newCarrito.save();
    return newCarrito;
  }

  static async borraCarrito(usuario_id: Types.ObjectId): Promise<void> {
    await carritoModel.findOneAndDelete({ usuario_id });
  }
}
