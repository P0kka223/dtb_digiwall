import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';




export type loginPostRequest={
    email: string,
    password: string
}

export type loginPostResponse={
    accessToken: string,
    refreshToken: string,
    role: string,
    fullName:string
}

//These 2 fall under the create Register Post funciton which sends the details to the backend
export type registerCustomerPostRequest = {
    fullName:string;
    email:string;
    phoneNumber:string;
    nationalId:string;
    password:string;
    kraPin:string;
    dateOfBirth: string;      
    termsAccepted: boolean;
  };


 export type registerMerchantPostRequest={
    fullName:string;
    email:string;
    phoneNumber:string;
    password:string;
    nationalId:string;
    kraPin:string;
    dateOfBirth: string;      
    termsAccepted: boolean;
    businessName: string;
    businessRegistrationNumber:string;
    businessKraPin:string;
    businessType:string;
    bankName:string;
    bankAccountNumber:number;
    bankAccountHolderName:string;
  };

  //type for wallet
  export type walletGetResponse={
    availableBalance:number;
    pendingBalance:number;
  }

  //type for payment request
  export type paymentPostRequest={
    email:string;
    amount:number;
    description:string;
  }

  

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL as string, 
    prepareHeaders: (headers,{getState}) => {
      // headers.set('ngrok-skip-browser-warning', 'true');
      const state = getState() as { auth: { token: string | null } };
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation<loginPostResponse, loginPostRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerCustomer: builder.mutation<any, registerCustomerPostRequest>({
      query: (customerData) => ({
        url: 'api/auth/register/customer',
        method: 'POST',
        body: customerData,
      }),
    }),
    registerMerchant: builder.mutation<any, registerMerchantPostRequest>({
      query: (merchantData) => ({
        url: 'api/auth/register/merchant',
        method: 'POST',
        body: merchantData,
      }),
    }),
    //don't know what to do with this one
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: '/refresh',
        method: 'POST',
      }),
    }),
    //once we have registered these are the apis for the merchant
    //this one is the wallet balance
    getWalletBalance: builder.query<walletGetResponse,void>({
      query: () => 'api/wallet'
      }),
    createPaymentRequest: builder.mutation<void,paymentPostRequest>({
      query: (paymentRequestData)=>({
        url: 'api/payments/request',
        method: 'POST',
        body: paymentRequestData
      })
    })
    }),
  });
// });

export const {
  useLogInMutation,
  useRegisterCustomerMutation,
  useRegisterMerchantMutation,
  useRefreshMutation,
  useGetWalletBalanceQuery,
  useCreatePaymentRequestMutation,
} = apiSlice;