import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authRouter } from '../routes/auth.routes';
import { routerCarrito } from '../routes/carrito.routes';
import { routerOrden } from '../routes/orden.routes';
import { routerProducto } from '../routes/productos.routes';
import { routerUsuario } from '../routes/usuario.routes';
import { routerImagen } from './imagen.routes';

export const router = Router();

router.use('/api/user', authRouter);
// Middleware para asegurarse que esta logueado un usuario
router.use(authController.verificaTokenMiddleware);
// Endpoints de la api
// router.use('/api/usuario', routerUsuario);
router.use('/api/products', routerProducto);
router.use('/api/cart', routerCarrito);
router.use('/api/order', routerOrden);
router.use('/api/image', routerImagen);
