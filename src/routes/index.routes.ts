import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authRouter } from '../routes/auth.routes';
import { routerCarrito } from '../routes/carrito.routes';
import { routerOrden } from '../routes/orden.routes';
import { routerProducto } from '../routes/productos.routes';
import { routerUsuario } from '../routes/usuario.routes';
import { routerImagen } from './imagen.routes';

export const router = Router();

router.use('/', authRouter);
// Middleware para asegurarse que esta logueado un usuario
router.use(authController.verificaTokenMiddleware);
// Endpoints de la api
router.use('/api/usuario', routerUsuario);
router.use('/api/producto', routerProducto);
router.use('/api/carrito', routerCarrito);
router.use('/api/orden', routerOrden);
router.use('/api/imagen', routerImagen);
