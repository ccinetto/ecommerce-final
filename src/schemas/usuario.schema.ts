import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new Schema({
  nombre: { type: String, required: [true, 'Se requiere el nombre completo'] },
  email: {
    type: String,
    required: [true, 'Se requiere el email'],
    unique: true,
  },
  telefono: { type: String, required: [true, 'Se requiere el telefono'] },
  password: { type: String, required: [true, 'Se requiere el password'] },
  admin: { type: Boolean, required: [true, 'Indica un password'] },
});

UsuarioSchema.pre('save', async function (next) {
  const usuario = this;
  if (usuario.isModified('password')) {
    usuario.password = await bcrypt.hash(usuario.password, 10);
  }
  next();
});

export default UsuarioSchema;
