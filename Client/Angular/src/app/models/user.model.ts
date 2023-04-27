import { ConfigModel } from "./config.model";

export interface UserModel {
  _id?: string;
  email: string;
  password: string;
  role?: string;
  configs: ConfigModel[];
}