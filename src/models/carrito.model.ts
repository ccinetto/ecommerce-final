import { Schema, Document, model, Types } from 'mongoose';

interface IProductoEnCarrito {
  _id: string;
  cantidad: number;
  precio: number;
}

export interface ICarrito {
  usuario_id: Types.ObjectId;
  productos: [IProductoEnCarrito];
}

const carritoSchema = new Schema({
  usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [
    {
      producto_id: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
      },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
    },
  ],
});

export const carritoModel = model('Carrito', carritoSchema);
