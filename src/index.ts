import Config from './utils/config';
import app from './services/server';
import startDb from './services/db';

startDb();

app.listen(Config.port, () => {
  console.log('nada', Config.port);
});
