import { ConfigModel } from "./config.model";
import { HardwareModel } from "./hardware.model";



export interface UserModel {
  _id?: string;
  email: string;
  password: string;
  role?: string;
  // username?: string;
  configs: string[];
}