import { carritoModel, ICarrito, IElegidos } from '../models/carrito.model';
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

  // La funcion generadora de mas dolores de cabeza con estos pipelines de mongo
  // Se intenta agregar productos al carrito
  // Si el producto ya existe en el array productos se incrementa la cantidad
  // Si el producto aun no estaba en el carrito se pushea al array productos
  static async agregaProductoAlCarrito(
    usuario_id: string,
    productoParaAgregar: ProductoACarritoDto
  ): Promise<ICarrito | null> {
    const existente = await carritoModel.findOneAndUpdate(
      {
        usuario_id,
        'productos.producto_id': productoParaAgregar.producto_id,
      },
      { $inc: { 'productos.$.cantidad': productoParaAgregar.cantidad } },
      { new: true }
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

  static async eliminaElProductoDelCarrito(
    usuario_id: string,
    productoParaAgregar: ProductoACarritoDto
  ): Promise<ICarrito | null> {
    const existente = await carritoModel.findOneAndUpdate(
      {
        usuario_id,
        'productos.producto_id': productoParaAgregar.producto_id,
      },
      { $inc: { 'productos.$.cantidad': productoParaAgregar.cantidad } },
      { new: true }
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
  // Calcula el precio total de la orden, map reduce al rescate
  // Intente hacerlo con aggregations de mongoose sin exito
  static async preparaOrden(usuario_id: string) {
    const carrito = await carritoModel.findOne({ usuario_id });
    console.log(carrito);
    const items = carrito!.productos.map(item => {
      const contenedor = {} as IElegidos;
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

  // Se declara el array productos como vacio, se use depues de haber generado la orden
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

  //  Controla que esté vacio el carro viendo la longitud del array productos
  static async estaVacio(usuario_id: string): Promise<boolean> {
    const carrito = await carritoModel.findOne({ usuario_id });
    const vacio = carrito!.productos.length === 0;
    return vacio;
  }

  static async estaProductoEnCarrito(
    usuario_id: string,
    producto_id: string
  ): Promise<ICarrito | null> {
    const existe = await carritoModel.findOne({
      usuario_id,
      'productos.producto_id': producto_id,
    });
    return existe;
  }
}
