import { Schema, Document, model, Types } from 'mongoose';

export interface ICarrito extends Document {
  usuario_id: Types.ObjectId;
  productos: {
    producto_id: Types.ObjectId;
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
}

export interface IOrden {
  _id: string;
  precio: number;
  cantidad: number;
}

const carritoSchema = new Schema<ICarrito>({
  usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [
    {
      producto_id: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
      },
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
    },
  ],
});

export const carritoModel = model<ICarrito>('Carrito', carritoSchema);
