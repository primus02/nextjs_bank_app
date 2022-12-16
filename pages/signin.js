import React, { useState } from 'react';
import {useRouter} from "next/router";

function Signin() {
const router= useRouter();

  const [info, setInfo]= useState({
    email: "",
    password: ""
  });

const handleChange=(e)=> {
   setInfo(oldInfo=> {
       oldInfo[`${e.target.name}`]= e.target.value;
       return oldInfo;
   })
}

  const handleSubmit=(e)=> {
       e.preventDefault();
      
       fetch(`http://localhost:4000/users?email=${info.email}&password=${info.password}`)
       .then(res=> res.json())
       .then(user=> {
           if(user.length < 1){
            alert("Invalid Email/Password");
            return;
           }
           else{
              alert("Sign in successful")
               localStorage.setItem("USER", JSON.stringify(user[0]));
              router.push("/dashboard");
           }
       })
       .catch(err=> console.log(err))
  }

  return (
    <div className="sign-user">
        <h3> Enter a valid email and password to sign in</h3>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <p><input required type="text" placeholder='Enter your email' name="email" defaultValue={info.email} onChange={(e)=> handleChange(e)}/></p>
            <p><input required type='password' placeholder='Enter your password' name="password" defaultValue={info.password} onChange={(e)=> handleChange(e)}/></p>
            <p><button> Sign in </button></p>
        </form>
    </div>
  )
}

export default Signin;