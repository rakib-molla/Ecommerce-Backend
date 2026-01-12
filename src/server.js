import app from './app.js';
import { config } from "./config/index.js";
import BbConnection from "./config/db.js";
import { connectRedis } from "./config/redis.js";

const startServer = async () => {
  try {
    // database and redis connection
    console.log('Connecting to services...');
    
    // all connection 
    await Promise.all([
      BbConnection(),
      // connectRedis()
    ]);

    console.log('All services connected successfully.');

    // connection successful, start the server
    const server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port} in ${config.node_env} mode`);
    });

    // unhandled promise rejection handling for scalability
    process.on('unhandledRejection', (err) => {
      console.log(`Unhandled Rejection: ${err.message}`);
      console.log('Shutting down server...');
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();