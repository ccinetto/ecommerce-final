import { Server } from 'socket.io';
import { mensajeBienvenida, procesaMensaje } from '../utils/info.messages';
import { mensajeService } from './mensajes.service';
import server from './server';

const io = new Server(server);
let momentoConexion: Date;

io.on('connection', socket => {
  socket.on('loggedUser', async email => {
    console.log(`Usuario conectado en ${socket.id}`);
    momentoConexion = new Date(Date.now());
    console.log(momentoConexion);
    console.log(email);

    const bienvenida = {
      email: 'sistema',
      text: mensajeBienvenida(email),
    };
    await mensajeService.creaMensaje(bienvenida);
    await mensajeService.muestraMensajesDesdeAhora(momentoConexion); // Esto para que lo renderice en tiempo real :S
    const inicio = await mensajeService.muestraMensajesDesdeAhora(
      momentoConexion
    );
    console.log(inicio);
    io.emit('message', inicio);
  });

  socket.on('message', async msg => {
    // mensajes.add(msg);
    // console.log(JSON.stringify(await normalizador()));
    // io.emit('message', { sender: 'yo', msg });
    await mensajeService.creaMensaje(msg);
    await mensajeService.muestraMensajesDesdeAhora(momentoConexion); // Esto para que lo renderice en tiempo real :S
    io.emit(
      'message',
      await mensajeService.muestraMensajesDesdeAhora(momentoConexion)
    );
    const respuesta = await procesaMensaje(msg);
    await mensajeService.creaMensaje(respuesta);
    await mensajeService.muestraMensajesDesdeAhora(momentoConexion); // Esto para que lo renderice en tiempo real :S
    io.emit(
      'message',
      await mensajeService.muestraMensajesDesdeAhora(momentoConexion)
    );
  });
});

export default server;
