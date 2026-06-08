import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import {loginSuccess} from "../state/reducers/authSlice";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
//blueprint for our form
interface RegistrationForm{
        fullname:string;
        email:string;
        pnumber:string;
        idnumber:string;
        password:string;  
        confirmpassword: string;
        KRA:string;
        dob:string;
        terms:boolean;
    }


    //Yup registration schema
const registrationSchema = Yup.object().shape({
    fullname: Yup.string()
    .required("Name is required")
    .min(3, "Name must have atleast three characters"),
    email: Yup.string()
    .required("Enter your email address")
    .email("Email is required"),
    pnumber:Yup.string()
    .required("Enter your phone number")
    .matches(/^(?:254|\+254|0)(7|1)\d{8}$/,
    "Enter a valid Kenyan phone number e.g. 0712345678"),
    idnumber: Yup.string()
    .required("Id number must be valid")
    .length(8, "Must have a maximum of 8"),
    password: Yup.string()
    .required("Enter your password"),
    confirmpassword: Yup.string()
    .required("The password must match")
    .oneOf([Yup.ref("password")], "Password does not match")
    .length(10, "Password must be 10 characters"),
    KRA: Yup.string()
    .required("Enter your KRA pin")
    .length(11, "Your KRA pin must be 11 characters"),
    dob: Yup.string()
    .required("Enter your date of birth")


})
//special typescript function
const Registerform:React.FC = ()=>{
const dispatch = useDispatch(); // allows us to send functions to redux
const navigate = useNavigate();

  const formik = useFormik<RegistrationForm>({
initialValues:{
   fullname: "",
    email: "",
    pnumber: "",
    idnumber: "",
    password: "",
    confirmpassword: "",
    KRA: "",
    dob: "",
    terms: false
},
//monitors the keystrokes. the handlechange is handled by formik
validationSchema: registrationSchema, 

onSubmit: async(values)=> {
  try {
        const response = await createRegisterPost({//sends form data to the backend
          fullName: values.fullname,
          email: values.email,
          phoneNumber: values.pnumber,
          nationalId: values.idnumber,
          password: values.password,
          kraPin: values.KRA,
          dateOfBirth: values.dob,
          termsAccepted: true
        });
        dispatch(loginSuccess({
          user: { username: values.fullname, email: values.email, id: values.idnumber, password: values.password },
          token: response.accessToken
        }));

        navigate("./signInForm.tsx")
      } catch (err) {
        console.error("Registration failed", err);
      }
}
  })

    return(
        <>
        <div className="flex justify-center items-center p-4 space-y-4 shadow-md ">
        
        <div>
            <form className=" rounded-lg space-y-4 p-12 shadow" onSubmit = {formik.handleSubmit}>
              <h1 className="flex justify-center text-lg bg-blue-600 hover:bg-blue-700 rounded-lg w-full">Register Form</h1>
                <div>

                <label htmlFor="fullname">First Name: </label>
                <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter your first name"
                value={formik.values.fullname} 
              onChange={formik.handleChange}
                />
    <p style={{ color: "red" }}>{formik.errors.fullname}</p>
                </div>
<div>
                <label htmlFor="email">Email: </label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email} 
              onChange={formik.handleChange}/>
            <p style={{ color: "red" }}>{formik.errors.email}</p>
</div>
<div>
                <label htmlFor="pnumber">Phone number: </label>
                <input
                type="text"
                id="pnumber"
                name="pnumber"
                placeholder="phone number"
                value={formik.values.pnumber} 
              onChange={formik.handleChange}/>
              
             <p style={{ color: "red" }}>{formik.errors.pnumber}</p>
              </div>
              <div>
                <label htmlFor="idnumber">ID number: </label>
                <input
                type="number"
                id="idnumber"
                name="idnumber"
                placeholder="ID number"
                value={formik.values.idnumber}
              onChange={formik.handleChange}/>
               <p style={{ color: "red" }}>{formik.errors.idnumber}</p>
              </div>
              <div>
              <label htmlFor="password">Password: </label>
                <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formik.values.password}
                onChange={formik.handleChange}/>
                <p style={{ color: "red" }}>{formik.errors.password}</p>
                </div>
                <div>
              <label htmlFor="confrimpassword">Confirm your password: </label>
                <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm your Password"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}/>
                <p style={{ color: "red" }}>{formik.errors.confirmpassword}</p>
                
                </div>
                <label htmlFor="KRA">KRA: </label>
                <input
                type="text"
                id="KRA"
                name="KRA"
                placeholder="Enter your Kra number"
                value={formik.values.KRA} 
              onChange={formik.handleChange}/>
              <p style={{ color: "red" }}>{formik.errors.KRA}</p>
                    <div>
                    <label htmlFor="dob">Date of Birth: </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formik.values.dob} // Format: yyyy-mm-dd
                        onChange={formik.handleChange}
                        required/>
                       <p style={{ color: "red" }}>{formik.errors.dob}</p>
                    </div>

                    {/* Terms and Conditions Checkbox */}
                <div style={{ marginTop: "10px" }}>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formik.values.terms}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="terms"> I accept the terms and conditions</label>
                </div>
                <button type="submit" className="bg-blue-600 flex justify-center w-full text-lg hover:bg-blue-700 rounded-lg">Sign Up</button>
            </form>
        </div>
        </div>
        </>
    )
}




type CreatePostBody = {
    fullName:string;
    email:string;
    phoneNumber:string;
    nationalId:string;
    password:string;
    kraPin:string;
    dateOfBirth: string;      
    termsAccepted: boolean;
  };

type CreateResponseBody={
    accessToken: string,
    refreshToken: string,
    // role:string,
    // fullName:string
}
 

const createRegisterPost = async (data: CreatePostBody): Promise<CreateResponseBody> => {
    const response = await axios.post<CreateResponseBody>(
        `${import.meta.env.VITE_API_URL}/api/auth/register/customer`, 
        data
    );
    console.log(response.data)
    return response.data;
  }


export default Registerform;