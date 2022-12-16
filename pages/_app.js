import Head from 'next/head';
import '../styles/globals.css'
import Footer from './components/footer';
import Header from './components/header';

function MyApp({ Component, pageProps }) {
  return( 
    <>
   <Head>
       <title>NextJS Bank_App</title>
   </Head>
   
   <Header />
   <div className="content">
    <Component {...pageProps} /> 
   </div>
   <Footer />
    </>
  );
}

export default MyApp
