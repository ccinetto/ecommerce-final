import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { carritoController } from '../controllers/carrito.controller';
import { productoController } from '../controllers/producto.controller';

export const routerCarrito = Router();

routerCarrito.get('/', carritoController.listAllCarrito);

routerCarrito.post(
  '/add',
  authController.checkForBody,
  productoController.paraSiNoExisteElProducto,
  productoController.productoACarrito,
  carritoController.agregaProdcutoACarrito
);

routerCarrito.get(
  '/checkout',
  carritoController.paraSiEstaVacio,
  authController.checkForBody,
  carritoController.preparaOrden
);
