import { MongoClient } from "mongodb";
const uri = process.env.DB_URI;
import fs from 'fs';
import path from "path";


export default async function updateRefinedPost(req, res, postId, postBody, imagesSrc){
   
const client = new MongoClient(uri);

try {
      await client.connect();
      const db = client.db("blog");
      const category = db.collection('posts');
    
      const addPost =   await category.updateOne({ 
        id: req.body.postId 
     },
     { 
      $set: {
          lastEdited: Date(),
          title: req.body.title,
          description: req.body.description,
          images: imagesSrc,
          category: req.body.category,
          theLength: req.body.theLength,
          postBody: `<div class='ql-container ql-snow' >
                      <div class='ql-editor'>
                         ${postBody}
                      </div>
                     </div>`
        }
      }
    );
        res.json({postId: req.body.postId});
        console.log(addPost)
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
      req.body.images.forEach(image => {
        if(!imagesSrc.includes(image)){
          fs.unlink(path.join(process.cwd(), 'public', image), (e)=>{
            if(e) throw e
            console.log(image, 'deleted')
          })
        }
      });
    }
   }
