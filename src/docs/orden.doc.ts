import { swFinalizaOrdenSchema } from '../validations/orden.validation';

const swMuestraOrdenes = {
  tags: ['orden'],
  summary: 'Muestra una lista de todas las ordenes',
  description: '',
  produces: 'application/json',
  responses: {
    200: {
      description: 'Lista de ordenes',
    },
  },
};

const swMuestraUnaOrden = {
  tags: ['orden'],
  summary: 'Muestra una orden con el id suministrado',
  description: '',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Requiere el id de la orden',
      required: true,
    },
  ],
  responses: {
    200: {
      description: 'Orden solicitada',
    },
    400: {
      description: 'No se encuentra la orden',
    },
  },
};

const swFinaliza = {
  tags: ['orden'],
  summary: 'Cambia el estado de la orden a finalizado',
  description: '',
  produces: 'application/json',
  consumes: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'orden_id',
      description: 'Requiere el id de la orden',
      required: true,
      schema: { ...swFinalizaOrdenSchema },
    },
  ],
  responses: {
    200: {
      description: 'Cambio de estado exitoso',
    },
    400: {
      description: 'No se encuentra la orden',
    },
  },
};

export const swOrdenRouter = {
  '/api/orden': {
    get: { ...swMuestraOrdenes },
  },
  '/api/orden/:id': {
    get: { ...swMuestraUnaOrden },
  },
  '/api/orden/finaliza': {
    post: { ...swFinaliza },
  },
};
