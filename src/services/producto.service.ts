import { Types } from 'mongoose';
import { IProducto, productoModel } from '../models/producto.model';

// Crud
export const creaProducto = async (payload: IProducto): Promise<IProducto> => {
  const nuevo = new productoModel({ payload });
  nuevo.save();
  return nuevo;
};

// cRud
export const listaProductosTodos = async (): Promise<IProducto[]> => {
  const todos = await productoModel.find();
  return todos;
};

// Permito la salida null que aparee en caso de no encontrar el documento,
// pero excluyo ese comportamiento definiendo un middleware
export const encuentraProductoPorId = async (
  id: String
): Promise<IProducto | null> => {
  const producto = await productoModel.findOne({ id });
  return producto;
};

// crUd
// Permito la salida null que aparee en caso de no encontrar el documento,
// pero excluyo ese comportamiento definiendo un middleware
export const actualizaProductoPorId = async (
  id: String,
  payload: IProducto
): Promise<IProducto | null> => {
  const actualizado = await productoModel.findOneAndUpdate({ id }, payload);
  return actualizado;
};

// cruD
export const borraProductoPorId = async (id: String): Promise<void> => {
  await productoModel.findByIdAndDelete({ id });
};

// Utilities
export const existeProducto = async (id: String): Promise<boolean> => {
  const existe = await productoModel.exists({ id });
  return existe;
};
