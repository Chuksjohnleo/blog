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
      
function writeFileAsync(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, 'base64', (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  const imagesArray = [...images]
console.log(typeof images,typeof imagesArray)
  
    const promises = imagesArray.map((image, i) =>{
   
    const imageDataUrl = image.getAttribute('src');
    if(!imageDataUrl.startsWith('data:image')){
       imagesSrc.push(imageDataUrl);
       return '';
    }
    console.log(imageDataUrl[0])
    const date = Date.now();
    const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];
    const filePath = path.join(process.cwd(), 'public', 'uploads', `${date}s${i}id${req.body.postId}.${extension}`);
    
    const imageData = imageDataUrl.split(',')[1];
    const newSrc = `/uploads/${date}s${i}id${req.body.postId}.${extension}`;
    images[i].src = newSrc;
    images[i].alt = `post-image-${date}-s${i}id${req.body.postId}`;
    imagesSrc.push(newSrc);
    //the commented code below didn't work.
    // im.src = `/uploads/${date}s${i}id${req.body.postId}.${extension}`;
    // im.alt = `post-image-${date}-s${i}id${req.body.postId}`;
    // imagesSrc.push(im.src);
  
    return writeFileAsync(filePath, imageData)
});

console.log(promises, 'oo')
Promise.all(promises)
  .then(() => {
    updateRefinedPost(req, res, req.body.postId, document.querySelector('body').innerHTML, imagesSrc);
    console.log('All files written successfully.');
  })
  .catch((error) => {
    console.error('Error writing files:', 'error');
  });
}else{
  await category.updateOne(
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
    postBody: `<div class='ql-container ql-snow' >
    <div class='ql-editor'>
       ${req.body.post}
    </div>
   </div>`,
    images: []
  }
 }
);

  res.json({postId: req.body.postId});
  
}
 
} catch (e) {
    res.json("error");
    if (e) console.log(e, req.body.category+'catched erro');
  } finally {
    await client.close();
    req.body.images.forEach(image => {
        fs.unlink(path.join(process.cwd(), 'public', image), (e)=>{
          if(e) throw e
          console.log(image, 'deleted')
        })
    });
}

  } else res.json("chai");
}