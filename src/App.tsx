import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import SignInForm from './components/logInForm2.tsx';
import './App.css'
import { useState } from "react";
import RegForm from './components/regform.tsx';

const App: React.FC = () => {
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="app-container">
      {isSignIn ? (
        <SignInForm />
      ) : (
        <RegForm />
      )}

      <button onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? "Don't have an account? Register" : "Already have an account? Sign In"}
      </button>
    </div>
  );
}

export default App;