import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { ordenController } from '../controllers/orden.controller';

export const routerOrden = Router();

// Muestra todas las ordenes
routerOrden.get('/', ordenController.listaTodasLasOrdenes);

// Muestra la orden con determinado id
routerOrden.get('/:id', ordenController.listaUnaOrden);

// Cambia el estado de la orden a finalizado si exite, su estada es generado y su id se indico en el body
routerOrden.post(
  '/finaliza',
  authController.checkForBody,
  ordenController.paraSiNoExisteLaOrden,
  ordenController.paraSiNoGenerada,
  ordenController.finalizaOrden
);
