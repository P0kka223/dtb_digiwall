
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Transaction {
  id: number;
  description: string;
  createdAt: string;
  amount: number;
  status: string;
}

interface PaymentRequest {
  id: number;
  merchant_name: string;
  description: string;
  date: string;
  amount: number;
  status: string;
}

interface wallet{
  id: string;
  availableBalance: number;
  pendingBalance: number;
}

interface pendingPayment{
  merchantEmail: string;
  description: string;
  amount: string;
 
}
export const api = createApi({
  reducerPath: "api", //label for my api in my redux store
  baseQuery: fetchBaseQuery({ 
  baseUrl: "/",
  prepareHeaders: (headers) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    
    // If token exists, add it to every request
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    
    headers.set("ngrok-skip-browser-warning", "true");
    return headers;
  },
}), //sets the base url for all our queries
  tagTypes: ["PaymentRequests"], //tells createapi what tag types exist
  endpoints: (builder) => ({

    // Transaction History
    getTransactions: builder.query<Transaction[], void>({ //builder lets us define what typw of query we are making
      query: () => "/api/payments/customer",//query returns to the endpoint
    }),

    getWallet: builder.query<wallet, void>({
  query:()=>"/api/wallet"
  
}),

    // Payment Requests
    getPaymentRequests: builder.query<PaymentRequest[], void>({
      query: () => "/payment-requests",
      providesTags: ["PaymentRequests"],//providerTags labels the data as PaymentRequests
    }),

    //pending-payments
getPaymentPending: builder.query<pendingPayment[], void>({
query: () =>"/api/payments/pending",

}),
    // Approve a request
    approveRequest: builder.mutation<void, number>({//mutation is used to for post since we are sending the data to the database
      query: (id) => ({
        url: `api/payment/request`,
        method: "PUT",
      }),
      invalidatesTags: ["PaymentRequests"], // auto re-fetches list after action
    }),

    // Reject a request
    rejectRequest: builder.mutation({
      query: (id) => ({
        url: `api/payment/request`,
        method: "PUT",
      }),
      invalidatesTags: ["PaymentRequests"], // auto re-fetches list after action
    }),


  }),
});

export const {
  useGetTransactionsQuery,
   useGetWalletQuery, 
  useGetPaymentRequestsQuery,
  useApproveRequestMutation,
  useRejectRequestMutation,
  useGetPaymentPendingQuery
} = api;

