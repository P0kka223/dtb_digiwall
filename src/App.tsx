import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import SignInForm from './components/UserAuth/logInForm2.tsx';
import './App.css';
import { useState } from "react";
import RegForm from './components/UserAuth/regform.tsx';
import { Box, Button } from '@mui/material';
import MerchantDashboard from './components/MerchantDashboard/MerchantDashboard.tsx';

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <MerchantDashboard/>
      ) : (
        <>
          {isSignIn ? <SignInForm /> : <RegForm />}
          
          <button onClick={() => setIsSignIn(!isSignIn)}
          style={{ position: 'relative', zIndex: 9999, background: 'red', color: 'white', padding: '20px' }}>
            {isSignIn ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </>
      )}
    </div>



      // <Box 
      //   sx={{ 
      //     minHeight: '100vh', 
      //     display: 'flex', 
      //     alignItems: 'center', 
      //     justifyContent: 'center',
      //     padding: 2
      //   }}
      // >
      //   {isAuthenticated ? (
      //     <MerchantDashboard/> // Or whatever dashboard logic you have
      //   ) : (
      //     <Box 
      //       sx={{ 
      //         display: 'flex', 
      //         flexDirection: 'column', 
      //         alignItems: 'center', 
      //         gap: 2 // This creates perfect spacing between the Card and the Button
      //       }}
      //     >
      //       {/* The Form */}
      //       {isSignIn ? <SignInForm /> : <RegForm />}
            
      //       {/* The MUI Button */}
      //       <Button 
      //         variant="text" 
      //         onClick={() => setIsSignIn(!isSignIn)}
      //         sx={{ textTransform: 'none' }} // Keeps the text looking like a normal link
      //       >
      //         {isSignIn ? "Don't have an account? Register" : "Already have an account? Sign In"}
      //       </Button>
      //     </Box>
      //   )}
      // </Box>
    );
}

export default App;