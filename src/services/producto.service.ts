import { IProducto, productoModel } from '../models/producto.model';

export class productoService {
  // Crud
  static async creaProducto(payload: IProducto): Promise<IProducto> {
    const nuevo = new productoModel({ ...payload });
    nuevo.save();
    return nuevo;
  }

  // cRud
  static async listaProductosTodos(): Promise<IProducto[]> {
    const todos = await productoModel.find();
    return todos;
  }

  static async listaUnProductoPorId(id: string): Promise<IProducto | null> {
    const uno = await productoModel.findOne({ id });
    return uno;
  }

  // Permito la salida null que aparee en caso de no encontrar el documento,
  // pero excluyo ese comportamiento definiendo un middleware
  static async encuentraProductoPorId(id: String): Promise<IProducto | null> {
    const producto = await productoModel.findOne({ id });
    return producto;
  }

  // crUd
  // Permito la salida null que aparee en caso de no encontrar el documento,
  // pero excluyo ese comportamiento definiendo un middleware
  static async actualizaProductoPorId(
    id: String,
    payload: IProducto
  ): Promise<IProducto | null> {
    const actualizado = await productoModel.findOneAndUpdate(
      { id },
      { ...payload }
    );
    return actualizado;
  }

  // cruD
  static async borraProductoPorId(id: String): Promise<void> {
    await productoModel.findOneAndDelete({ id });
  }

  // Utilities
  static async existeProducto(id: String): Promise<boolean> {
    const existe = await productoModel.exists({ id });
    return existe;
  }
}
