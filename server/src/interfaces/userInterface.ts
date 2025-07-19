import { TRoles } from "../types/userTypes";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: TRoles;
  phone: string;
  status: string;
}
