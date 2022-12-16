import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Header() {
    const router= useRouter(); 
    const [show, setShow]= useState(true);

    useEffect(()=> {
    if(localStorage.getItem("USER") === null){
        setShow(false);
    }
    else{
    setShow(true);
    }
  })
   

    const signOut=()=> {
        localStorage.removeItem("USER");
        router.push("/")
    }


  return (
    <nav>
        <h3>Bank App</h3>
        {show && <p><button onClick={signOut}>Sign out</button></p>}
    </nav>
  )
}

export default Header;