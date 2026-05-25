import { useRegCustService } from '../services/useUserService';
import { Formik,Form, type FormikHelpers,} from 'formik';
import { loginSchema,regCustSchema } from '../schemas/schema';
import type { registerCustomerPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';
import CustomCheckBox from './elements/customCheckbox';

    const RegCustForm: React.FC = () => {

      const { CustRegister, isRegistering, CustRegisterError } = useRegCustService();
      
  
  const onSubmit = async (values: registerCustomerPostRequest, actions: FormikHelpers<registerCustomerPostRequest>) => {
    try {
      const fullName = await CustRegister(values);
      // TODO:after this we have to notify customer that they have registered
      //then we have to redirect back to sign in
      console.log(`Success! Welcome, ${fullName}`);
      
      //EXP:Clean up the form on success.  
      //TODO: Although we may have to change this now that we redirect
      actions.resetForm();
    }
   catch (err) {
    // EXP:The error is already caught/logged by the service layer.
    // EXP: We catch it here just to prevent the app from crashing.
    console.error('UI caught login failure');
  } finally {
    // EXP: Always tell Formik we are done so it doesn't stay stuck loading
    actions.setSubmitting(false);
  }
};

  return (
<Formik
  initialValues={{
    fullName: "",
    email: "",
    phoneNumber: "",
    nationalId: "",
    password: "",
    kraPin: "",
    dateOfBirth: "",
    termsAccepted: false,
  }}

  validationSchema={regCustSchema} 
  onSubmit={onSubmit}
>
  {({ isSubmitting }) => (
    <Form>
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

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </Form>
  )}
</Formik>
  );

      }

export default RegCustForm;




