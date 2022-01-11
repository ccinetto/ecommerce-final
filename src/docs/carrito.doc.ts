import {
  swAgregaACarritoSchema,
  swCheckoutSchema,
} from '../validations/carrito.validations';

const swMuestraCarrito = {
  tags: ['cart'],
  summary: 'Muestra una lista de todos los productos que estan en el carrito',
  description: '',
  produces: 'application/json',
  responses: {
    200: {
      description: 'Lista de productos en el carrito',
    },
  },
};

const swAgregaACarrito = {
  tags: ['cart'],
  summary:
    'Agrega un producto al carrito o incrementa su cantidad si ya estaba en la lista',
  description: '',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Requiere id y cantidad del producto a agregar',
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

const swBorraDeCarrito = {
  tags: ['cart'],
  summary: 'Elimina una cierta cantidad de producto en el carrito',
  description: '',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Requiere id y cantidad del producto a agregar',
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
  tags: ['cart'],
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
      description: 'Generada la orden, a la direccion suministrada',
    },
    400: {
      description: 'No se puede generar la orden',
    },
  },
};

export const swCarritoRouter = {
  '/api/cart': {
    get: { ...swMuestraCarrito },
  },
  '/api/cart/add': { post: { ...swAgregaACarrito } },
  '/api/cart/delete': { post: { ...swBorraDeCarrito } },
  '/api/cart/submit': { post: { ...swCheckout } },
};
