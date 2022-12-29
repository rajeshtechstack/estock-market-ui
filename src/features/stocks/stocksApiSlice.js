import {apiSlice} from "../../app/api/apiSlice"

export const stocksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        tagTypes: ['Stock'],
        getStocks: builder.query({
            query: ({companyCode,startDate, endDate}) =>
                `/api/v1.0/market/stock/get/${companyCode}/${startDate}/${endDate}`,
            providesTags: ['Stock']
        }),
        addStock: builder.mutation({
            query: ({companyCode, stock}) => ({
                url: `/api/v1.0/market/stock/add/${companyCode}`,
                method: 'POST',
                body: {...stock}
            }),
            invalidatesTags: ['Stock']
        })
    })
})

export const {
    useGetStocksQuery,
    useAddStockMutation
} = stocksApiSlice