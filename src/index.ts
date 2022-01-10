import Config from './utils/config';
import app from './services/server';
import { startDb } from './services/db';

// Me conecto a la base de datos
// startDb();

startDb();

// Levanto el servidor
app.listen(Config.port, () => {
  console.log(`Servidor en puerto: ${Config.port}`);
});
