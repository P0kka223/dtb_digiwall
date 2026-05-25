import React from 'react';
import { useField } from 'formik';

interface customCheckBox extends React.InputHTMLAttributes<HTMLInputElement>{
    label:string;
    name:string;
}

const CustomCheckBox=({label,...props}: customCheckBox)=>{
    const [field, meta] = useField(props);
    console.log('field',field);
    console.log('meta',meta);
    return(
        <>
        <div className='checkbox'>
        <input {...field} {...props} className={meta.touched && meta.error ? "input-error": "" }/>       
        <span>I accept the terms of service</span>
        </div>
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    )
}
export default CustomCheckBox;