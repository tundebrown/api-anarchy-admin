import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "api/user",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["User"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetDashboardQuery,
} = api;
