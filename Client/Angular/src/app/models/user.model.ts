import { ConfigModel } from "./config.model";
import { HardwareModel } from "./hardware.model";



export interface UserModel {
  email: string;
  password: string;
  name: string;
  role: string;
  id?: string;
  hardwares?: HardwareModel[];
  configs?: ConfigModel[];
}