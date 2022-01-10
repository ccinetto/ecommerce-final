const swUpload = {
  tags: ['imagen'],
  summary: 'Cambia el estado de la orden a finalizado',
  description: '',
  produces: 'application/json',
  consumes: 'multipart/form-data',
  parameters: [
    {
      in: 'body',
      name: 'producto_id',
      description: 'Requiere el id del producto',
      required: true,
      schema: {
        type: 'object',
        properties: {
          producto_id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
        },
        required: ['producto_id'],
        additionalProperties: false,
      },
    },
    {
      in: 'formData',
      description: 'Incluyen un erchivo de imagen png o jpg',
      name: 'file',
      required: true,
      dataType: 'file',
    },
  ],
  responses: {
    200: {
      description:
        'Se agrega el imagen_id a la lista de fotos del producto con producto_id',
    },
    400: {
      description: 'Falla la subida de la imagen',
    },
  },
};

const swMuestraUnaImagen = {
  tags: ['imagen'],
  summary: 'Muestra la imagen con el id',
  description: '',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Requiere el id de la imagen',
      required: true,
    },
  ],
  responses: {
    200: {
      description: 'Retorna la imagen solicitada',
    },
    400: {
      description: 'No se encuentra la imagen',
    },
  },
};

const swBorraUnaImagen = {
  tags: ['imagen'],
  summary: 'Elimina la imagen con el id',
  description: '',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Requiere el id de la imagen',
      required: true,
    },
  ],
  responses: {
    200: {
      description: 'Elimina la imagen solicitada',
    },
    400: {
      description: 'No se encuentra la imagen',
    },
  },
};

export const swImagenRouter = {
  '/api/imagen/upload': {
    post: { ...swUpload },
  },
  '/api/imagen/:id': {
    get: { ...swMuestraUnaImagen },
    delete: { ...swBorraUnaImagen },
  },
};
