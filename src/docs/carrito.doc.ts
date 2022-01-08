import {
  swAgregaACarritoSchema,
  swCheckoutSchema,
} from '../validations/carrito.validations';

const swMuestraCarrito = {
  tags: ['carrito'],
  summary: 'Muestra una lista de todos los procuctos que estan en el carrito',
  description: '',
  produces: 'application/json',
  responses: {
    200: {
      description: 'Lista de productos en el carrito',
    },
  },
};

const swAgregaACarrito = {
  tags: ['carrito'],
  summary:
    'Agrega un producto al carrito o incrementa su cantidad si ya estaba en la lista',
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
      schema: { ...swAgregaACarritoSchema },
    },
  ],
  responses: {
    201: {
      description: 'Producto agregado al carrito',
    },
    400: {
      description: 'No se puede agregar el producto',
    },
  },
};

const swCheckout = {
  tags: ['carrito'],
  summary:
    'Crea una orden nueva con los productos que se encuentran en el carrito, luego vacia el carrito',
  description: '',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description:
        'En el body se indica la direccion de entrega, con calle, numero, altura, codigo postal, opcional piso y departamento',
      required: true,
      schema: { ...swCheckoutSchema },
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

export const swCarritoRouter = {
  '/api/carrito': {
    get: { ...swMuestraCarrito },
  },
  '/api/carrito/add': { post: { ...swAgregaACarrito } },
  '/api/carrito/checkout': { post: { ...swCheckout } },
  //   '/api/produto/{categoria}': {
  //     get: { ...swMuestraProductosPorCategoria },
  //   },
  //   '/api/producto/:id': {
  //     patch: { ...swModificaProducto },
  //     delete: { ...swBorraProductoPorId },
  //   },
};
