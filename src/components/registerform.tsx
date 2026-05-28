import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import {loginSuccess} from "../state/reducers/authSlice";
import { nanoid } from "@reduxjs/toolkit";

const Registerform:React.FC = ()=>{
const dispatch = useDispatch();
 const [errors, setErrors] = useState <Partial<Record<keyof RegistrationForm, string>>>({});
interface RegistrationForm{
        fullname:string;
        email:string;
        pnumber:string;
        idnumber:string;
        password:string;
        KRA:string;
        dob:string;
        terms:boolean;
    }

 const[formData,setData] = useState<RegistrationForm>({
    fullname:"",
    email:"",
    pnumber:"",
    idnumber:"",
    password:"",
    KRA:"",
    dob:"",
    terms:false
 });
 //monitors the keystrokes
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value,type,checked } = e.target;

  const finalValue = type === 'checkbox' ? checked : value;

  setData((prev) => ({
    ...prev,
    [name]: finalValue,
  }));
};
//stops the page from refreshing
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const apiPayload: CreatePostBody = {
        fullName: formData.fullname,
        email: formData.email,
        phoneNumber: formData.pnumber,
        nationalId: formData.idnumber,
        password: formData.password,
        kraPin: formData.KRA,
        dateOfBirth: formData.dob,
        termsAccepted: true
    };

    createRegisterPost(apiPayload)
    console.log("handled successfully", formData)

   

try{
    await registrationSchema.validate(formData, {abortEarly: false})
    setErrors({}); 

const response = await createRegisterPost(apiPayload);
dispatch(loginSuccess({
  user: {                           // ← wrap user fields inside user object
    username: formData.fullname,
    email: formData.email,
  },
  token: response.accessToken    

}));

}
catch (err) {
   
    if (err instanceof Yup.ValidationError) {
      const fieldErrors: Partial<Record<keyof RegistrationForm, string>> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          fieldErrors[error.path as keyof RegistrationForm] = error.message;
        }
      });
      setErrors(fieldErrors);
    }
  }
};

//yup validation schema which contains the list of all the validation checks 
const registrationSchema = Yup.object().shape({
    fullname: Yup.string()
    .required("Name is required")
    .min(3, "Name must have atleast three characters"),
    email: Yup.string()
    .required("Enter your email address")
    .email("Email is required"),
    pnumber:Yup.string()
    .required("Enter your phone number")
    .length(10, "Must be 10 numbers")
    .matches(/^[0-9]+$/, "Must be a valid phone number"),
    idnumber: Yup.string()
    .required("Id number must be valid")
    .length(8, "Must have a maximum of 8"),
    password: Yup.string()
    .required("Enter your password")
    .length(10, "Password must be 10 characters"),
    KRA: Yup.string()
    .required("Enter your KRA pin")
    .length(11, "Your KRA pin must be 11 characters"),
    dob: Yup.string()
    .required("Enter your date of birth")


})


    return(
        <>
        <h1>Register Form</h1>
        <div>
            <form onSubmit = {handleSubmit}>
                <div>

                <label htmlFor="fullname">First Name</label>
                <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter your first name"
                value={formData.fullname} 
              onChange={handleChange}
                />
   {errors.fullname && <p style={{ color: "red", fontSize: "12px" }}>{errors.fullname}</p>}
                </div>

                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email} 
              onChange={handleChange}/>
                <label htmlFor="pnumber">Phone number</label>
                <input
                type="text"
                id="pnumber"
                name="pnumber"
                placeholder="Enter your phone number"
                value={formData.pnumber} 
              onChange={handleChange}/>
                <label htmlFor="idnumber">ID number</label>
                <input
                type="number"
                id="idnumber"
                name="idnumber"
                placeholder="Enter your ID number"
                value={formData.idnumber}
              onChange={handleChange}/>
              <label htmlFor="password">Password</label>
                <input
                type="string"
                id="password"
                name="password"
                placeholder="Enter your Password number"
                value={formData.password}
                onChange={handleChange}/> 
                <label htmlFor="KRA">KRA</label>
                <input
                type="string"
                id="KRA"
                name="KRA"
                placeholder="Enter your Kra number"
                value={formData.KRA} 
              onChange={handleChange}/>
                    <div>
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob} // Format: yyyy-mm-dd
                        onChange={handleChange}
                        required
                    />
                    </div>

                    {/* Terms and Conditions Checkbox */}
                <div style={{ marginTop: "10px" }}>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                    />
                    <label htmlFor="terms"> I accept the terms and conditions</label>
                </div>


              
              

                <button type="submit">Sign Up</button>
            </form>
        </div>
        </>
    )
}

export default Registerform;


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