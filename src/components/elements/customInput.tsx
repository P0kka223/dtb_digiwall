import React from 'react';
import { useField } from 'formik';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
  }

const CustomInput=({label,...props}: CustomInputProps)=>{
    //field being the wiring like onBlur etc and 
    //meta being things like status eg errors and touched
    const [field, meta] = useField(props);
    // console.log('field',field);
    // console.log('meta',meta);
    return(
        <>
        {/* we first get the label */}
        <label>{label}</label>
        {/* now we are dumping the formik abilities into the input. Also we configure errors */}
        {/* this one is for the input */}
        <input {...field} {...props} className={meta.touched && meta.error ? "input-error": "" }/>
        {/* this one is for the message being displayed underneath */}
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    )
}
export default CustomInput;