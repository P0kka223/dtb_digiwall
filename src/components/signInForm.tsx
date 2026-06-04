import React, { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store.tsx"; 
// import { performLogin } from "../state/reducers/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../state/reducers/authSlice";

interface SignInFormProps {
  onLoginSuccess: () => void;
}


const SignInForm: React.FC<SignInFormProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Make it async to await the API call
  const onSignInClicked = async (): Promise<void> => {
    if (email && password) {
      try {
        const response = await createLoginPost({ email, password });

        // Save token to localStorage
        localStorage.setItem("token", response.accessToken);

        // Dispatch to Redux so isAuthenticated becomes true
        dispatch(loginSuccess({
          user: { email },
          token: response.accessToken
        }));

        onLoginSuccess();       // tells App.tsx login succeeded
        navigate("/dashboard"); // redirect to dashboard

      } catch (err) {
        console.error("Login failed", err);
      }
    }
  };
    return (
            <div className="min-h-screen flex items-center justify-center bg-gray">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-8 rounded-xl shadow-md w-full max-w-md bg-red-300 space-y-4"
      >
        <h1 className="text-center">Sign In</h1>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={onSignInClicked}>
            Sign In
          </button>
       
        </div>
         
             <div className="flex justify-center">
          <button type="button" onClick={() => navigate("/register")}>
            Don't have an account? Register
          </button>
        </div>
      </form>
    </div>
           
    );
};

export default SignInForm;

type CreatePostBody={
    email: string,
    password: string
}

type CreateResponseBody={
    accessToken: string,
    refreshToken: string,
    // role:string,
    // fullName:string
}


const createLoginPost = async (data: CreatePostBody): Promise<CreateResponseBody> => {
    const response = await axios.post<CreateResponseBody>(
        `${import.meta.env.VITE_API_URL}/api/auth/login`, 
        data
    );
    console.log(response.data)
    return response.data;
}







