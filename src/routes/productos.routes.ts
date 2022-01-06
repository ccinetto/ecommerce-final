import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { productoController } from '../controllers/producto.controller';
import { idValidator } from '../validations/id.validation';
import { productoValidation } from '../validations/producto.validation';

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
  productoValidation.agregaProductoValidation,
  productoController.creaProducto
);

// Solo un administrador puede editar un producto
routerProducto.patch(
  '/:id',
  authController.adminOnly,
  idValidator,
  productoController.paraSiNoExisteElProducto,
  productoValidation.modificaProductoValidation,
  productoController.updateProducto
);

// Solo un administrador puede borrar un producto
routerProducto.delete(
  '/:id',
  authController.adminOnly,
  idValidator,
  productoController.paraSiNoExisteElProducto,
  productoController.deleteProducto
);
