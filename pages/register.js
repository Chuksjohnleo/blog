import Register from "@/components/register";
import Head from "next/head";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function register(){
    return(
    <>
      <Head>
        <title>home page of TheBlogingBloggerBlog</title>
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