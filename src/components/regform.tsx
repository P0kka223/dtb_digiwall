import { Formik,Form, type FormikHelpers,} from 'formik';
import { loginSchema } from '../schemas/schema';
import CustomSelect from './elements/CustomSelect';
import RegCustForm from './regCustForm';
import RegMerchantForm from './regMerchantForm';

    const RegForm: React.FC = () => {


  return (
    <Formik
      initialValues={{ CustOrMerch:"" }} 
      // validationSchema={loginSchema}
        onSubmit={(values) => {
    console.log("User selected:", values.CustOrMerch);
  }}>
        {/* we are opening the vault to get values */}
        {({ values }) => ( 
        <Form>
          <CustomSelect
            label="Register as a Customer or Merchant"
            name="CustOrMerch">
            <option value="">Select an option</option>  
            <option value="Customer">Customer</option>
            <option value="Merchant">Merchant</option>
            </CustomSelect>
            <div>
            {values.CustOrMerch === "Customer" && <RegCustForm />}
          {values.CustOrMerch === "Merchant" && <RegMerchantForm />}
            </div>
        </Form>
        )}

    </Formik>
  );

      }

export default RegForm;




