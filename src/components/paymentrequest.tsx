import { useNavigate } from "react-router";
import {useGetPaymentPendingQuery, useApproveRequestMutation, useRejectRequestMutation } from "../services/apiSlice";


const PaymentRequest: React.FC = () => {
  const { data: pendingPayments = [], isLoading, isError } = useGetPaymentPendingQuery();
const [approveRequest] = useApproveRequestMutation();
const[rejectRequest] = useRejectRequestMutation();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load.</p>;

  return (
    <div>
      <div className = "flex justify-center bg-blue-600 p-4">
      <h2 className="text-xl">Pending Payments</h2>
      </div>
      {pendingPayments.map(item => (
        <div key={item.merchantEmail} className = "flex p-4 justify-center border-2 hover:bg-gray-300 rounded text-xl">
          <p className="p-4">{item.merchantEmail}</p>
          <p className="p-4">{item.amount}</p>
          <p className="p-4">{item.description}</p>
          <div>
          <button onClick={() => approveRequest({ id: String(item.id) })}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >Approve</button>
          <button onClick={() => rejectRequest({ id: String(item.id) })}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reject</button>
            </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentRequest;