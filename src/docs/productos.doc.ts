import {
  swAgregaProductoSchema,
  swModificaProductoSchema,
} from '../validations/producto.validation';

const swAgregaProducto = {
  tags: ['producto'],
  summary: 'Agrega un producto a la lista de productos',
  description: '',
  //   operationId: 'addPet',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description:
        'Requiere - nombre, descripcion, categoria, precio, stock, fotos (en array)',
      required: true,
      schema: { ...swAgregaProductoSchema },
    },
  ],
  responses: {
    201: {
      description: 'Producto agregado',
    },
    400: {
      description: 'No se puede agregar el producto',
    },
  },
};

const swModificaProducto = {
  tags: ['producto'],
  summary: 'Agrega un producto a la lista de productos',
  description: '',
  //   operationId: 'addPet',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description:
        'Requiere - nombre, descripcion, categoria, precio, stock, fotos (en array)',
      required: true,
      schema: { ...swModificaProductoSchema },
    },
  ],
  responses: {
    201: {
      description: 'Producto mofidicado',
    },
    400: {
      description: 'No se pudo modificar el producto',
    },
  },
};

export const swProductoRouter = {
  '/api/producto': {
    post: { ...swAgregaProducto },
  },
  '/api/producto/:id': {
    patch: { ...swModificaProducto },
  },
};
