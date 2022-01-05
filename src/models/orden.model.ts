import { Document, model, Schema, Types } from 'mongoose';

export interface IDireccion {
  calle: string;
  altura: string;
  zipcode: string;
  piso: string;
  departamento: string;
}

export interface IOrden {
  usuario_id: Types.ObjectId;
  email: string;
  items: {
    _id: string;
    cantidad: number;
    precio: number;
  }[];
  estado: string;
  total: number;
  direccion: IDireccion;
}

const ordenSchema = new Schema<IOrden>(
  {
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    email: { type: String, required: true },
    items: [
      {
        _id: {
          type: String,
          required: true,
        },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
      },
    ],
    estado: {
      type: String,
      enum: ['generado', 'pagado', 'enviando', 'finalizado'],
      default: 'generado',
      required: true,
    },
    total: { type: Number, required: true },
    direccion: {
      calle: { type: String, required: true },
      altura: { type: String, required: true },
      zipcode: { type: String, required: true },
      piso: String,
      departamento: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const ordenModel = model<IOrden>('Orden', ordenSchema);
