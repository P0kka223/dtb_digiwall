import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// EXP:min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

// Get today's date
const today = new Date();

// Calculate the date 18 years ago
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(today.getFullYear() - 18);


export const loginSchema=yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(8)
    // .matches(passwordRules,"Please enter a password with more than 5 character, 1 upper and 1 lower case as well as 1 digit").required("Required")
})

// EXP:Automatically generate the TypeScript type based on the schema above
export type LoginValues = yup.InferType<typeof loginSchema>;

export const regCustSchema=yup.object().shape({
    fullName: yup.string().max(30,"Must be less than 30 character").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    phoneNumber: yup.string().max(10).matches(/^[0-9.]+$/, "Must be only numbers").matches(/^07/, 'Phone number must start with 07').required(),
    nationalId: yup.string().max(8).required("Required"),
    password: yup.string().min(8),
    // .matches(passwordRules,"Please enter a password with more than 5 character, 1 upper and 1 lower case as well as 1 digit").required("Required"),
    kraPin: yup.string().required("Required").max(11).matches(/^A/, 'Must start with a capital A').matches(/B$/, 'Must end with a capital B'),
    dateOfBirth: yup.date().typeError('Please enter a valid date').max(today, 'Date of birth cannot be in the future')
    .max(eighteenYearsAgo, 'You must be at least 18 years old').required("Required")    , 
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
        // .matches(passwordRules, "Please enter a password with more than 5 characters, 1 upper and 1 lower case as well as 1 digit")
        .required("Required"),
    kraPin: yup.string().required("Required"),
    dateOfBirth: yup.string().required("Required"),
    termsAccepted: yup.boolean().oneOf([true], "Please accept the terms of service").required("Required"),
    businessName: yup.string().required("Required"),
    businessRegistrationNumber: yup.string().required("Required"),
    businessKraPin: yup.string().required("Required"),
    businessType: yup.string().required("Required"),
    bankName: yup.string().required("Required"),
    bankAccountNumber: yup.number()
        .typeError("Bank account must be a valid number") // Protects against users typing text
        .positive("Bank account number cannot be negative")
        .integer("Bank account number cannot contain decimals")
        .required("Required"),
    bankAccountHolderName: yup.string().required("Required"),
});

export type RegMerchantValues = yup.InferType<typeof regMerchantSchema>;