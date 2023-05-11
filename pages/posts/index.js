import Image from 'next/image';
import Nav from '@/components/nav';
import HomePage from '@/components/homePage';
import Footer from '@/components/footer';
import Head from 'next/head';
import Posts from '@/components/posts';
import Meta from '@/components/meta';

import { MongoClient } from "mongodb";

const uri = process.env.DB_URI;

export async function getServerSideProps() {
    const client = new MongoClient(uri);
    let posts = [];
try {
      await client.connect();
      const db = client.db("blog");
      const postCollection = db.collection('posts')
   
      posts = await postCollection.find({}, {projection:{_id: 0, postbody: 0}}).toArray()
    
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

  return (
    <>
      <Head>
            <Meta 
             
              ogImage={'/favicon_io/favicon-32x32.png'} 
              title={'Chuksjohnleo | posts'} 
              description={'Everything you have to know about a website'} />
           
      </Head>
      <div>
          <Nav path={'allPosts'} />
          <div className='max-w-500'>
           <Posts posts={posts} />
          </div>
          <div>
            <Footer />
          </div>
      </div>
    </>
  )
}
