import { Form, useFormik, FormikProvider} from 'formik';
import { regCustSchema } from '../schemas/schema';
import type { registerCustomerPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';
import CustomCheckBox from './elements/customCheckBox';
import { useRegisterCustomerMutation } from '../features/api/api';
import {Card,CardContent,Button,Typography} from '@mui/material';


    const RegCustForm: React.FC = ()=> {

      const [registerCustApi]=useRegisterCustomerMutation();

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
    <Card variant="outlined" sx={{maxWidth:400}}>
    <CardContent>
        <Typography>Customer Details</Typography>
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

      <Button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Registering..." : "Register"}
      </Button>
      </Form>
      </FormikProvider>
    </CardContent>
    </Card>
    

    
  );

      }

export default RegCustForm;




