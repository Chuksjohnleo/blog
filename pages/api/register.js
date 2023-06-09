import { MongoClient } from "mongodb";
const uri = process.env.DB_URI;


export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body)
    const client = new MongoClient(uri);

try {
    await client.connect();
    const db = client.db("blog");
    const users = db.collection('users');
    const counter = db.collection("userCount");
   
    const id = await counter.findOneAndUpdate(
      { _id: "user_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );
 
       const data = await users.insertOne({
          id: "U"+id.value.count,
          firstname: req.body.firstname,
          surname: req.body.surname,
          email: req.body.email,
          gender: req.body.gender,
          password: req.body.password,
          joined: Date(),
        });

        const userData = await users.findOne({ id: "U"+id.value.count }, { projection: { _id:0, password: 0}})

        console.log(data)
        res.json({status:'yes',userData: userData});
       
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } else res.json("chai");
}