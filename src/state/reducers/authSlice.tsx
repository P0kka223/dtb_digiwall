import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    user: String | null;    
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
        logInSuccess:(state, action: PayloadAction<{ token: string; user: string }>)=>{
            state.isAuthenticated=true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logOut:(state)=>{
            state.isAuthenticated=false;
            state.token=null;
            state.user=null;
        }
        
    }
});

export const { logInSuccess,logOut } = authSlice.actions;
export default authSlice.reducer;
