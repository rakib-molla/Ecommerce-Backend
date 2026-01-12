import mongoose from "mongoose";
import { config }from "../config/index.js";
import { faker } from "@faker-js/faker";
import UserModel from "../modules/user/user.model.js";

// database connection delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const seedUsers = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(`${config.connectionString}`);
    console.log("MongoDB connected");

    console.log("Cleaning old data...");
    await UserModel.deleteMany({});

    const totalUsers = 500000; // total users to seed
    const chunkSize = 100; // request chunk size
    
    console.log(`Seeding started. Target: ${totalUsers} users...`);

    for (let i = 0; i < totalUsers; i += chunkSize) {
      // 100 data makeing
      const usersChunk = Array.from({ length: chunkSize }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "$2b$10$wCNmuo9N4wYPSnW/u8dNF.dIn0d2az6V7QivnqbmwCVfM7JRib4Uu",
        role: "user",
        status: "active",
      }));

      // database insert
      await UserModel.insertMany(usersChunk, { ordered: false });

      // progress log and memory usage
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`Count: ${i + chunkSize} | RAM: ${Math.round(used)}MB`);

      // per 100 data insert then delay 10 ms
      if (i % 1000 === 0) {
        await delay(10); 
      }
    }

    console.log("MISSION ACCOMPLISHED: 500,000 users inserted!");
    process.exit(0);
  } catch (error) {
    console.error("CRITICAL ERROR:", error.message);
    // if error occurs, close connection and exit process
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedUsers();


//  seeder run command 
// node src/seeders/user.seeder.js