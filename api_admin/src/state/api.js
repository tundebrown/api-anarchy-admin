import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Dashboard",
    "Admin",
    "UserStatsInfo",
    "Friend",
    "FriendInfo",
    "MatchStats",
    "OverallUserStats",
    "UsersByCountry",
    "UsersByMode"
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
    getUserStatsInfo: build.query({
      query: (id) => `api/stats/userstatsinfo/${id}`,
      providesTags: ["UserStatsInfo"],
    }),
    getAdmin: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "api/admin",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Admin"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getFriend: build.query({
      query: () => "api/report/friend",
      providesTags: ["Friend"],
    }),
    getFriendInfo: build.query({
      query: (id) => `api/report/friendinfo/${id}`,
      providesTags: ["FriendInfo"],
    }),
    getMatchStats: build.query({
      query: () => "api/report/matchstats",
      providesTags: ["MatchStats"],
    }),
    getOverallUserStats: build.query({
      query: () => "api/stats/highscores",
      providesTags: ["OverallUserStats"],
    }),
    getUsersByCountry: build.query({
      query: () => "api/stats/usersbycountry",
      providesTags: ["UsersByCountry"],
    }),
    getUsersByMode: build.query({
      query: () => "api/report/usersbymode",
      providesTags: ["UsersByMode"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAdminQuery,
  useGetDashboardQuery,
  useGetUserStatsInfoQuery,
  useGetFriendQuery,
  useGetFriendInfoQuery,
  useGetMatchStatsQuery,
  useGetOverallUserStatsQuery,
  useGetUsersByCountryQuery,
  useGetUsersByModeQuery,
} = api;
