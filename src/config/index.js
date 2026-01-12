import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  connectionString: process.env.MONGO_URI,
  maxRequestsPerWindow: process.env.MAX_REQUESTS_PER_WINDOW,
  maxRequestsPerMinute: process.env.MAX_REQUESTS_PER_MINUTE,
  redisUrl: process.env.REDIS_URL,
  node_env: process.env.NODE_ENV,
  // jwtSecret: process.env.JWT_SECRET,
};