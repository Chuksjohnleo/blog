import { MongoClient } from "mongodb";
const uri = process.env.DB_URI;


export default async function saveCleanedComment(req, res, commentId, commentBody, imagesSrc){
   
const client = new MongoClient(uri);

try {
      await client.connect();
      const db = client.db("blog");
      const category = db.collection('posts');
      const comments = db.collection('postComments');
    
     
  const data =   await comments.insertOne({
    postId: req.body.postId,
    commenter: req.body.commenter,
    commenterId: req.body.commenterId,
    commentId: 'c'+commentId,
    comment: `<div class='ql-container ql-snow' >
                 <div class='ql-editor'>
                  ${commentBody}
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
commentId: 'c'+commentId},
{projection:{_id:0}})

if(data.acknowledged===true) res.json({comment: addedComment});
console.log(data);
   } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
  }
}
