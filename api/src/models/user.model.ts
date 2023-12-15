import { Schema, model } from "mongoose";
import { BaseEntitySchemaContent } from "./base-entity.model";
import { IUser } from "../../interfaces/user";

export const SUser = new Schema<IUser>({
  ...BaseEntitySchemaContent,
  name: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

const TaskModel = model<IUser>("User", SUser);
export default TaskModel;
