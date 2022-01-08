import { swId } from '../validations/id.validation';
import {
  swAgregaProductoSchema,
  swModificaProductoSchema,
} from '../validations/producto.validation';

const swAgregaProducto = {
  tags: ['producto'],
  summary: 'Agrega un producto a la lista de productos',
  description: '',
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
  summary:
    'Cambia uno o varios campos del producto, segun lo que se indique en el body',
  description: '',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Requiere el id del producto',
      required: true,
      schema: { ...swId },
    },
    {
      in: 'body',
      name: 'body',
      description:
        'Requiere alguno de los campor nombre, descripcion, categoria, precio, stock, fotos (en array)',
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

const swBorraProductoPorId = {
  tags: ['producto'],
  summary: 'Elimina el producto con el id suministrado',
  description: '',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Requiere el id del producto',
      required: true,
      schema: { ...swId },
    },
  ],
  responses: {
    200: {
      description: 'Producto eliminado',
    },
    400: {
      description: 'No existe el producto',
    },
  },
};

const swMuestraProductosPorCategoria = {
  tags: ['producto'],
  summary: 'Muestra los productos con la categroia correspondiente',
  description: '',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      name: 'categoria',
      description: 'Requiere la categoria de los productos',
      required: true,
    },
  ],
  responses: {
    200: {
      description: 'Lista de productos con la categoria',
    },
    400: {
      description: 'No existe esa categoria entre los productos',
    },
  },
};

const swMuestraProductos = {
  tags: ['producto'],
  summary: 'Muestra una lista de todos los procuctos',
  description: '',
  produces: 'application/json',
  responses: {
    200: {
      description: 'Lista de productos',
    },
  },
};

export const swProductoRouter = {
  '/api/producto': {
    get: { ...swMuestraProductos },
    post: { ...swAgregaProducto },
  },
  '/api/produto/:categoria': {
    get: { ...swMuestraProductosPorCategoria },
  },
  '/api/producto/:id': {
    patch: { ...swModificaProducto },
    delete: { ...swBorraProductoPorId },
  },
};
