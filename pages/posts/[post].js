import Post from "@/components/post";
import Nav from "@/components/nav";
import { MongoClient } from "mongodb";
import shadow from '@/components/images/shadow.svg';
import Footer from "@/components/footer";



const uri = process.env.DB_URI;

export async function getStaticProps({params}){
    const client = new MongoClient(uri);
    let post;
    try {
      await client.connect();
      const db = client.db("blog");
      const category = db.collection('posts');
      const commentCollection = db.collection('postComments');
     
      
      let body = await category.findOne({id:params.post},{projection:{_id:0}});
      let comments = await commentCollection.find({postId: params.post},{projection:{_id:0}}).sort({_id: -1}).toArray()
      body.comments = comments;
      console.log(comments,body)
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
      pathsArr = await category.find({},{projection:{_id:0,id:1}}).toArray();
      // console.log(pathsArr)
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

// console.log(learning)
    return {paths,fallback: false}
  }

export default function Learning({post}){
    // console.log(post)
    return(
    <>
      <div>
        <Nav />
          <Post shadow={shadow} post={post} />
        <Footer />
      </div>
    </>
    )
  }
