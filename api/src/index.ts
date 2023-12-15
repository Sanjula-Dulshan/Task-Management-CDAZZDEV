import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import DatabaseSingleton from "../config/connectDB";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import cors from "cors";

dotenv.config();
DatabaseSingleton.getInstance();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`[Server]: Node server is running on port:${port}`);
});
