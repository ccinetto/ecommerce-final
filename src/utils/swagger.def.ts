import Config from './config';
import { swAuthRouter } from '../docs/auth.doc';
import { swProductoRouter } from '../docs/productos.doc';

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce',
    version: '1.0.0',
    description: 'Backend de un ecommerce con node, express y mongoose',
  },
  servers: [
    {
      url: `http://localhost:${Config.port}`,
      description: 'Development server',
    },
  ],
  paths: { ...swAuthRouter, ...swProductoRouter },
};

export default swagger;
