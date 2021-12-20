import mongoose from 'mongoose';
import Config from '../utils/config';

const startDb = () => {
  if (Config.atlas_uri) {
    mongoose.connect(Config.atlas_uri);
  }
};

export default startDb;
