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
      reducer(state, action: PayloadAction<User>) {
        state.push(action.payload);
      },

      prepare(email: string, username: string, password: string) {
        return {
          payload: {
            id: nanoid(), 
            email,
            username,
            password,
          } as User, 
        };
      },
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;