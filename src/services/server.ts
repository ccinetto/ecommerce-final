import express from 'express';
import { verificaTokenMiddleware } from '../controllers/auth.controller';
import { authRouter } from '../routes/auth.routes';
import { routerUsuario } from '../routes/usuario.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hola ecommerce' });
});

app.use('/', authRouter);

app.use(verificaTokenMiddleware);

app.use('/usuario', routerUsuario);

export default app;
