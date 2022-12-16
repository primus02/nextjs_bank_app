import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from "next/link";


function Dashboard() {
    const router= useRouter();

    const [user, setUSer]= useState({});
    const [showTransaction, setShowTransaction]= useState(false);
    const [showBalance, setShowBalance]= useState(false);
   
useEffect(()=> {
   let storedUser= localStorage.getItem("USER");
   if(storedUser){
   const {id}= JSON.parse(storedUser);

   fetch(`http://localhost:4000/users/${id}`)
   .then(res=> res.json())
   .then(user=> setUSer(user))
   .catch(err=> console.log(err));
   }
   else{
    router.push("/");
   }
}, [])

  return (
    <div className="dashboard-container">
        <h2>Welcome to your dashboard- { user.name ? user.name : "user" }</h2>
        <div className="user-info">
             <h4><button><Link href={"/transaction/credit"}>Add funds +</Link></button><button><Link href={"/transaction/debit"}>Withdraw funds -</Link></button></h4>
             <h3>Full Name: {user.name}</h3>
             <h3>Email Address: {user.email}</h3>
             <h3>Address: {user.address}</h3>
             <h3>Total Balance($) : {showBalance ? user.balance : "*".repeat(4)} <button onClick={()=> setShowBalance(!showBalance)}>{showBalance ? "hide balance" : "show balance"}</button></h3>
             <div>
                <p><button onClick={()=> setShowTransaction(!showTransaction)}>Transaction history</button></p>
               { showTransaction && (
                <table>
                    <thead>
                        <tr>
                            <th>Transaction_amount ($)</th>
                            <th>Transaction_type</th>
                            <th>Transaction_date</th>
                        </tr>
                    </thead>
                   
                    <tbody>
                    {user.transaction_history.length > 0 ? user.transaction_history.map(t=> (
                        <tr key={t.createdAt} className={t.transaction_type === "credit" ? "credit" : "debit"}>
                            <td>{t.amount}</td>
                            <td>{t.transaction_type}</td>
                            <td>{t.createdAt}</td>
                        </tr>
                    )) : <p style={{color: 'red'}}>No transaction history found</p>}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Transaction_amount ($)</th>
                            <th>Transaction_type</th>
                            <th>Transaction_date</th>
                        </tr>
                    </tfoot>
                </table>
               )}
             </div>
        </div>
    </div>
  )
}

export default Dashboard;