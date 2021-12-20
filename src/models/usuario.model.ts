import mongoose from 'mongoose';
import UsuarioSchema from '../schemas/usuario.schema';

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);
