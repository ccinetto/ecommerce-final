import Config from './utils/config';
import { initWSServer } from './services/socket';
import { startDb } from './services/db';
import server from './services/server';

// Me conecto a la base de datos
// startDb();

startDb();

// Levanto el servidor
server.listen(Config.port, () => {
  console.log(`Servidor en puerto: ${Config.port}`);

  const io = initWSServer(server);
});
