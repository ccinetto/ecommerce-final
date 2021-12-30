import { model, Schema, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
import Config from '../utils/config';

export interface IUsuarioInput {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
  admin: boolean;
}

export interface IUsuarioToken {
  _id?: ObjectId;
  email: string;
  admin: boolean;
  // iat: number;
  // exp: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUsuarioDoc extends IUsuarioInput, Document {
  comparePassword(passwordSuministrado: string): Promise<boolean>;
}

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

usuarioSchema.pre('save', async function (next) {
  const usuario = this;
  if (usuario.isModified('password')) {
    // const salt = await bcrypt.genSalt(Number(Config.salt_rounds));
    usuario.password = await bcrypt.hash(usuario.password, Config.salt_rounds);
  }
  next();
});

usuarioSchema.methods.comparePassword = async function (
  passwordSuministrado: string
): Promise<boolean> {
  const usuario = this;
  return bcrypt
    .compare(passwordSuministrado, usuario.password)
    .catch(e => false);
};

export const usuarioModel = model<IUsuarioDoc>('Usuario', usuarioSchema);
