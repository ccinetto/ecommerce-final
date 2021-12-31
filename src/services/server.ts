import express from 'express';
import { authController } from '../controllers/auth.controller';
import { authRouter } from '../routes/auth.routes';
import { routerProductos } from '../routes/productos.routes';
import { routerUsuario } from '../routes/usuario.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hola ecommerce' });
});

app.use('/', authRouter);

app.use(authController.verificaTokenMiddleware);

app.use('/api/usuario', routerUsuario);
app.use('/api/producto', routerProductos);

export default app;
