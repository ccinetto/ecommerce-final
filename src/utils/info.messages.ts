import { IMensaje } from '../models/mensaje.model';
import { usuarioModel } from '../models/usuario.model';
import { carritoService } from '../services/carrito.service';
import { ordenService } from '../services/orden.service';
import { productoService } from '../services/producto.service';

export const mensajeBienvenida = (correo: string): string => {
  return `Bienvenido ${correo}, por favor haz tu consulta:
    - Stock: para conocer el stock actual
    - Orden: para conocer la informacion de la ultima orden
    - Carrito: para conocer el contenido del carrito
    `;
};

export const procesaMensaje = async (mensaje: IMensaje): Promise<IMensaje> => {
  const usuario = await usuarioModel.findOne({ email: mensaje.email });
  const id = usuario?._id;
  const procesado = mensaje.text.toLowerCase();
  let respuesta: string;
  if (procesado === 'stock') {
    respuesta = JSON.stringify(await productoService.listaProductosTodos());
  } else if (procesado === 'orden') {
    respuesta = JSON.stringify(await ordenService.listaOrdenesTodas());
  } else if (procesado === 'carrito') {
    respuesta = JSON.stringify(await carritoService.listaCarritoTodos(id));
  } else {
    respuesta = `No entendi tu pedido: por favor escribe, stock, orden o carrito`;
  }
  return {
    email: 'sistema',
    text: respuesta,
  };
};
