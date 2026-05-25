import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// EXP:min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema=yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5).matches(passwordRules,"Please enter a password with more than 5 character, 1 upper and 1 lower case as well as 1 digit").required("Required")
})

// EXP:Automatically generate the TypeScript type based on the schema above
export type LoginValues = yup.InferType<typeof loginSchema>;

export const regCustSchema=yup.object().shape({
    fullName: yup.string().max(30,"Must be less than 30 character").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    phoneNumber: yup.string().matches(/^[0-9.]+$/, "Must be only numbers"),
    nationalId: yup.string().required("Required"),
    password: yup.string().min(5).matches(passwordRules,"Please enter a password with more than 5 character, 1 upper and 1 lower case as well as 1 digit").required("Required"),
    kraPin: yup.string().required("Required"),
    dateOfBirth: yup.string().required("Required")    , 
    termsAccepted: yup.boolean().oneOf([true], "Please accept the terms of service").required("Required"),
})


export type RegCustValues = yup.InferType<typeof regCustSchema>;

export const regMerchantSchema = yup.object().shape({
    fullName: yup.string().max(30, "Must be less than 30 characters").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    phoneNumber: yup.string().matches(/^[0-9.]+$/, "Must be only numbers").required("Required"), // Added required since it's a merchant!
    nationalId: yup.string().required("Required"),
    password: yup.string()
        .min(5)
        .matches(passwordRules, "Please enter a password with more than 5 characters, 1 upper and 1 lower case as well as 1 digit")
        .required("Required"),
    kraPin: yup.string().required("Required"),
    dateOfBirth: yup.string().required("Required"),
    termsAccepted: yup.boolean().oneOf([true], "Please accept the terms of service").required("Required"),
    businessName: yup.string().required("Required"),
    businessRegNum: yup.string().required("Required"),
    businessKraPin: yup.string().required("Required"),
    businessType: yup.string().required("Required"),
    bankName: yup.string().required("Required"),
    bankAccountNum: yup.number()
        .typeError("Bank account must be a valid number") // Protects against users typing text
        .positive("Bank account number cannot be negative")
        .integer("Bank account number cannot contain decimals")
        .required("Required"),
    bankAccountHolder: yup.string().required("Required"),
});

export type RegMerchantValues = yup.InferType<typeof regMerchantSchema>;