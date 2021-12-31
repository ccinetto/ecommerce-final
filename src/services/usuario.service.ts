import {
  usuarioModel,
  IUsuarioInput,
  IUsuarioDoc,
} from '../models/usuario.model';

export class usuarioService {
  static async existeUsuario(email: IUsuarioDoc['email']): Promise<boolean> {
    return await usuarioModel.exists({ email });
  }

  static async listaUsuariosTodos(): Promise<IUsuarioDoc[]> {
    const todos = await usuarioModel.find();
    return todos;
  }

  static async creaUsuario(entrada: IUsuarioInput): Promise<IUsuarioDoc> {
    const nuevo = new usuarioModel(entrada);
    nuevo.save();
    return nuevo;
  }

  static async encuentraUsuarioPorEmail(
    email: IUsuarioDoc['email'],
    opciones = { lean: false }
  ): Promise<IUsuarioDoc | null> {
    const usuario = await usuarioModel.findOne({ email }, opciones);
    return usuario;
  }

  static async borraUsuarioPorEmail(
    email: IUsuarioDoc['email']
  ): Promise<void> {
    await usuarioModel.findOneAndDelete({ email });
  }

  static async autorizadoPorEmail(
    email: IUsuarioDoc['email'],
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
