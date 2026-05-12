import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string; // Keep in mind: storing raw passwords in state is usually risky!
}

interface AuthState{
    user: User | null;     // null if not logged in
    token: string | null;  // for API calls
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initUserState: User[] = [
  {
    id: "12345",
    email:"dhruv@gmail.com",
    username:"pokka",
    password:"Police223"
  },
];

const initAuthState: AuthState{}={
    user: null,    // null if not logged in
    token: null,  // for API calls
    isAuthenticated: false,
    status: 'idle',
    error: null,
}

const userSlice = createSlice({
  name: "users", // Must be a string
  initUserState,
  reducers: {
    addUser: {
      // Use PayloadAction<User> to type the action
      reducer(state, action: PayloadAction<User>) {
        state.push(action.payload);
      },
      // The prepare callback must return an object with a 'payload' key
      prepare(email: string, username: string, password: string) {
        return {
            //have to fix the syntax for typescript
          payload: User= {
            id: nanoid(), // nanoid is a function, so call it: nanoid()
            email,
            username,
            password,
          },
        };
      },
    },
    signIn:{
        reducer(state,action:PayloadAction<User>)=>{
            if(state.user = action.payload){

            }

        }
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;