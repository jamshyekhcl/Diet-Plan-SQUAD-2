import { Types } from "mongoose";

export type TGetAllQueryParams = {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: string;
  offset?: string;
};

export type TGetOnePathParams = {
  id: string | Types.ObjectId;
};
