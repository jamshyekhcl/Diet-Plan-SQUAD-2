import { TGetAllQueryParams, TGetOnePathParams } from "../../types";
import messages from "./profileMessage";
import { TCreateProfileBody } from "../../types/profile";
import profileModel from "../../models/profileModel";

export const createprofile = async (
  bodyParams: TCreateProfileBody
): Promise<any> => {
  await profileModel.create(bodyParams);
  return true;
};

export const getAllprofilees = async (
  queryParams: TGetAllQueryParams
): Promise<any[]> => {
  const {
    search = "",
    sortBy = "createdAt",
    sortOrder = "asc",
    limit = "10",
    offset = "0",
  } = queryParams;

  const parseLimit = parseInt(limit);
  const parseOffset = parseInt(offset);
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const pipeline: any[] = []; // Search filter

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { vehicleNumber: { $regex: search, $options: "i" } },
        ],
      },
    });
  } // Join with SeatLayout

  pipeline.push({
    $lookup: {
      from: "seatlayouts", // MongoDB collection name (lowercase plural)
      localField: "seatLayoutId",
      foreignField: "_id",
      as: "seatLayout",
    },
  }); // Flatten seatLayout array

  pipeline.push({ $unwind: "$seatLayout" }); // Sorting

  pipeline.push({
    $sort: { [sortBy]: sortDirection },
  }); // Pagination

  pipeline.push({ $skip: parseOffset });
  pipeline.push({ $limit: parseLimit }); // Optional projection

  pipeline.push({
    $project: {
      name: 1,
      type: 1,
      maxSeats: 1,
      vehicleNumber: 1,
      seatLayout: 1,
    },
  });

  const profilees = await profileModel.aggregate(pipeline);
  return profilees;
};

export const getOneprofile = async (
  queryParams: TGetOnePathParams
): Promise<any> => {
  const profile = await profileModel.findOne({ userId: queryParams.id });
  if (!profile?._id) {
    throw new Error(messages.NOT_FOUND);
  }
  return profile;
};

// export const updateprofile = async (
//   queryParams: TGetOnePathParams,
//   bodyParams: TUpdateprofileBody
// ): Promise<any> => {
//   const profile = await getOneprofile(queryParams);
//   const updatedprofile = await profileModel.findByIdAndUpdate(
//     profile?._id,
//     bodyParams,
//     {
//       new: true,
//     }
//   );
//   return updatedprofile;
// };
