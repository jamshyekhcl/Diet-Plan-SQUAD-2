// src/redux/api/bmiApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bmiApi = createApi({
  reducerPath: "bmiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // change to your actual base URL
  }),
  endpoints: (builder) => ({
    createBMI: builder.mutation({
      query: (body) => ({
        url: "/bmi",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateBMIMutation } = bmiApi;
