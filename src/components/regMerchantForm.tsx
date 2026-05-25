import { useRegMerchantService } from '../services/useUserService';
import { Formik,Form, type FormikHelpers,} from 'formik';
import { regMerchantSchema } from '../schemas/schema';
import type { registerMerchantPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';
import CustomCheckBox from './elements/customCheckbox';
import CustomSelect from './elements/CustomSelect';

    const RegMerchantForm: React.FC = () => {

      const { MerchantRegister, isRegistering, MerchantRegisterError } = useRegMerchantService();
      
  
  const onSubmit = async (values: registerMerchantPostRequest, actions: FormikHelpers<registerMerchantPostRequest>) => {
    try {
      const fullName = await MerchantRegister(values);
      // TODO:after this we have to notify customer that they have registered through that window?
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
    businessName: "",
    businessRegNum: "",
    businessKraPin: "",
    businessType: "",
    bankName: "",
    bankAccountNum: "" as unknown as number, // Yup will automatically convert this string input into a TypeScript number!
    bankAccountHolder: "",
    termsAccepted: false,
  }}
  validationSchema={regMerchantSchema} 
  onSubmit={onSubmit}
>
  {({ isSubmitting }) => (
    <Form>
      <h3>Personal Information</h3>
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
        label="Personal KRA PIN"
        name="kraPin"
        type="text"
        placeholder="Enter your personal KRA PIN"
      />
      <CustomInput
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
      />

      {/* --- Business Information --- */}
      <h3>Business Information</h3>
      <CustomInput
        label="Business Name"
        name="businessName"
        type="text"
        placeholder="Enter your registered business name"
      />
      <CustomInput
        label="Business Registration Number"
        name="businessRegNum"
        type="text"
        placeholder="e.g., PVT-XYZ123"
      />
      <CustomInput
        label="Business KRA PIN"
        name="businessKraPin"
        type="text"
        placeholder="Enter business KRA PIN"
      />
      <CustomSelect label="Business Type" name="businessType">
        <option value="">Select a business type</option>
        <option value="sole_proprietorship">Sole Proprietorship</option>
        <option value="partnership">Partnership</option>
        <option value="llc">Limited Liability Company (LLC)</option>
        <option value="corporation">Corporation</option>
      </CustomSelect>

      {/* --- Banking Information --- */}
      <h3>Banking Details</h3>
      <CustomInput
        label="Bank Name"
        name="bankName"
        type="text"
        placeholder="e.g., Equity Bank, KCB"
      />
      <CustomInput
        label="Bank Account Number"
        name="bankAccountNum"
        type="number" // Triggers the numeric keyboard!
        placeholder="Enter your account number"
      />
      <CustomInput
        label="Account Holder Name"
        name="bankAccountHolder"
        type="text"
        placeholder="Name exactly as it appears on the account"
      />
      
      {/* --- Terms and Submission --- */}
      <CustomCheckBox 
        name="termsAccepted" 
        type="checkbox" 
        label="I accept the merchant terms and conditions" 
      />

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Registering Merchant..." : "Register Merchant"}
      </button>
    </Form>
  )}
</Formik>
  );

      }

export default RegMerchantForm;




