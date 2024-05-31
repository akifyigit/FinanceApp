import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utils/api";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "POST",
        path: "auth/login",
      }),
    }),
    register: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "POST",
        path: "auth/register",
      }),
    }),
  }),
});

export const loginApiReducerName = loginApi.reducerPath;
export const loginApiReducer = loginApi.reducer;
export const loginApiMiddleware = loginApi.middleware;

export const { useLoginMutation, useRegisterMutation } = loginApi;
