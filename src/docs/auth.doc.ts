import { swLoginSchema, swSignupSchema } from '../validations/auth.validations';

const swLogin = {
  tags: ['auth'],
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
  tags: ['auth'],
  summary: 'Crea el usuario',
  description: '',
  //   operationId: 'addPet',
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

export const swAuthRouter = {
  '/login': {
    post: { ...swLogin },
  },
  '/signup': {
    post: { ...swSignup },
  },
};
