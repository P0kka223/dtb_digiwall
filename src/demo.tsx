import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

import SignInForm from './components/UserAuth/logInForm2.tsx';
import RegForm from './components/UserAuth/regform.tsx';
import CustDashboard from './components/CustDashboard/CustDashboard.tsx';
import MerchantDashboard from './components/MerchantDashboard/MerchantDashboard.tsx';

// 1. IMPORT YOUR FORM HERE 👇
import MerchantPaymentReqForm from './components/MerchantPaymentReq/MerchantPaymentReqForm.tsx'; 

import './App.css';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    // <BrowserRouter>
    //   <div className="app-container">
    //     <Routes>
          
    //       {/* --- PUBLIC ROUTES --- */}
    //       <Route 
    //         path="/login" 
    //         element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignInForm />} 
    //       />
    //       <Route 
    //         path="/register" 
    //         element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegForm />} 
    //       />

    //       {/* --- PROTECTED ROUTES --- */}
    //       <Route 
    //         path="/dashboard" 
    //         element={isAuthenticated ? <MerchantDashboard /> : <Navigate to="/login" />} 
    //       />
          
    //       {/* 2. ADD YOUR CREATE PAYMENT ROUTE HERE 👇 */}
    //       {/* We protect it just like the dashboard so logged-out users can't access it */}
    //       <Route 
    //         path="/create-payment" 
    //         element={isAuthenticated ? <MerchantPaymentReqForm /> : <Navigate to="/login" />} 
    //       />

    //       {/* --- FALLBACK ROUTE --- */}
    //       <Route 
    //         path="*" 
    //         element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
    //       />

    //     </Routes>
    //   </div>
    // </BrowserRouter>
    <RegForm/>
  );
}

export default App;