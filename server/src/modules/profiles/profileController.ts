import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtil";
import messages from "./profileMessage";
import * as profileService from "./profileService";
import { StatusCodes } from "http-status-codes";
import { TGetAllQueryParams, TGetOnePathParams } from "../../types";
import { TCreateProfileBody } from "../../types/profile";
import { log } from "console";

export const create = async (req: Request, res: Response) => {
  try {
    const bodyParams: TCreateProfileBody = req.body;
    const profile = await profileService.createprofile(bodyParams);
    sendSuccessResponse(
      StatusCodes.OK,
      req,
      res,
      profile,
      messages.CREATE_SUCCESS
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    sendErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      req,
      res,
      {},
      errorMessage
    );
  }
};

// export const getAll = async (req: Request, res: Response) => {
//   try {
//     const queryParams: TGetAllQueryParams = req.query as TGetAllQueryParams;
//     const getTrips = await profileService.getAllprofilees(queryParams);
//     sendSuccessResponse(
//       StatusCodes.OK,
//       res,
//       getTrips,
//       messages.GET_ALL_profile_SUCCESS
//     );
//   } catch (error) {
//     sendErrorResponse(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       res,
//       error,
//       messages.GET_ALL_profile_FAILED
//     );
//   }
// };

export const getOne = async (req: Request, res: Response) => {
  console.log("hey");
  
  try {
    const pathParams: TGetOnePathParams = req.params as TGetOnePathParams;
    const profile = await profileService.getOneprofile(pathParams);
    sendSuccessResponse(
      StatusCodes.OK,
      req,
      res,
      profile,
      messages.GET_ONE_SUCCESS
    );
  } catch (error) {
    sendErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      req,
      res,
      error,
      messages.GET_ONE_FAILED
    );
  }
};

// export const update = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const pathParams: TGetOnePathParams = req.params as TGetOnePathParams;
//     const bodyParams: TUpdateprofileBody = req.body;
//     const profile = await profileService.updateprofile(pathParams, bodyParams);
//     sendSuccessResponse(
//       StatusCodes.OK,
//       res,
//       profile,
//       messages.UPDATE_profile_SUCCESS
//     );
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     sendErrorResponse(StatusCodes.BAD_REQUEST, res, {}, errorMessage);
//   }
// };
