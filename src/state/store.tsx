import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";
import {api} from "../services/apiSlice";

export const store= configureStore({
    reducer: {
        users: userSlice,
        auth: authSlice,
        [api.reducerPath]: api.reducer
    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// ADD THESE TWO LINES:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // This fixes your error!

