import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./userSlice";

interface AuthState{
    user: User | null;     // null if not logged in
    token: string | null;  // for API calls
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState{}={
    user: null,    // null if not logged in
    token: null,  // for API calls
    isAuthenticated: false,
    status: 'idle',
    error: null,
}

const authslice= createSlice({
    name: 'auth',
    initialState,
    reducers:{
        
    }
})
