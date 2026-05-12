import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./userSlice";

interface AuthState{
    user: User | null;     // null if not logged in
    token: string | null;  // for API calls
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState={
    user: null,    // null if not logged in
    token: null,  // for API calls
    isAuthenticated: false,
    status: 'idle',
    error: null,
}

const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
          state.status = 'loading';
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.token = nanoid(); // Generate token on success
          state.status = 'succeeded';
          state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      }
    });

// 3. Export the actions
export const { loginSuccess, loginFailure } = authSlice.actions;

// 4. THE THUNK (Located outside, at the bottom or before the slice)
// This is the function you will call from your React Component
export const performLogin = (credentials: {email: string, password: string}) => (dispatch: any, getState: any) => {
    // Access the 'users' slice state
    const allUsers = getState().users; 
    
    const foundUser = allUsers.find(
        (u: User) => u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
        dispatch(loginSuccess(foundUser));
    } else {
        dispatch(loginFailure("Invalid email or password"));
    }
};

export default authSlice.reducer;