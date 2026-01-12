import { createClient } from 'redis';
import { config } from './index.js';

const redisClient = createClient({
    url: `${config.redisUrl}`
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Connected Successfully'));

// Connection start call i server.js file before server starting
const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

export { redisClient, connectRedis };