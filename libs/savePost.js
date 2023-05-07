import { MongoClient } from "mongodb";
const uri = process.env.DB_URI;


export default async function saveRefinedPost(req, res, postId, postBody, imagesSrc){
   
const client = new MongoClient(uri);

try {
      await client.connect();
      const db = client.db("blog");
      const category = db.collection('posts');
    
      const addPost =   await category.insertOne({
          id: "p"+postId,
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
                         ${postBody}
                      </div>
                     </div>`,
          commentCount: 0,
          likes: 0,
          shares: 0
        });
        
        await category.find().toArray();
        res.json({postId: `p${postId}`});
        console.log(addPost)
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
   }
