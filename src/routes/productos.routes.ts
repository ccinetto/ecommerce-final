import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { productoController } from '../controllers/producto.controller';

export const routerProducto = Router();

routerProducto.get('/', productoController.listAllProductos);

// ruta deshabilitada solo se busca por categorias
// routerProducto.get('/:id', productoController.listaUnProducto);

routerProducto.get(
  '/:categoria',
  productoController.listaUnProductoPorCategoria
);

// Solo un administrador puede crear un producto
routerProducto.post(
  '/',
  authController.adminOnly,
  productoController.creaProducto
);

// Solo un administrador puede editar un producto
routerProducto.patch(
  '/:id',
  authController.adminOnly,
  productoController.paraSiNoExisteElProducto,
  productoController.updateProducto
);

// Solo un administrador puede borrar un producto
routerProducto.delete(
  '/:id',
  authController.adminOnly,
  productoController.paraSiNoExisteElProducto,
  productoController.deleteProducto
);
