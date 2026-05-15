import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./userSlice";

interface AuthState {
    user: User | null;    
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: boolean;
}

const initialState: AuthState = {
    user: null,   
    token: null,  
    isAuthenticated: false,
    isLoading:false,
    error: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
          state.isLoading = true;
        },
        // 1. Filled the missing generic type PayloadAction<User> to match state.user type
        loginSuccess: (state, action: PayloadAction<User>) => {
          state.user = action.payload;//have to switch this to the user we get from the loginresponse
          state.isLoading=false;
          state.isAuthenticated = true;
          state.token = nanoid(); //again from login response. the action payload will contain this
          state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
          state.status = 'failed';
          state.error = action.payload;
        },
        // 2. Changed action payload type to User to avoid type mismatch with state.user
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload;
        },
        loading(state,action: PayloadAction<string>){
            state.isloading
        }
    }
});

// 3. Added loginStart and setUser to the exported actions
export const { loginStart, loginSuccess, loginFailure, setUser } = authSlice.actions;

export const performLogin = (credentials: {email: string, password: string}) => (dispatch: any, getState: any) => {
    // 4. Dispatched loginStart action at the beginning of the login process
    dispatch(loginStart());

    // Access the 'users' slice state (handling nested structure if users array is inside an object)
    const allUsers = Array.isArray(getState().users) ? getState().users : getState().users.users || []; 
    
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
