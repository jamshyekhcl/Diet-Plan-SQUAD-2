export type TRoles = "admin" | "user";
export enum TGender {
  MALE = "male",
  FEMALE = "female",
  OTHERS = "others",
}

export type TCreateUserBody = {
  name: string;
  email: string;
  password: string;
  gender: TGender;
  age: number;
  // role: TRoles;
  phone: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: TGender;
  role: TRoles;
  phone: string;
};

export type TUserLoginBody = {
  email: string;
  password: string;
};
