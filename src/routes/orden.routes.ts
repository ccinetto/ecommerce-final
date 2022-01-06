import { Router } from 'express';
import { ordenController } from '../controllers/orden.controller';
import { idValidator } from '../validations/id.validation';
import { ordenValidation } from '../validations/orden.validation';

export const routerOrden = Router();

// Muestra todas las ordenes
routerOrden.get('/', ordenController.listaTodasLasOrdenes);

// Muestra la orden con determinado id
routerOrden.get('/:id', idValidator, ordenController.listaUnaOrden);

// Cambia el estado de la orden a finalizado si exite, su estada es generado y su id se indico en el body
routerOrden.post(
  '/finaliza',
  ordenValidation.finalizaOrdenValidation,
  ordenController.paraSiNoExisteLaOrden,
  ordenController.paraSiNoGenerada,
  ordenController.finalizaOrden
);
