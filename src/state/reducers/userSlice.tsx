import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string; 
}

const initialState: User[] = [
  {
    id: "12345",
    email: "dhruv@gmail.com",
    username: "pokka",
    password: "Police223"
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      // The reducer handles updating the state array
      reducer(state, action: PayloadAction<User>) {
        state.push(action.payload);
      },
      // The prepare callback handles the logic of creating the object
      prepare(email: string, username: string, password: string) {
        return {
          payload: {
            id: nanoid(), // Generates a unique ID
            email,
            username,
            password,
          } as User, // "as User" ensures the payload matches your interface
        };
      },
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;