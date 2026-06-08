import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store.tsx";
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
  const [error, setError] = useState<string | null>(null); // ← new
  const [isLoading, setIsLoading] = useState(false);       // ← nice to have

  const onSignInClicked = async (): Promise<void> => {
    setError(null); // clear previous errors
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createLoginPost({ email, password });
      localStorage.setItem("token", response.accessToken);
      dispatch(loginSuccess({ user: { email }, token: response.accessToken }));
      onLoginSuccess();
      navigate("/dashboard");
    } catch (err: any) {
      // Show a friendly message; use the API's message if available
      const message =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md px-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          {/* Logo / brand mark */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-slate-800 text-center mb-1">
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm text-center mb-7">
            Sign in to your DigiWall account
          </p>

          {/* Error alert */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Sign in button */}
          <button
            type="button"
            onClick={onSignInClicked}
            disabled={isLoading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </button>

          {/* Register link */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

type CreatePostBody = { email: string; password: string };
type CreateResponseBody = { accessToken: string; refreshToken: string };

const createLoginPost = async (data: CreatePostBody): Promise<CreateResponseBody> => {
  const response = await axios.post<CreateResponseBody>(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    data
  );
  return response.data;
};