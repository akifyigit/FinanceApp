import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utils/api";

export const debtsApi = createApi({
  reducerPath: "debtsApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createDebt: builder.mutation({
      query: ({ data }) => ({
        data,
        method: "POST",
        path: "finance/debt",
      }),
    }),
    updateDebt: builder.mutation({
      query: ({ data, id }) => ({
        data,
        method: "PUT",
        path: `finance/debt/${id}`,
      }),
    }),
    deleteDebt: builder.mutation({
      query: ({ id }) => ({
        method: "DELETE",
        path: `finance/debt/${id}`,
      }),
    }),
    getDebts: builder.query({
      query: () => ({
        method: "GET",
        path: "finance/debt",
      }),
    }),
    getDebtsById: builder.query({
      query: ({ id }) => ({
        method: "GET",
        path: `finance/debt/${id}`,
      }),
    }),
    getPaymentPlansById: builder.query({
      query: ({ id }) => ({
        method: "GET",
        path: `finance/payment-plans/${id}`,
      }),
    }),
    updatePaymentPlans: builder.mutation({
      query: ({ data, id }) => ({
        data,
        method: "PUT",
        path: `finance/payment-plans/${id}`,
        providesTags: ["payments"],
      }),
    }),
  }),
});

export const debtsApiReducerName = debtsApi.reducerPath;
export const debtsApiReducer = debtsApi.reducer;
export const debtsApiMiddleware = debtsApi.middleware;

export const {
  useCreateDebtMutation,
  useUpdateDebtMutation,
  useDeleteDebtMutation,
  useGetDebtsByIdQuery,
  useGetDebtsQuery,
  useGetPaymentPlansByIdQuery,
  useUpdatePaymentPlansMutation,
} = debtsApi;
