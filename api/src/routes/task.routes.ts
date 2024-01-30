import express from "express";
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  UpdateStatus,
} from "../controllers/task.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// Task routes
router.post("/", auth, CreateTask);
router.get("/:userId", auth, GetTasks);
router.put("/:id", auth, UpdateStatus);
router.delete("/:id", auth, DeleteTask);

export default router;
