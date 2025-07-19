export type TRoles = "admin" | "user";

export type TCreateUserBody = {
  name: string;
  email: string;
  password: string;
  role: TRoles;
  phone: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TRoles;
  phone: string;
};

export type TUserLoginBody = {
  email: string;
  password: string;
};
