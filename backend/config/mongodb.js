import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Database: ${conn.connection.name}`);

  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;

