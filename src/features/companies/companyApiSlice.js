import { apiSlice } from "../../app/api/apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Company"],
    getCompanies: builder.query({
      query: () => "/api/v1.0/market/company/getall",
      providesTags: ["Company"],
      transformResponse: (response, meta, arg) => response?.data,
    }),
    addCompany: builder.mutation({
      query: (company) => ({
        url: "/api/v1.0/market/company/register",
        method: "POST",
        body: { ...company },
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const { useGetCompaniesQuery, useAddCompanyMutation } = companyApiSlice;
