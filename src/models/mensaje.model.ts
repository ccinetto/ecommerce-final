import { string } from 'joi';
import { model, Schema } from 'mongoose';

export interface IMensaje {
  email: string;
  text: string;
}

const mensajeSchema = new Schema(
  {
    email: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

export const mensajeModel = model('Mensaje', mensajeSchema);
