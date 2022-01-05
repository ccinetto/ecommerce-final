# Backend para un sistema de ecommerce, implementado en node con express y mongodb

## Estructura del código
Estaán presentes cuatro capas:
- Capa models, donde se declaran los tipos de los objetos (ts interface) denotado como I<Objeto>, los schema para las colecciones y el respectivo modelo, quedando disponibles: usuarioModel, productoModel, carritoModel y ordenModel.
- Capa services, acá uso los metodos de los modelos para seleccionar bien sea los documentos, arrays de documentos o valores booleanos para controlar la ejecución.
- Capa controllers, acá los documentos de la capa anterior se presentan segun la logica de request response de express, de la misma forma se declaran los middleware.
- Capa routes, acá se construyen los distintos endpoints de la api.

## Autenticacion
En el login se firma un JSON web token (jwt) que luego se verifica con un middleware aplicado al resto de los endpoints