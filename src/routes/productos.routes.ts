import { Router } from 'express';
import { productoController } from '../controllers/producto.controller';

export const routerProductos = Router();

routerProductos.get('/', productoController.listAllProductos);

routerProductos.get(
  '/:id',
  productoController.paraSiNoExisteElProducto,
  productoController.listaUnProducto
);

routerProductos.post('/', productoController.creaProducto);

routerProductos.put(
  '/:id',
  productoController.paraSiNoExisteElProducto,
  productoController.updateProducto
);

routerProductos.delete(
  '/:id',
  productoController.paraSiNoExisteElProducto,
  productoController.deleteProducto
);
