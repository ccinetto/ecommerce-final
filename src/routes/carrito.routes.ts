import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { carritoController } from '../controllers/carrito.controller';
import { productoController } from '../controllers/producto.controller';

export const routerCarrito = Router();

// Muestra todos los carritos
routerCarrito.get('/', carritoController.listAllCarrito);

// Agrego item al carrito, con las salvaguardas que este el body declarado y el producto exista
routerCarrito.post(
  '/add',
  authController.checkForBody,
  productoController.paraSiNoExisteElProducto,
  productoController.productoACarrito,
  carritoController.agregaProductoACarrito
);

// Si el carrito tiene items y se suministro la direccion crea una orden y guardala en su coleccion
routerCarrito.get(
  '/checkout',
  carritoController.paraSiEstaVacio,
  authController.checkForBody,
  carritoController.preparaOrden
);
