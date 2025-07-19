import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { TCreateUserBody, TRoles, TUserLoginBody } from "../../types/userTypes";
import userModel from "../../models/userModel";
import { generateJWT } from "../../utils/authFunction";
import { TGetAllQueryParams } from "../../types";

export const registerUser = async (createBody: TCreateUserBody) => {
  const { name, email, password, phone, role } = createBody;
  const existing = await userModel.findOne({ email });
  if (existing) throw new Error("User already exists");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email,
    passwordHash,
    role,
    phone,
  });

  return { name: user.name, email: user.email, role: user.role };
};

export const loginUser = async (
  bodyParams: TUserLoginBody
): Promise<{
  token: string;
  email: string;
  role: TRoles;
  name: string;
  userId: string;
}> => {
  const { email, password } = bodyParams;
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");
  const generatedToken = await generateJWT(user);
  const response: any = {
    token: generatedToken,
    email: user.email,
    role: user.role,
    name: user.name,
    userId: user._id,
  };
  return response;
};

export const getAllUsers = async (
  queryParams: TGetAllQueryParams
): Promise<any> => {
  const {
    search = "",
    sortBy = "createdAt",
    sortOrder = "asc",
    limit = "10",
    offset = "0",
  } = queryParams;

  const parseLimit = limit ? parseInt(limit) : 10;
  const parseOffset = offset ? parseInt(offset) : 0;

  const matchStage: any = {};

  if (search) {
    matchStage.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const sortStage: any = {};
  sortStage[sortBy] = sortOrder === "asc" ? 1 : -1;

  const users = await userModel.aggregate([
    { $match: matchStage },
    { $sort: sortStage },
    { $skip: parseOffset },
    { $limit: parseLimit },
  ]);

  return users;
};
