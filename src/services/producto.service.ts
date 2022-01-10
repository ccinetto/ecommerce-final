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
    const uno = await productoModel.findOne({ _id: id });
    return uno;
  }

  // Acá se extrae informacion del documento de productos para tener la informacion necesaria para poder incluirlo en el carrito
  static async preparaProductoParaCarrito(
    id: string,
    cantidad: number
  ): Promise<ProductoACarritoDto | null> {
    const producto = await this.listaUnProductoPorId(id);
    if (producto) {
      const restante: number = producto.stock - cantidad; // Verifica que la cantidad que se quiere incluir en el carro no sobrepase el stock
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

  static async encuentraProductoPorCategoria(
    categoria: string
  ): Promise<IProducto[] | null> {
    const producto = await productoModel.find({ categoria });
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
  static async restockPorId(id: string, cantidad: number): Promise<void> {
    await productoModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { stock: cantidad },
      }
    );
  }

  static async agregaImagen(
    producto_id: string,
    imagen_id: string
  ): Promise<IProducto | null> {
    const producto = productoModel.findOneAndUpdate(
      {
        _id: producto_id,
      },
      {
        $push: { fotos: imagen_id },
      },
      {
        new: true,
      }
    );
    return producto;
  }

  static async existeProducto(id: string): Promise<boolean> {
    const existe = await productoModel.findOne({ id });
    // console.log(existe);
    if (existe) {
      return true;
    } else {
      return false;
    }
  }
}
