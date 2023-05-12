import fs from 'fs';
import path from 'path';
import {JSDOM} from 'jsdom';
import { MongoClient } from "mongodb";
const uri = process.env.DB_URI;
import saveRefinedPost from '@/libs/savePost';

  export  const config = {
    api:{
      bodyParser:{
        sizeLimit:'50mb'
      }
    }
  }


export default async function handler(req, res) {
if (req.method === "POST") {
  const client = new MongoClient(uri);
try{
    const dom = new JSDOM(req.body.post);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
    let imagesSrc = [];

   
    await client.connect();
    const db = client.db("blog");
    const counter = db.collection("counter");
    const category = db.collection('posts');

    
  //   const c = db.collection('posts')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)



    const id = await counter.findOneAndUpdate(
      { _id: "post_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );
     console.log(images.length)
  //extract the dataurl from the img tags and store the images in the server
  if(images.length > 0){
  images.forEach((image,i)=>{
  const date = Date.now();
  const imageDataUrl = image.getAttribute('src');
  const imageData = imageDataUrl.split(',')[1];
  const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];
console.log('process1:',process.cwd())
  //get the filepath
  const filePath = path.join(process.cwd(), 'public', 'uploads', `${date}s${i}id${id.value.count}.${extension}`);
 
  //const filePath = `${process.cwd()}/public/uploads/${date}s${i}id${id.value.count}.${extension}`;
  //store the file in my filesystem
  console.log('process2:',filePath)
  fs.writeFile(filePath, imageData, 'base64', (err) => {
    if (err) {
      console.error(err);
    }else{
      console.log('yes')
      image.src = `/uploads/${date}s${i}id${id.value.count}.${extension}`;
      image.alt = `post-image-${date}-s${i}id${id.value.count}`;
      imagesSrc.push(image.src);
      if(i === images.length-1){
        //The post body is replaced with the cleaned post
        saveRefinedPost(req, res, id.value.count, document.querySelector('body').innerHTML, imagesSrc);
      }
     }
    })
 });
}else{

  const addPost =   await category.insertOne({
    id: "p"+id.value.count,
    poster: req.body.poster,
    posterId: req.body.posterId,
    date: Date(),
    title: req.body.title,
    description: req.body.description,
    images: imagesSrc,
    category:req.body.category,
    theLength: req.body.theLength,
    type: 'richText',
    postBody: `<div class='ql-container ql-snow' >
                <div class='ql-editor'>
                   ${req.body.post}
                </div>
               </div>`,
    commentCount: 0,
    likes: 0,
    shares: 0
  });
let ccc = await category.find().toArray()
let cc = await counter.find().toArray()
  res.json({postId: `p${id.value.count}`});
  console.log(addPost,cc, ccc.length)
}
 
} catch (e) {
    res.json("error");
    if (e) console.log(e);
  } finally {
    await client.close();
}

  } else res.json("chai");
}