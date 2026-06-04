import { useState } from "react";
import { useGetTransactionsQuery } from "../services/apiSlice";
import { useGetWalletQuery } from "../services/apiSlice";

const Userdashboard: React.FC = ()=>{
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navItems = [
        {name: "Dashboard", icon: "="},
        {name: "Wallet", icon: "="},
        {name: "Transactions", icon: "="},
        {name: "Pending payments", icon: "="},
     ]
    
     const { data: transactions=[], isLoading: transactionLoading, isError: transactionError } = useGetTransactionsQuery(); //made the transactions set to empty 
     const { data: wallet, isLoading: walletLoading, isError:walletError } = useGetWalletQuery();





if (transactionLoading || walletLoading) return <p>Loading...</p>;
if (transactionError || walletError) return <p>Failed to load.</p>;
    return(
       <div className = "bg-gray-100 h-screen">
        {/*sidebar */}
        <div className={`fixed bg-white w-64 h-screen shadow -translate-x-64 ${sidebarOpen?"translate-x-0":"-translate-x-64"} 
        `}>
            <div className="p-4 flex justify-between border-b">
                <div className="text-xl font bold">Logo</div>
                <button onClick={()=>setSidebarOpen(false)}>X</button>
            </div>
            {/*navigation bar*/}
            <div className="p-4 space-y-2">
                {navItems.map(item =>{
                    return(
                        <div>
                            <div>{item.name}</div>
                            <div>{item.icon}</div>
                        </div>
                    )
                })}
            </div>
        </div>
        {/*Main content*/}
        <div>
             <h3>Recent Transactions (Last 5)</h3>
      {transactions.map((tx) => (
        <div key={tx.id} className="transaction-card">
          <div>
            <p>{tx.merchant_name}</p>
            <span>{tx.date}</span>
          </div>
          <div>
            <p>KES {tx.amount.toLocaleString()}</p>
            <span>{tx.status}</span>
          </div>
        </div>
      ))}
        </div>
<main className="flex-1">
    <header className = "bg-blue-100 flex justify-between p-4">
        <button className="p-2 text-xl font-bold lg:hidden" onClick={()=> setSidebarOpen(true)}>=</button>
        <h1>Dashboard</h1>
        <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
    </header>
        <div className="p-4 flex bg-gray-100 text-xl border border-gray-500">
            <h2>Account Balance:</h2>
    </div>
    <div className="p-4 flex justify-center text-xl  border-b">
       <h2>Transaction history(Last 5 transactions)</h2>
 <div>
    {transactionLoading ? <p>Loading...</p> : <h2>Transaction history</h2>}
  </div>
    </div>
</main>
       </div> 
    )
}
 
export default Userdashboard;