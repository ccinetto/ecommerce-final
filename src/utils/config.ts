import dotenv from 'dotenv';

dotenv.config();

const Config = {
  port: process.env.PORT || 8080,
  salt_rounds: Number(process.env.SALT_ROUNDS),
  atlas_uri: process.env.MONGO_ATLAS_URI,
  jwt_secret: process.env.JWT_SECRET,
  session_duration_seconds:
    Number(process.env.SESSION_DURATION_SECONDS) || 3600,
};

export default Config;
