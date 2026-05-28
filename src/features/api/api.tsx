import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



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
    businessRegNum:string;
    businessKraPin:string;
    businessType:string;
    bankName:string;
    bankAccountNum:number;
    bankAccountHolder:string;
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL as string, 
    prepareHeaders: (headers) => {
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation<loginPostResponse, loginPostRequest>({
      query: (credentials) => ({
        url: 'api/auth/login',
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
  }),
});

export const {
  useLogInMutation,
  useRegisterCustomerMutation,
  useRegisterMerchantMutation,
  useRefreshMutation,
} = apiSlice;