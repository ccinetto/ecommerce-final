import { Server } from 'socket.io';
import { mensajeBienvenida } from '../utils/info.messages';
import { mensajeService } from './mensajes.service';
import server from './server';

const io = new Server(server);

io.on('connection', socket => {
  const momentoConexion = new Date(Date.now());
  console.log(momentoConexion);
  socket.on('loggedUser', async usr => {
    console.log(`Usuario conectado en ${socket.id}`);
    const bienvenida = {
      email: 'sistema',
      text: mensajeBienvenida(usr.email),
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
    io.emit(
      'message',
      await mensajeService.muestraMensajesDesdeAhora(momentoConexion)
    );
  });
});

export default server;
