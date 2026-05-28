import { Formik,Form, type FormikHelpers, useFormik, FormikProvider} from 'formik';
import { loginSchema } from '../schemas/schema';
import CustomSelect from './elements/CustomSelect';
import RegCustForm from './regCustForm';
import { useState } from 'react';
import {regCustSchema, regMerchantSchema } from '../schemas/schema';
import { useRegisterCustomerMutation, type registerCustomerPostRequest, type registerMerchantPostRequest } from '../features/api/api';

import RegMerchantForm from './regMerchantForm';
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
//I have to do this myself ie put the inital vals into the merchant
const MerchantInitialValues ={}
    const RegForm: React.FC = () => {
      const [userType, setUserType]=useState<string>('Customer')
      const [registerApi]=useRegisterCustomerMutation()

      const formik = useFormik({
        initialValues: userType ==='Customer' ? CustomerInitialValues: MerchantInitialValues
      ,
      validationSchema: userType ==='Customer' ? regCustSchema: regMerchantSchema,
      onSubmit: async(values: registerCustomerPostRequest | registerMerchantPostRequest )=>{
        console.log('at submission>>>>')
        if(userType ==='Customer'){

          await registerApi(values);
        }
        else {
          //TODO: implement merchant creation
        }
      }
      })
      const {values, isSubmitting}=formik

      console.log('values:::::', values)

  return (
    <FormikProvider value={formik}>
        {/* we are opening the vault to get values */}
        <Form noValidate onSubmit={formik.handleSubmit}>
          <select
            // p="Register as a Customer or Merchant"
            // name="userType"
            value={userType}
             onChange={(e)=>setUserType(e.target.value)}>
            <option value="">Select an option</option>  
            <option value="Customer">Customer</option>
            <option value="Merchant">Merchant</option>
            </select>
            <div>
            {userType === "Customer" ?  <RegCustForm isSubmitting={isSubmitting} />: <RegMerchantForm />}
            </div>
        </Form>

    </FormikProvider>
  );

      }

export default RegForm;




