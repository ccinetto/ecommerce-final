import mongoose from 'mongoose';
import Config from '../utils/config';

// Instrucciones de coneccion a la base de datos
const startDb = () => {
  if (Config.atlas_uri) {
    mongoose.connect(Config.atlas_uri);
  }
};

export default startDb;
