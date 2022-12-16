import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

function Transaction() {
    const router= useRouter();
    const {transaction_type}= router.query;

    const [id,setId]= useState('');
    const [balance, setBalance]= useState('');
    const [history, setHistroy]= useState([]);
    const [amount, setAmount]= useState('');

    
useEffect(()=> {
  let storedUser= localStorage.getItem("USER");
  
  if(storedUser){
  const {id}= JSON.parse(storedUser);
  setId(id)

  fetch(`http://localhost:4000/users/${id}`)
  .then(res=> res.json())
  .then(user=> {
    setBalance(user.balance)
    setHistroy(user.transaction_history)

   // console.log(user.transaction_history)
  })
  .catch(err=> console.log(err));
  }
  else{
    router.push("/");
  }

}, [])
  
  const handleChange=(e)=> {
     setAmount(e.target.value); 
  }

  const handleSubmit=(e)=> {
      e.preventDefault();
      let totalBalance;

      if(transaction_type === "credit"){
        totalBalance= balance + parseInt(amount);
      }
      if(transaction_type === "debit"){
        totalBalance= balance - parseInt(amount);
      }
      
     history.push({amount: amount ,transaction_type: transaction_type, createdAt: new Date()});
  
   
      const data= {
        balance: totalBalance,
        transaction_history: history
      }

      fetch(`http://localhost:4000/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res=> {
        alert("Funds added successfully")
        router.push("/dashboard");
    })
    .catch(err=> console.log(err));

  }


  return (
    <div>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <input type="number" name="amount" required placeholder='Enter amount' value={amount} onChange={(e)=> handleChange(e)}/>

            <p><button>Execute transaction</button></p>
        </form>
    </div>
  )
}

export default Transaction;