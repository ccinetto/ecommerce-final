import mongoose from 'mongoose';
import UsuarioSchema from '../schemas/usuario.schema';
import {
  IUsuario,
  IUsuarioNuevo,
  BaseClassUsuario,
} from '../interfaces/usuario.interface';

// const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

class UsuarioModel implements BaseClassUsuario {
  private usuarios;
  constructor() {
    this.usuarios = mongoose.model<IUsuario>('Usuarios', UsuarioSchema);
  }
  async add(data: IUsuarioNuevo): Promise<IUsuario> {
    const nuevo = new this.usuarios(data);
    nuevo.save();
    return nuevo;
  }

  async update(
    id: string,
    dataUsuario: IUsuarioNuevo
  ): Promise<IUsuario | null> {
    return this.usuarios.findByIdAndUpdate(id, dataUsuario);
  }

  async delete(id: string): Promise<void> {
    this.usuarios.findByIdAndDelete(id);
  }
}
