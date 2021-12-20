import dotenv from 'dotenv';

dotenv.config();

const Config = {
  port: process.env.PORT || 8080,
  atlas_uri: process.env.MONGO_ATLAS_URI,
};

export default Config;
