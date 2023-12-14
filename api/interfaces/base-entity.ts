import { Types } from "mongoose";

export interface IBaseEntity {
  _id?: Types.ObjectId | string;
  created_on?: Date;
  last_modified_on?: Date;
  is_deleted?: boolean;
}
