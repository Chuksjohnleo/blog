import fs from 'fs';
import path from 'path';
import {JSDOM} from 'jsdom';
import { MongoClient } from "mongodb";
const uri = process.env.DB_URI;
import saveCleanedComment from '@/libs/saveComment';

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
    const dom = new JSDOM(req.body.comment);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
    let imagesSrc = [];

   
    await client.connect();
    const db = client.db("blog");
    const counter = db.collection("commentsCounter");
    const category = db.collection('posts');
    const comments = db.collection('postComments');

    
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
     
  //extract the dataurl from the img tags and store the images in the server
  if(images.length > 0){
  images.forEach((image,i)=>{
  const date = Date.now();
  const imageDataUrl = image.getAttribute('src');
  const imageData = imageDataUrl.split(',')[1];
  const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];

  //get the filepath
  const filePath = path.join(process.cwd(), 'public', 'comment_uploads', `${date}s${i}id${id.value.count}.${extension}`);
  console.log(filePath)
  //const filePath = `./public/comment_uploads/${date}s${i}id${id.value.count}.${extension}`;
  //store the file in my filesystem
  fs.writeFile(filePath, imageData, 'base64', (err) => {
    if (err) {
      console.error(err);
    }else{
      console.log('yes')
      image.src = `/comment_uploads/${date}s${i}id${id.value.count}.${extension}`;
      image.alt = `comment-image-${date}-s${i}id${id.value.count}`;
      imagesSrc.push(image.src);
      if(i === images.length-1){
        //The post body is replaced with the cleaned post
        saveCleanedComment(req, res, id.value.count, document.querySelector('body').innerHTML, imagesSrc);
      }
     }
    })
 });
}else{

  const data =   await comments.insertOne({
    postId:  req.body.postId,
    commenter: req.body.commenter,
    commenterId: req.body.commenterId,
    commentId: 'c'+id.value.count,
    comment: `<div class='ql-container ql-snow' >
                 <div class='ql-editor'>
                  ${req.body.comment}
                 </div>
              </div>`,
    category: req.body.category,
    images: imagesSrc,
    date: Date(),
    replyCount: 0,
    likes: 0,
    shares: 0
  });

if(data.acknowledged === true){
const incrementCommentCount =  await category.updateOne({ id: req.body.postId },{
  $inc:{ commentCount: 1 }
});
console.log(incrementCommentCount)
}

const addedComment = await comments.findOne({ 
commenterId: req.body.commenterId,
commentId: 'c'+id.value.count},
{projection:{_id:0}})

if(data.acknowledged===true) res.json({comment: addedComment});
console.log(data);

}
 
} catch (e) {
    res.json("error");
    if (e) console.log(e);
  } finally {
    await client.close();
}

  } else res.json("chai");
}