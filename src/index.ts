import Config from './utils/config';
// import app from './services/server';
import server from './services/socket';
import { startDb } from './services/db';

// Me conecto a la base de datos
// startDb();

startDb();

// Levanto el servidor
server.listen(Config.port, () => {
  console.log(`Servidor en puerto: ${Config.port}`);
});
