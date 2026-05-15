import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch } from "react-redux";


const Registerform:React.FC = ()=>{
    
interface RegistrationForm{
        fname:string;
        lname: string;
        email:string;
        pnumber:string;
        idnumber:string;
        KRA:string;
    }
    interface IValidationError {
        fname?: string
    }

    const [validationErrors, setValidationErrors]=useState<IValidationError>({})
 const[formData,setData] = useState<RegistrationForm>({
    fname:"",
    lname:"",
    email:"",
    pnumber:"",
    idnumber:"",
    KRA:"",
 });
 //monitors the keystrokes
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
    if(name ==='fname'){
        value.length < 10 ? setValidationErrors({fname: 'First name cannot be longer than 10 characters'}):setValidationErrors({fname: ''})
    }
  setData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
//stops the page from refreshing
const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log("handled successfully", formData)
}
    return(
        <>
        <h1>Register Form</h1>
        <div>
            <form onSubmit = {handleSubmit}>
                <div>

                <label htmlFor="fname">First Name</label>
                <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter your first name"
                value={formData.fname} 
              onChange={handleChange}
                />
                {validationErrors.fname && <label>{validationErrors.fname}</label>}
                </div>
                 <label htmlFor="lname">Last Name</label>
                <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Enter your last name"
                value={formData.lname} 
              onChange={handleChange}/>
                
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
                type="number"
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
                <label htmlFor="KRA">KRA</label>
                <input
                type="number"
                id="KRA"
                name="KRA"
                placeholder="Enter your Kra number"
                value={formData.KRA} 
              onChange={handleChange}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </>
    )
}

export default Registerform;