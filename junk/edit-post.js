import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { MongoClient } from "mongodb";
const uri = process.env.DB_URI;
import updateRefinedPost from '@/libs/editPost';

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
    
    const category = db.collection('posts');

  //extract the dataurl from the img tags and store the images in the server
  if(images.length > 0){
images.forEach((image, i)=>{
  console.log(i)
  const imageDataUrl = image.getAttribute('src');
  if(!imageDataUrl.startsWith('data:image')){
    console.log(!imageDataUrl.startsWith('data:image'));
    if(i === images.length-1){
       //The post body is replaced with the cleaned post
       updateRefinedPost(req, res, req.body.postId, document.querySelector('body').innerHTML, imagesSrc);
    }
    return;
  }
  console.log(!imageDataUrl.startsWith('data:image'),'uu')
  const date = Date.now();
  const imageData = imageDataUrl.split(',')[1];
  const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];
  
  //get the filepath
  const filePath = path.join(process.cwd(), 'public', 'uploads', `${date}s${i}id${req.body.postId}.${extension}`);
 
  //store the file in my filesystem

  fs.writeFile(filePath, imageData, 'base64', (err) => {
    if (err) {
      console.error(err);
    }else{
   
      image.src = `/uploads/${date}s${i}id${req.body.postId}.${extension}`;
      image.alt = `post-image-${date}-s${i}id${req.body.postId}`;
      imagesSrc.push(image.src);
      if(i === images.length-1){
        //The post body is replaced with the cleaned post
       updateRefinedPost(req, res, req.body.postId, document.querySelector('body').innerHTML, imagesSrc);
      }
     }
    })
 });
}else{
  const addPost =   await category.updateOne(
 { 
    id: req.body.postId 
 },
 { 
  $set: {
    lastEdited : Date(),
    title: req.body.title,
    description: req.body.description,
    category:req.body.category,
    theLength: req.body.theLength,
    status: req.body.status,
    postBody: req.body.post,
  }
 }
);

  res.json({postId: req.body.postId});
  
}
 
} catch (e) {
    res.json("error");
    if (e) console.log(e, req.body.category+'hh');
  } finally {
    await client.close();
}

  } else res.json("chai");
}