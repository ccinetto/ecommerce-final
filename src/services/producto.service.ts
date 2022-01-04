import { Types } from 'mongoose';
import {
  IProducto,
  ProductoACarritoDto,
  productoModel,
} from '../models/producto.model';

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
    // const uno = await productoModel.findOne({ id });
    const uno = await productoModel.findById(id);
    return uno;
  }

  static async preparaProductoParaCarrito(
    id: string,
    cantidad: number
  ): Promise<ProductoACarritoDto | null> {
    // console.log(id);
    const producto = await this.listaUnProductoPorId(id);
    if (producto) {
      const restante: number = producto.stock - cantidad;
      // console.log(restante);
      if (restante >= 0) {
        await producto.updateOne({ stock: restante });
        return {
          producto_id: producto._id,
          nombre: producto.nombre,
          cantidad: cantidad,
          precio: producto.precio,
        };
      }
    }
    return null;
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
    id: string,
    payload: IProducto
  ): Promise<IProducto | null> {
    const actualizado = await productoModel.findOneAndUpdate(
      { id },
      { ...payload }
    );
    return actualizado;
  }

  // cruD
  static async borraProductoPorId(id: string): Promise<void> {
    await productoModel.findOneAndDelete({ id });
  }

  // Utilities
  static async existeProducto(id: string): Promise<boolean> {
    const existe = await productoModel.findOne({ id });
    console.log(existe);
    if (existe) {
      return true;
    } else {
      return false;
    }
  }
}
