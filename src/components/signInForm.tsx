import React, { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store.tsx"; 
// import { performLogin } from "../state/reducers/authSlice";
import axios from "axios";

const SignInForm: React.FC = () => {
    // In Redux Toolkit + TS, we often type the dispatch to handle Thunks correctly
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const onSignInClicked = (): void => {
        if (email && password) {
            // We pass an object that matches the credentials expected by the Thunk
            // dispatch(performLogin({ email, password }));
            const loginDetails: CreatePostBody={
                email,
                password
            }
            createLoginPost(loginDetails);
        }
    };

    return (
        <section>
            <h2>Sign In</h2>
            {/* The preventDefault here stops the page from refreshing on enter/click */}
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
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
                        onChange={onPasswordChanged}
                        placeholder="Enter password"
                    />
                </div>

                <button 
                    type="button" 
                    onClick={onSignInClicked}
                    disabled={!email || !password} // Good practice to disable if empty
                >
                    Sign In
                </button>
            </form>
        </section>
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







