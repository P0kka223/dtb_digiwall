import { useRegCustService } from '../services/useUserService';
import { Formik,Form, type FormikHelpers, useFormik, FormikProvider} from 'formik';
import { loginSchema,regCustSchema } from '../schemas/schema';
import type { registerCustomerPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';
import CustomCheckBox from './elements/customCheckBox';
import { useRegisterCustomerMutation } from '../features/api/api';

    const RegCustForm: React.FC = ()=> {

      // const { CustRegister, isRegistering, CustRegisterError } = useRegCustService();
      
  return (
<div>
      <CustomInput
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Enter your full name"
      />
      <CustomInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <CustomInput
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        placeholder="Enter your phone number"
      />
      <CustomInput
        label="National ID"
        name="nationalId"
        type="text"
        placeholder="Enter your National ID"
      />
      <CustomInput
        label="Password"
        name="password"
        type="password"
        placeholder="Create a strong password"
      />
      <CustomInput
        label="KRA PIN"
        name="kraPin"
        type="text"
        placeholder="Enter your KRA PIN"
      />
      <CustomInput
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
      />
      
      {/* Assuming you still have that CustomCheckBox component! */}
      <CustomCheckBox 
        name="termsAccepted" 
        type="checkbox" 
        label="I accept the terms and conditions" 
      />

      <button type="submit">
      Register
        {/* {isSubmitting ? "Registering..." : "Register"} */}
      </button>
    </div>
  );

      }

export default RegCustForm;




