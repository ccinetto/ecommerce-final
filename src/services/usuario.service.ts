import {
  usuarioModel,
  IUsuario,
  // IUsuarioInput,
  // IUsuarioDoc,
} from '../models/usuario.model';

export class usuarioService {
  static async existeUsuario(email: IUsuario['email']): Promise<boolean> {
    return await usuarioModel.exists({ email });
  }

  static async listaUsuariosTodos(): Promise<IUsuario[]> {
    const todos = await usuarioModel.find();
    return todos;
  }

  static async creaUsuario(entrada: IUsuario): Promise<IUsuario> {
    const nuevo = new usuarioModel(entrada);
    nuevo.save();
    return nuevo;
  }

  static async encuentraUsuarioPorEmail(
    email: IUsuario['email'],
    opciones = { lean: false }
  ): Promise<IUsuario | null> {
    const usuario = await usuarioModel.findOne({ email }, opciones);
    return usuario;
  }

  static async borraUsuarioPorEmail(email: IUsuario['email']): Promise<void> {
    await usuarioModel.findOneAndDelete({ email });
  }

  // Acá se usa el metodo comparePasswords definido junto con el esquema,
  static async autorizadoPorEmail(
    email: IUsuario['email'],
    passwordSuministrado: string
  ): Promise<boolean> {
    const usuario = await this.encuentraUsuarioPorEmail(email);
    if (usuario) {
      const autorizado = await usuario.comparePassword(passwordSuministrado);
      return autorizado;
    }
    return false; // default si no existe el usuario
  }
}
