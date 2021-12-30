import { Schema, model, Document } from 'mongoose';

export interface IProducto extends Document {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  fotos: [string];
}

const productoSchema = new Schema<IProducto>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  fotos: [String],
});

export const productoModel = model('Producto', productoSchema);
