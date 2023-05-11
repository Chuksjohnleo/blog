import Register from "@/components/register";
import Head from "next/head";
import Nav from "@/components/nav";
import Meta from "@/components/meta";
import Footer from "@/components/footer";

export default function register(){
    return(
    <>
      <Head>
            <Meta 
              
              ogImage={'/favicon_io/favicon-32x32.png'} 
              title={'Register | TheBlogging'} 
              description={`Everything you have to know about
               a website. Register to continue.`} />
           
      </Head>
      <div>
          <Nav />
          <div>
           <Register />
          </div>
          <div>
            <Footer />
          </div>
      </div>
    </>
    )
}