import express from "express";
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  UpdateStatus,
} from "../controllers/task.controller";

const router = express.Router();

// Task routes
router.post("/", CreateTask);
router.get("/:userId", GetTasks);
router.put("/:id", UpdateStatus);
router.delete("/:id", DeleteTask);

export default router;
