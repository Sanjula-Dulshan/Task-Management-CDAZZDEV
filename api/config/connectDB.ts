import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class DatabaseSingleton {
  private static instance: DatabaseSingleton;

  private constructor() {
    // Check if instance already exists
    if (!DatabaseSingleton.instance) {
      this.connect();
      DatabaseSingleton.instance = this;
    }
  }

  public static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }

  private async connect() {
    try {
      await mongoose.connect(process.env.DATABASE as string);
      console.log("[Server]: MongoDB Connected...");
    } catch (err) {
      console.log("[Server]: MongoDB Connection Error ", err);
      process.exit(1);
    }
  }
}

export default DatabaseSingleton;
