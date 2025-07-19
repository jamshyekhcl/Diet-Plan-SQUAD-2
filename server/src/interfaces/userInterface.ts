import { TGender, TRoles } from "../types/userTypes";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: TRoles;
  age: number;
  gender: TGender;
  phone: string;
  status: string;
}
