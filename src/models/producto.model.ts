import { Schema, model, Document } from 'mongoose';

export interface IProducto extends Document {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  fotos: [string];
}

export interface ProductoACarritoDto {
  producto_id: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

const productoSchema = new Schema<IProducto>(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    fotos: [String],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const productoModel = model<IProducto>('Producto', productoSchema);
