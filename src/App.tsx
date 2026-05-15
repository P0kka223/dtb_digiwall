import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import SignInForm from './components/signInForm';
import Dashboard from './components/dashboard';
import './App.css'
import Registerform from './components/registerform.tsx'
const App: React.FC = () => {
  // Watch the auth state
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (

      <main>
            <Registerform/>
        
      </main>
  );
};

export default App;

