import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import DatabaseSingleton from "../config/connectDB";

dotenv.config();
DatabaseSingleton.getInstance();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[Server]: Node server is running on port:${port}`);
});
