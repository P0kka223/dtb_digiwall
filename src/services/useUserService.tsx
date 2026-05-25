import {
    useLogInMutation,useRegisterCustomerMutation,useRegisterMerchantMutation
} from "../features/api/api.tsx";
import { useDispatch, useSelector } from "react-redux";
import { logInSuccess } from "../state/reducers/authSlice.tsx";
import { jwtDecode } from "jwt-decode";


export const useLogInUserService = () => {
  // this is a mutation hook the first param is the trigger function and the second is an object tracking state
  const [runLoginApi, loginMeta] = useLogInMutation();


  const handleLogin = async (credentials: any) => {
    try {

      const dispatch = useDispatch()

      //EXP:Interface for jwttokenpayload
      interface MyJwtPayload {
        sub: string;       // Usually the user ID
        fullName: string;  // Custom claim you might have added
        role: string;      
        exp: number;       // Expiration timestamp
        iat: number;       // Issued at timestamp
      }

      // .unwrap() ensures it throws an error if the server rejects it
      const responseData = await runLoginApi(credentials).unwrap();
      dispatch(logInSuccess())
      
      
      localStorage.setItem('token', responseData.accessToken);

      const decodedData = jwtDecode<MyJwtPayload>(responseData.accessToken);

      
      return responseData.fullName; 
    } catch (error) {
      // Any central error handling or logging can happen here
      console.error('Service layer caught an error:', error);
      throw error; // Re-throw so the UI component knows it failed
    }
  };

  return {
    login: handleLogin,
    // Expose only the specific status flags the UI actually cares about
    isAuthenticating: loginMeta.isLoading, 
    loginError: loginMeta.error,
  };
};

export const useRegCustService = () => {
  const [runRegisterApi, RegisterMeta] = useRegisterCustomerMutation();

  const handleCustRegister= async(credentials: any)=>{
    try {

      const responseData = await runRegisterApi(credentials).unwrap();

      return responseData.fullName; 
    } catch (error) {

      console.error('Service layer caught an error:', error);
      throw error; 
    }
  };

  return {
    CustRegister: handleCustRegister,
    isRegistering: RegisterMeta.isLoading, 
    CustRegisterError: RegisterMeta.error,
  };
  };

  export const useRegMerchantService = () => {
    const [runRegisterApi, RegisterMeta] = useRegisterMerchantMutation();
  
    const handleMerchRegister= async(credentials: any)=>{
      try {

        const responseData = await runRegisterApi(credentials).unwrap();
  
        return responseData.fullName; 
      } catch (error) {

        console.error('Service layer caught an error:', error);
        throw error; 
      }
    };
  
    return {
      MerchantRegister: handleMerchRegister,
      isRegistering: RegisterMeta.isLoading, 
      MerchantRegisterError: RegisterMeta.error,
    };
    };


