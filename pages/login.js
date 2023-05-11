import Login from "@/components/login";
import Head from "next/head";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Meta from "@/components/meta";

export default function register(){
const title = 'Login | TheBlogging';
const ogImage = '/favicon_io/favicon-32x32.png';
const description = `Everything you have to know about a website
and website development. Login to continue`
    return(
    <>
      <Head>
            {/* <Meta 
              
              ogImage={'/favicon_io/favicon-32x32.png'} 
              title={'Login | TheBlogging'} 
              description={`Everything you have to know about
               a website. Login to continue.`} /> */}
                <title>{title}</title> 
         <link rel="shortcut icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
         <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
         <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
         <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
         <link rel="manifest" href="/favicon_io/site.webmanifest" />
         <meta property="description" content={description} />
         <meta property="og:url" content={'https://blog-pearl-five.vercel.app/'} />
         <meta property="og:type" content="website" />
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={ogImage} />
         <meta name="twitter:site" content="@Chuksjohnleo" />
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={title} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={ogImage} />
           
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