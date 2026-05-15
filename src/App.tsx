import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import SignInForm from './components/signInForm';
import Dashboard from './components/dashboard';
import './App.css'
import Registerform from './components/registerform.tsx'
import { useState } from "react";

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      {isSignIn ? (
        <SignInForm />
      ) : (
        <Registerform />
      )}

      <button onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? "Don't have an account? Register" : "Already have an account? Sign In"}
      </button>
    </div>
  );
}

export default App;