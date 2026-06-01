import { Form, useFormik, FormikProvider} from 'formik';
import { regCustSchema } from '../schemas/schema';
import type { registerCustomerPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';
import CustomCheckBox from './elements/customCheckBox';
import { useRegisterCustomerMutation } from '../features/api/api';
import { useDispatch } from 'react-redux';



    const RegCustForm: React.FC = ()=> {

      const [registerCustApi]=useRegisterCustomerMutation();
      const dispatch=useDispatch();


      const CustomerInitialValues = {
        fullName: "",
        email: "",
        phoneNumber: "",
        nationalId: "",
        password: "",
        kraPin: "",
        dateOfBirth: "",
        termsAccepted: false,
      }

      const formik=useFormik({
        initialValues: CustomerInitialValues,
        validationSchema: regCustSchema,
        onSubmit:  async(values: registerCustomerPostRequest)=>{
            await registerCustApi(values);
            console.log('at submission>>>>>')
      }})
      
  return (
  <FormikProvider value={formik} >
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

      <button type="submit" disabled={formik.isSubmitting}>
      Register
        {formik.isSubmitting ? "Registering..." : "Register"}
      </button>
      </Form>
      </FormikProvider>
    
  );

      }

export default RegCustForm;




