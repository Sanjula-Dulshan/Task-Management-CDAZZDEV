import { IBaseEntity } from "./base-entity";

export interface IUser extends IBaseEntity {
  name: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}
