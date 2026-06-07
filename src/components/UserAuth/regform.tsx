import RegCustForm from './regCustForm';
import { useState } from 'react';

import RegMerchantForm from './regMerchantForm';
// const CustomerInitialValues = {
//   fullName: "",
//   email: "",
//   phoneNumber: "",
//   nationalId: "",
//   password: "",
//   kraPin: "",
//   dateOfBirth: "",
//   termsAccepted: false,
// }
// //I have to do this myself ie put the inital vals into the merchant
// const MerchantInitialValues ={
//   fullName: "",
//   email: "",
//   phoneNumber: "",
//   nationalId: "",
//   password: "",
//   kraPin: "",
//   dateOfBirth: "",
//   businessName: "",
//   businessRegistrationNumber: "",
//   businessKraPin: "",
//   businessType: "",
//   bankName: "",
//   bankAccountNumber: "" as unknown as number, 
//   bankAccountHolderName: "",
//   termsAccepted: false,
// }
    const RegForm: React.FC = () => {
      const [userType, setUserType]=useState<string>('Customer')

  return (
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

  );

      }

export default RegForm;




