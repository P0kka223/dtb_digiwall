import {  FormikProvider, useFormik } from "formik";
import { paymentRequestSchema } from "../../schemas/schema";
import { useCreatePaymentRequestMutation, type paymentPostRequest } from "../../features/api/api";
import { Form } from "formik";
import CustomInput from "../elements/customInput";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const PaymentRequestForm: React.FC = () => {

    const [createPaymentRequest]=useCreatePaymentRequestMutation()

const paymentRequestInitialvalues={
    email:"",
    amount:"" as unknown as number,
    description:""
}

const formik=useFormik({
    initialValues:paymentRequestInitialvalues,
    validationSchema: paymentRequestSchema,
    onSubmit: async(values: paymentPostRequest)=>{
    createPaymentRequest(values);
    console.log("PaymentRequest>>>>> ")
}})

return(
    <FormikProvider value={formik}>
    <Form>
        <h3>Payment Request Form</h3>
        <CustomInput
        label="email"
        name="email"
        type="text"
        placeholder="Enter Recipients email"
      />
        <CustomInput
        label="amount"
        name="amount"
        type="text"
        />
        {/* <TextareaAutosize
        aria-label="description"
        minRows={3}
        placeholder="Minimum 3 rows"
        style={{ width: 200 }}
        type="text"
        /> */}
        <CustomInput
        label="description"
        name="description"
        type="text"
        />

        <Button disabled={formik.isSubmitting} type="submit">
        {formik.isSubmitting ? "Creating Payment Request..." : "Create Payment Request"}
      </Button>
    </Form>
    </FormikProvider>
)}

export default PaymentRequestForm
