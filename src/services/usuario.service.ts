import {
  usuarioModel,
  IUsuarioInput,
  IUsuarioDoc,
} from '../models/usuario.model';

export const existeUsuario = async (
  email: IUsuarioDoc['email']
): Promise<boolean> => {
  return await usuarioModel.exists({ email });
};

export const listaUsuariosTodos = async (): Promise<IUsuarioDoc[]> => {
  const todos = await usuarioModel.find();
  return todos;
};

export const creaUsuario = async (
  entrada: IUsuarioInput
): Promise<IUsuarioDoc> => {
  const nuevo = new usuarioModel(entrada);
  nuevo.save();
  return nuevo;
};

export const encuentraUsuarioPorEmail = async (
  email: IUsuarioDoc['email'],
  opciones = { lean: false }
): Promise<IUsuarioDoc | null> => {
  const usuario = await usuarioModel.findOne({ email }, opciones);
  return usuario;
};

export const borraUsuarioPorEmail = async (
  email: IUsuarioDoc['email']
): Promise<void> => {
  await usuarioModel.findOneAndDelete({ email });
};

export const autorizadoPorEmail = async (
  email: IUsuarioDoc['email'],
  passwordSuministrado: string
): Promise<boolean> => {
  const usuario = await encuentraUsuarioPorEmail(email);
  if (usuario) {
    const autorizado = await usuario.comparePassword(passwordSuministrado);
    return autorizado;
  }
  return false; // default si no existe el usuario
};
