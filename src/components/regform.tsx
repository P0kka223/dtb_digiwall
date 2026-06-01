import { Formik,Form, type FormikHelpers, useFormik, FormikProvider} from 'formik';
import RegCustForm from './regCustForm';
import { useState } from 'react';
import {regCustSchema, regMerchantSchema } from '../schemas/schema';
import { useRegisterCustomerMutation, type registerCustomerPostRequest, type registerMerchantPostRequest, useRegisterMerchantMutation } from '../features/api/api';

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
const MerchantInitialValues ={
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalId: "",
  password: "",
  kraPin: "",
  dateOfBirth: "",
  businessName: "",
  businessRegNum: "",
  businessKraPin: "",
  businessType: "",
  bankName: "",
  bankAccountNum: "" as unknown as number, 
  bankAccountHolder: "",
  termsAccepted: false,
}
    const RegForm: React.FC = () => {
      const [userType, setUserType]=useState<string>('Customer')

  return (
    // <FormikProvider value={formik}>
    //     {/* we are opening the vault to get values */}
    //     <Form noValidate onSubmit={formik.handleSubmit}>
          <div>
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
              {userType === "Customer" ?  <RegCustForm/>: <RegMerchantForm />}
              </div>
            </div>


    // </FormikProvider>
  );

      }

export default RegForm;




