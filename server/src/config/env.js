import 'dotenv/config';

export const env = {
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prime_machines',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development'
};
