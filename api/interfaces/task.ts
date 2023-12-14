import { Types } from "mongoose";
import { IBaseEntity } from "./base-entity";

export interface ITask extends IBaseEntity {
  userId: string | Types.ObjectId;
  title: string;
  description: string;
  done: boolean;
}

export interface IUpdateTaskParams {
  id: string;
}
