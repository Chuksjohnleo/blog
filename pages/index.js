import { HomeContextProvider } from '@/context/context';
import Image from 'next/image';
import Nav from '@/components/nav';
import HomePage from '@/components/homePage';
import Footer from '@/components/footer';
import Head from 'next/head';
import MetaInfo from '@/components/meta';

import { MongoClient } from "mongodb";

const uri = process.env.DB_URI;

export async function getServerSideProps() {
    const client = new MongoClient(uri);
    let posts = [];
try {
      await client.connect();
      const db = client.db("blog");
      const postCollection = db.collection('posts')
   
      posts = await postCollection.find({}, {projection:{_id:0, postBody: 0}}).toArray();

    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }
    return {
      props: {
       posts
      },
    };
}




export default function Home({posts}) {
const title = 'Home | TheBlogging';
const ogImage = '/favicon_io/favicon-32x32.png';
const description = `Everything you have to know about a website
and website development.`
  return (
    <HomeContextProvider>
      <Head>
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
             
              {/* ogImage={'/favicon_io/favicon-32x32.png'} 
              title={'Home | TheBlogging'} 
              description={`Everything you have to know about a website
                and website development.`} /> */}
          {/* <title>title</title> */}
      </Head>
      <div>
          <Nav path='home' />
          <div className='max-w-500'>
           <HomePage posts={posts} />
          </div>
          <div>
            <Footer />
          </div>
      </div>
    </HomeContextProvider>
  )
}
