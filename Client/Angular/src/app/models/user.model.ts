import { ConfigModel } from "./config.model";
import { HardwareModel } from "./hardware.model";



export interface UserModel {
  email: string;
  role: string;
  user_id: string;
  // password: string;
  name?: string;
  id?: string;
  hardwares?: HardwareModel[];
  configs?: ConfigModel[];
}