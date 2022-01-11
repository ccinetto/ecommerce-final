import { swLoginSchema, swSignupSchema } from '../validations/auth.validations';

const swLogin = {
  tags: ['user'],
  summary: 'Conecta al usuario',
  description: '',
  //   operationId: 'addPet',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Requiere email y password del usuario',
      required: true,
      schema: { ...swLoginSchema },
    },
  ],
  responses: {
    200: {
      description: 'Usuario conectado',
    },
    400: {
      description: 'Usuario invalido',
    },
  },
};

const swSignup = {
  tags: ['user'],
  summary: 'Crea el usuario y su carrito de compras asociado',
  description: '',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description:
        'Requiere nombre, email, password, telefono, y status de administrador del usuario',
      required: true,
      schema: { ...swSignupSchema },
    },
  ],
  responses: {
    201: {
      description: 'Usuario creado',
    },
    400: {
      description: 'No se pudo registrar el usuario',
    },
  },
};

const swLogout = {
  tags: ['user'],
  summary: 'Termina la sesion del usuario',
  description: '',
  responses: {
    200: {
      description: 'Sesion terminada',
    },
  },
};

export const swAuthRouter = {
  '/api/user/login': { post: { ...swLogin } },
  '/api/user/signup': { post: { ...swSignup } },
  '/api/user/logout': { get: { ...swLogout } },
};
