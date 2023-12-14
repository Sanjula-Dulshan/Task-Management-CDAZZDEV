import { Schema, model } from "mongoose";
import { ITask } from "../../interfaces/task";
import { BaseEntitySchemaContent } from "./base-entity.model";

export const STask = new Schema<ITask>({
  ...BaseEntitySchemaContent,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = model<ITask>("Task", STask);
export default TaskModel;
