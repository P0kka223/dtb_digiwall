import { useState } from "react";
import { useGetTransactionsQuery } from "../services/apiSlice";
import { useGetWalletQuery } from "../services/apiSlice";
import { Link } from "react-router-dom";

const Userdashboard: React.FC = ()=>{
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navItems = [
        {name: "Dashboard", icon: "=", path: ""},
        {name: "Wallet", icon: "=", path:""},
        {name: "Transactions", icon: "=", path: ""},
        {name: "Pending payments", icon: "=", path: "/paymentRequest"},
     ]
    
     const { data: transactions=[]} = useGetTransactionsQuery(); //made the transactions set to empty 
     const { data: wallet} = useGetWalletQuery();





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
                {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex justify-between p-2 rounded hover:bg-gray-100"
            >
              <span>{item.name}</span>
              <span>{item.icon}</span>
            </Link>
          ))}
        </div>
        </div>
        {/*Main content*/}
        
        
<main className="flex-1">
    <header className = "bg-blue-600 flex justify-between p-4">
        <button className="p-2 text-xl font-bold lg:hidden" onClick={()=> setSidebarOpen(true)}>=</button>
        <h1 className="text-xl">Dashboard</h1>
        <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
    </header>
        <div className="p-4 flex bg-gray-100 text-xl border border-gray-500">
            <h2>Account Balance:</h2>
          <p>{wallet?.availableBalance?.toLocaleString()}</p> 
    </div>
    <div>
    <div className="p-4 flex justify-center text-xl  border-b">
       <h2>Transaction history(Last 5 transactions)</h2>
         </div>
        
             {transactions.map((tx) => (
        <div key={tx.id} className="transaction-card flex justify-center p-4 shadow text-xl">
          <div>
           
            <span>{new Date(tx.createdAt).toLocaleDateString("en-KE", {
  day: "numeric",
  month: "short",
  year: "numeric"
})}</span>
          </div>
          <div>
            <span>KES {tx.amount.toLocaleString()}</span>
            <span>{tx.status}</span>
            
          </div>
        </div>
      ))}
    </div>
        </main>
 </div> 

      
    )
}
 
export default Userdashboard;