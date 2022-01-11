import { Server } from 'socket.io';
import { mensajeBienvenida } from '../utils/info.messages';
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
    io.emit(
      'message',
      await mensajeService.muestraMensajesDesdeAhora(momentoConexion)
    );
  });

  socket.on('message', async msg => {
    // mensajes.add(msg);
    // console.log(JSON.stringify(await normalizador()));
    // io.emit('message', { sender: 'yo', msg });
    await mensajeService.creaMensaje(msg);
    io.emit(
      'message',
      await mensajeService.muestraMensajesDesdeAhora(momentoConexion)
    );
  });
});

export default server;
