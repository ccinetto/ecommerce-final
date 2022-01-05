import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { ordenController } from '../controllers/orden.controller';

export const routerOrden = Router();

routerOrden.get('/', ordenController.listaTodasLasOrdenes);

routerOrden.get('/:id', ordenController.listaUnaOrden);

routerOrden.post(
  '/finaliza',
  authController.checkForBody,
  ordenController.paraSiNoExisteLaOrden,
  ordenController.paraSiNoGenerada,
  ordenController.finalizaOrden
);
