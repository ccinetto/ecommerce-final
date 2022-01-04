import { Types } from 'mongoose';
import { carritoModel, ICarrito, IOrden } from '../models/carrito.model';
import { ProductoACarritoDto } from '../models/producto.model';

export class carritoService {
  static async listaCarritoTodos(usuario_id: String): Promise<ICarrito[]> {
    const todos = await carritoModel.find({ usuario_id }).exec();
    return todos;
  }

  static async creaCarrito(usuario_id: string): Promise<ICarrito> {
    const newCarrito = new carritoModel({ usuario_id, productos: [] });
    newCarrito.save();
    return newCarrito;
  }

  static async agregaProductoAlCarrito(
    usuario_id: string,
    productoParaAgregar: ProductoACarritoDto
  ): Promise<ICarrito | null> {
    const existente = await carritoModel.findOneAndUpdate(
      {
        usuario_id,
        'productos.producto_id': productoParaAgregar.producto_id,
      },
      { $inc: { 'productos.$.cantidad': productoParaAgregar.cantidad } }
    );
    if (!existente) {
      const actualizado = await carritoModel.findOneAndUpdate(
        { usuario_id },
        { $push: { productos: productoParaAgregar } }
      );
      return actualizado;
    } else {
      return existente;
    }
  }

  static async preparaOrden(usuario_id: string) {
    const carrito = await carritoModel.findOne({ usuario_id });
    const items = carrito!.productos.map(item => {
      const contenedor = {} as IOrden;
      contenedor._id = String(item.producto_id);
      contenedor.precio = item.precio;
      contenedor.cantidad = item.cantidad;
      return contenedor;
    });
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.precio * item.cantidad;
    }, 0);
    return { items, total };
  }

  static async vaciaCarrito(usuario_id: string) {
    const carrito = await carritoModel.findOne({ usuario_id });
    carrito!.productos = [];
    carrito!.save();
    return carrito;
  }

  static async borraCarrito(usuario_id: string) {
    const carrito = await carritoModel.findOneAndDelete({ usuario_id });
    return carrito;
  }

  static async estaVacio(usuario_id: string): Promise<boolean> {
    const carrito = await carritoModel.findOne({ usuario_id });
    const vacio = carrito!.productos === [];
    return vacio;
  }
}
