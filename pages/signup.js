import React, {useState} from 'react';
import {useRouter} from "next/router";

function Signup() {
  const router= useRouter();

    const [info, setInfo]= useState({
        email: "",
        password: "",
        fullName: "",
        address: "",
        confirmPassword: ""
      });
    
    const handleChange=(e)=> {
       setInfo(oldInfo=> {
           oldInfo[`${e.target.name}`]= e.target.value;
           return oldInfo;
       })
    
    }

    const handleSubmit=(e)=> {
        e.preventDefault();

        if(info.password !== info.confirmPassword){
            alert("Passwords must match")
            return;
        }

        fetch(`http://localhost:4000/users?email=${info.email}`)
       .then(res=> res.json())
       .then(user=> {
           if(user.length > 0){
            alert("Email already exists");
            return;
           }
           else{
            fetch(`http://localhost:4000/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: info.fullName,
                    address: info.address,
                    email: info.email,
                    password: info.password,
                    balance: 0,
                    transaction_history: []
                })
            })
            .then(res=> {
                   alert("Registration successful")
                   router.push("/signin");
            })
            .catch(err=> console.log(err))
     
           }
       })
       .catch(err=> console.log(err));     
        
   }


  return (
    <div className="sign-user">
        <h3>Fill in the form below to create an account<br/>All fields are required</h3>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <p><input type="text" placeholder='Enter your full name' name="fullName" required defaultValue={info.fullName} onChange={(e)=> handleChange(e)}/></p>
            <p><input type="text" placeholder='Enter your address' name="address" required defaultValue={info.address} onChange={(e)=> handleChange(e)}/></p>
            <p><input type="email" placeholder='Enter your email' name="email" required defaultValue={info.email} onChange={(e)=> handleChange(e)}/></p>
            <p><input type="password" placeholder='Enter your password' name="password" required defaultValue={info.password} onChange={(e)=> handleChange(e)}/></p>
            <p><input type="password" placeholder='Confirm password' name="confirmPassword" required defaultValue={info.confirmPassword} onChange={(e)=> handleChange(e)}/></p>
            <p><button>Submit details</button></p>
        </form>
    </div>
  )
}

export default Signup;