import React,{ useState } from "react";
import { useGetTransactionsQuery } from "../services/apiSlice";

const Transaction: React.FC = ()=>{
    const {data: transactions=[]} = useGetTransactionsQuery()

    return(
        <>
        <div>
            <div  className="flex justify-center w-screen bg-blue-600 p-4">
            <h1>Transactions page</h1>
            </div>
            <div >
                {transactions.map((tx)=>(
<div className="flex justify-center shadow-md border border-gray-300 rounded-xl bg-gray-100" key={tx.id}>
<span className="p-10">{tx.id}</span>
<span className="p-10">{tx.amount}</span>
<span className="p-10">{tx.description}</span>
</div>
                ))

                }
            </div>
        </div>
        </>
    )
}

export default Transaction;