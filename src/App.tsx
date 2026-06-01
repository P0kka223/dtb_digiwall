import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import SignInForm from './components/logInForm2.tsx';
import './App.css';
import { useState } from "react";
import RegForm from './components/regform.tsx';
import CustDashboard from './components/CustDashboard/CustDashboard.tsx';

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <CustDashboard />
      ) : (
        <>
          {isSignIn ? <SignInForm /> : <RegForm />}
          
          <button onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;