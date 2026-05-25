import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./userSlice";
// import {
//     uselogInMutation,useregisterCustomerMutation,useregisterMerchantMutation
// } from "../../features/api/apiSlice"


interface AuthState {
    user: User | null;    
    token: string | null;
    isAuthenticated: boolean;
    isIdle: boolean;
}

const initialState: AuthState = {
    user: null,   
    token: null,  
    isAuthenticated: false,
    isIdle:false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInSuccess:(state)=>{
            state.isAuthenticated=true;
        }
        //

        
    }
});

export const { logInSuccess } = authSlice.actions;
export default authSlice.reducer;
