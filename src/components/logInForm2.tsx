import { Formik,Form, type FormikHelpers,} from 'formik';
import { loginSchema } from '../schemas/schema';
import { useLogInMutation, type loginPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';
import { useDispatch } from 'react-redux';
import { logInSuccess } from '../state/reducers/authSlice';

    const SignInForm: React.FC = () => {
 
  const [ login ] = useLogInMutation();
  const dispatch=useDispatch()

      

  const onSubmit = async (values: loginPostRequest, actions: FormikHelpers<loginPostRequest>) => {
    
    
    
    try {
      //DUMMY LOGIN
      if (values.email === 'stephen@gmail.com' && values.password === 'Stephen123!') {
        console.log('Dummy login successful. Dispatching to Redux...');
        
        dispatch(logInSuccess());
        
        actions.resetForm();
        return; 
      }

      // NORMAL API CALL
      await login(values).unwrap();
      
      dispatch(logInSuccess())
      actions.resetForm();
      
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




