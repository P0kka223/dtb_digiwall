import { Formik,Form, type FormikHelpers,} from 'formik';
import { loginSchema } from '../schemas/schema';
import { useLogInMutation, type loginPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';

    const SignInForm: React.FC = () => {
 
  const [ login,isAuthenticating ] = useLogInMutation();
      
  // const isAuthenticating = isloading || isFetching

  const onSubmit = async (values: loginPostRequest, actions: FormikHelpers<loginPostRequest>) => {
    try {
     await login(values);

      actions.resetForm();
      // router.push('/')
    }
   catch (err) {
    // The error is already caught/logged by the service layer.
    // We catch it here just to prevent the app from crashing.
    console.error('UI caught login failure');
    
  } finally {
    // Always tell Formik we are done so it doesn't stay stuck loading
    actions.setSubmitting(false);
  }
};

  return (
    <Formik
      initialValues={{ email:"",password:"" }} 
      validationSchema={loginSchema} 
      onSubmit={onSubmit}>
      {({isSubmitting}) => (
        <Form>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            placeholder="Please enter your email" />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            placeholder="Please enter your Password" />
           <button disabled={isSubmitting} type="submit">Submit</button> 
        </Form>
      )}
    </Formik>
  );

      }

export default SignInForm;




