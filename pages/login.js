import Login from "@/components/login";
import Head from "next/head";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Meta from "@/components/meta";

export default function register(){
    return(
    <>
      <Head>
            <Meta 
              
              ogImage={'/favicon_io/favicon-32x32.png'} 
              title={'Login | TheBlogging'} 
              description={`Everything you have to know about
               a website. Login to continue.`} />
           
      </Head>
      <div>
          <Nav />
          <div>
           <Login />
          </div>
          <div>
            <Footer />
          </div>
      </div>
    </>
    )
}