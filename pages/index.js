import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>You are welcome to <i>{process.env.NEXT_PUBLIC_PRIVATE_KEY}</i> Bank App!!!</h1>
     <div>
      <h3><span style={{color: 'red'}}>To create an an account</span> <button><Link href="/signup"> Sign up </Link></button></h3>
      <h3> <span style={{color: "green"}}>You have an account already?</span> <button><Link href="/signin"> Sign in </Link></button></h3>
     </div>
    </div>
  )
}
