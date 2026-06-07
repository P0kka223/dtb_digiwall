import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/api";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";


export const store= configureStore({
    reducer: {
        users: userSlice,
        auth: authSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// ADD THESE TWO LINES:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // This fixes your error!