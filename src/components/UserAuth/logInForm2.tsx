import { Formik,Form, type FormikHelpers,} from 'formik';
import { loginSchema } from '../../schemas/schema';
import { useLogInMutation, type loginPostRequest } from '../../features/api/api';
import CustomInput from '../elements/customInput';
import { useDispatch } from 'react-redux';
import { logInSuccess } from '../../state/reducers/authSlice';
import { jwtDecode } from "jwt-decode";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';




interface MyJwtPayload {
  sub: string;       // Usually the user ID
  fullName: string;  // Custom claim you might have added
  role: string;      
  exp: number;       // Expiration timestamp
  iat: number;       // Issued at timestamp
}

    const SignInForm: React.FC = () => {
 
  const [ login ] = useLogInMutation();
  const dispatch=useDispatch()

      

  const onSubmit = async (values: loginPostRequest, actions: FormikHelpers<loginPostRequest>) => {
    
    try {
      //DUMMY LOGIN
      if (values.email === 'stephen223@gmail.com' && values.password === 'Stephen123!') {
        console.log('Dummy login successful. Dispatching to Redux...');
        
        const dummyDispatchMsg=dispatch(logInSuccess({token:"yougetincongrats",user:"Steve"}));
        console.log(dummyDispatchMsg)
        
        actions.resetForm();
        return; 
      }

      // NORMAL API CALL
      const responseData=await login(values).unwrap();
      
    localStorage.setItem('token', responseData.accessToken);
      const decodedData = jwtDecode<MyJwtPayload>(responseData.accessToken);
      const loginDispatchMsg=dispatch(logInSuccess({token:responseData.accessToken,user:decodedData.fullName}))
      console.log(loginDispatchMsg)
      actions.resetForm();
      
    } 
   catch (err) {
    // The error is already caught/logged by the service layer.
    // We catch it here just to prevent the app from crashing.
    console.error('UI caught login failure', err);
  
    // Extract the specific error message from your backend (adjust path as needed)
    const errorMessage = err?.data?.message || 'Invalid email or password';
    
    // Tell Formik about the error
    actions.setStatus(errorMessage);
    
  } finally {
    // Always tell Formik we are done so it doesn't stay stuck loading
    actions.setSubmitting(false);
  }
};

  return (
    <Card variant="outlined" sx={{maxWidth:400}}>
    <CardContent>
        <Typography>Log in Form</Typography>
        <Formik
      initialValues={{ email:"",password:"" }} 
      validationSchema={loginSchema} 
      onSubmit={onSubmit}>
      {({isSubmitting}) => (
        <Form>
            <Box sx={{display:'flex',flexFlow:"column wrap",alignContent:'space-around'}}>
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
            <Button disabled={isSubmitting} type="submit">Log In</Button>
            </Box>
        </Form>
      )}
    </Formik>
    </CardContent>
    </Card>
  );

      }

export default SignInForm;




