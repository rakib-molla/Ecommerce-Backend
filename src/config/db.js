import mongoose from 'mongoose';
import { config } from "../config/index.js";

// connection test 
let isConnected = false; 

async function connectDB() {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }
  try {
    const db = await mongoose.connect(config.connectionString);
    isConnected = db.connections[0].readyState;
    console.log('=> New database connection established');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}

export default connectDB;
