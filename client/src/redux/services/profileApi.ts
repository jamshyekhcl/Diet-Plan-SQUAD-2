import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./authApi";
import { endPoints } from "../../utils/endPoints";
import { addAuthHeader } from "../../utils/addAuthHeader";

export interface UserProfile {
  _id: string;
  userId: string;
  heightCm: number;
  weightCm: number;
  dietaryPreferences: "veg" | "non-veg";
  allergies: string[];
  activityLevel: "Sedentary" | "Light" | "Moderate" | "Active" | "Very Active";
  healthGoals: "weight_loss" | "weight_gain" | "maintenance";
  createdAt: string;
  updatedAt: string;
}
const baseApiUrl = import.meta.env.VITE_API_URL;

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiUrl}`,
    prepareHeaders: addAuthHeader,
  }),
  tagTypes: ["UserProfile"], // for automatic cache invalidation (optional)
  endpoints: (builder) => ({
    profile: builder.query<UserProfile, string>({
      query: (userId) => `${endPoints.GET_PROFILE}/${userId}`,
      transformResponse: (response: { response: UserProfile }) =>
        response.response,
      providesTags: ["UserProfile"],
    }),

    createProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (body) => ({
        url: `${endPoints.CREATE_PROFILE}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),

    updateProfile: builder.mutation<
      UserProfile,
      { id: string; data: Partial<UserProfile> }
    >({
      query: ({ id, data }) => ({
        url: `${endPoints.UPDATE_PROFILE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useProfileQuery,
  useCreateProfileMutation,
    useUpdateProfileMutation,
} = profileApi;
