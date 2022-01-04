import { Router } from 'express';
import { productoController } from '../controllers/producto.controller';

export const routerProducto = Router();

routerProducto.get('/', productoController.listAllProductos);

routerProducto.get(
  '/:id',
  productoController.paraSiNoExisteElProducto,
  productoController.listaUnProducto
);

routerProducto.post('/', productoController.creaProducto);

routerProducto.put(
  '/:id',
  productoController.paraSiNoExisteElProducto,
  productoController.updateProducto
);

routerProducto.delete(
  '/:id',
  productoController.paraSiNoExisteElProducto,
  productoController.deleteProducto
);
