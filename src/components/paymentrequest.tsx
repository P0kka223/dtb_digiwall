import { useNavigate } from "react-router";
import {useGetPaymentPendingQuery } from "../services/apiSlice";


const PaymentRequest: React.FC = () => {
  const { data: pendingPayments = [], isLoading, isError } = useGetPaymentPendingQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load.</p>;

  return (
    <div>
      <h2 className = "flex justify-center bg-blue-300">Pending Payments</h2>
      {pendingPayments.map(item => (
        <div key={item.merchantEmail} className = "flex p-4 justify-center">
          <p>{item.merchantEmail}</p>
          <p>{item.amount}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default PaymentRequest;