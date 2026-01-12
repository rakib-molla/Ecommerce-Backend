import { redisClient } from '../config/redis.js';

/**
 * @desc  Cache data set  (default 1 hour expire)
 */
export const setCache = async (key, data, ttl = 3600) => {
    try {
        await redisClient.setEx(key, ttl, JSON.stringify(data));
    } catch (error) {
        console.error('Redis Set Error:', error);
    }
};

/**
 * @desc    Cache data get 
 */
export const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Redis Get Error:', error);
        return null;
    }
};

/**
 * @desc    Cache delete/remove kora (User add/update hole call korben)
 */
export const removeCache = async (key) => {
    try {
        await redisClient.del(key);
    } catch (error) {
        console.error('Redis Delete Error:', error);
    }
};