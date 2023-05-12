import Post from "@/components/post";
import Nav from "@/components/nav";
import { MongoClient } from "mongodb";
import shadow from '@/components/images/shadow.svg';
import Head from "next/head";
import Footer from "@/components/footer";
import { useRouter } from 'next/router';



const uri = process.env.DB_URI;

export async function getStaticProps({params}){
    const client = new MongoClient(uri);
    let post;
    try {
      await client.connect();
      const db = client.db("blog");
      const category = db.collection('posts');
      const commentCollection = db.collection('postComments');
     
      
      let body = await category.findOne({id: params.post}, {projection:{_id:0}});
      let comments = await commentCollection.find({postId: params.post},{projection:{_id:0}}).sort({_id: -1}).toArray()
      body.comments = comments;
    
      post = body;
    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }

    return {
      props: {
       post
      },
    };
}

export async function getStaticPaths() {
    const client = new MongoClient(uri);
    let pathsArr;
    try {
      await client.connect();
      const db = client.db("blog");
      const category = db.collection('posts');
      pathsArr = await category.find({},{projection:{_id:0, id:1}}).toArray();
    
    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }

   const paths =  pathsArr.map((path)=>{
        return {
          params:{post:  path.id.toString()}
        }
    });
    return {paths, fallback: true}
  }

export default function AllPosts({post}){
   
    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
const title = 'Post | TheBlogging';
const ogImage = '/favicon_io/favicon-32x32.png';
const description = `Everything you have to know about a website
and website development.`
        return (
        <>
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
            {/* <Meta 
             
              ogImage={'/favicon_io/favicon-32x32.png'} 
              title={'Chuksjohnleo | posts'} 
              description={'Everything you have to know about a website'} /> */}
           
          </Head>
          <div>Loading...</div>
        </>
        )
    }
const title = post.title;
const ogImage = post.images>0?post.images[0]:'/favicon_io/favicon-32x32.png';
const description = post.description;

    return(
    <>
      <Head>
            {/* <Meta 
             
              ogImage={post.images>0?post.images[0]:'/favicon_io/favicon-32x32.png'} 
              title={post.title} 
              description={post.description} /> */}
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
          <Post shadow={shadow} post={post} />
        <Footer />
      </div>
    </>
    )
  }
