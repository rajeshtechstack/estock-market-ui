import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/v1.0/user/637e17ef08f9005325855358",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
