import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './state/store';
import SignInForm from './components/signInForm';
import Dashboard from './components/dashboard';
import Registerform from './components/registerform.tsx';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PaymentRequest from './components/paymentrequest.tsx';
import Transaction from './components/transactions.tsx';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInForm onLoginSuccess={() => {}} />} />
        <Route path="/register" element={<Registerform/>} />
        <Route path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/paymentRequest" element={<PaymentRequest/>}></Route>
        <Route path="/transactions" element={<Transaction/>}></Route>
      </Routes>
    </BrowserRouter>
  );

};

export default App;