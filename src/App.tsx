import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import SignInForm from './components/signInForm';
import Dashboard from './components/dashboard';
import './App.css'

const App: React.FC = () => {
  // Watch the auth state
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
      <main>
          {/* 
              This is a ternary operator:
              Is authenticated true? Show Dashboard.
              Else? Show SignInForm.
          */}
          {isAuthenticated ? (
              <Dashboard />
          ) : (
              <SignInForm />
          )}
      </main>
  );
};

export default App;

