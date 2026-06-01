import { Formik, Form, type FormikHelpers } from 'formik';
import { loginSchema } from '../schemas/schema';
import { useLogInMutation, type loginPostRequest } from '../features/api/api';
import CustomInput from './elements/customInput';

// 1. IMPORT useDispatch AND YOUR SLICE ACTION
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../features/auth/authSlice'; // <-- UPDATE THIS PATH & NAME

const SignInForm: React.FC = () => {
  const [login] = useLogInMutation();
  const dispatch = useDispatch(); // 2. INITIALIZE DISPATCH

  const onSubmit = async (values: loginPostRequest, actions: FormikHelpers<loginPostRequest>) => {
    try {
      // 3. DUMMY CHECK WITH DISPATCH
      if (values.email === 'stephen@gmail.com' && values.password === 'Stephen123!') {
        console.log('Dummy login successful. Dispatching to Redux...');
        
        // Dispatch your action to flip isAuthenticated to true
        // Update the payload below to match whatever your slice expects!
        dispatch(setAuthenticated({ isAuthenticated: true, user: 'Stephen' }));
        
        actions.resetForm();
        return; // Exit out before hitting the real API
      }

      // NORMAL API CALL
      const response = await login(values).unwrap();
      
      // Don't forget to also dispatch on a REAL successful login!
      dispatch(setAuthenticated({ isAuthenticated: true, user: response.user }));

      actions.resetForm();
      
    } catch (err) {
      console.error('UI caught login failure', err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }} 
      validationSchema={loginSchema} 
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            placeholder="Please enter your email" 
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            placeholder="Please enter your Password" 
          />
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Logging in...' : 'Submit'}
          </button> 
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;