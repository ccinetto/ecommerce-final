export const mensajeBienvenida = (correo: string): string => {
  return `Bienvenido ${correo}, por favor haz tu consulta:
    - Stock: para conocer el stock actual
    - Orden: para conocer la informacion de la ultima orden
    - Carrito: para conocer el contenido del carrito
    `;
};
