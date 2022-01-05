import express from 'express';
import path from 'path';
import { authController } from '../controllers/auth.controller';
import { authRouter } from '../routes/auth.routes';
import { routerCarrito } from '../routes/carrito.routes';
import { routerOrden } from '../routes/orden.routes';
import { routerProducto } from '../routes/productos.routes';
import { routerUsuario } from '../routes/usuario.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Expone los endpoints signup y login
app.use('/', authRouter);

// Muestra el unico elemento de front
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// Middleware para asegurarse que esta logueado un usuario
app.use(authController.verificaTokenMiddleware);

// Endpoints de la api
app.use('/api/usuario', routerUsuario);
app.use('/api/producto', routerProducto);
app.use('/api/carrito', routerCarrito);
app.use('/api/orden', routerOrden);

export default app;
