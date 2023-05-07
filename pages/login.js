import Login from "@/components/login";
import Head from "next/head";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function register(){
    return(
    <>
      <Head>
        <title>Login | TheBlogging</title>
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