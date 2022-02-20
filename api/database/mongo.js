const {MongoClient} = require('mongodb')
const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
const client = new MongoClient(url)

async function save(obj) {
  try {
    await client.connect()
    const db = client.db(process.env.MONGO_DB)
    const postsCollection = db.collection('posts')
    await postsCollection.insertOne(obj).then(console.log('OK'))
  }
  catch (err) {
    client.close()
    return false
  }
   finally{
    client.close()
    return true
  }
}

async function readAll(author) {
  let data = []
  try {
    await client.connect()
    const db = client.db(process.env.MONGO_DB)
    const postsCollection = db.collection('posts')
    const filter = {'author': author}
    await postsCollection.find(filter).forEach(post => data.push(post))

  }
  catch (err) {
    client.close()
    return false
  }
   finally{
    client.close()
    return data
  }
}

const SavePost = async(request, response) => {
  const post = {
    title: request.params.title,
    body: request.params.text,
    author: request.params.usrID,
    dateOfPost: request.params.date
  }
  let statusMongo = await save(post)
  if(statusMongo){
    response.status(200).json({'status': true});
  }
  else{
    response.status(200).json({'status': false});
  }

  
};

const  getAllPosts = async(request, response) => {
  let statusMongo = await readAll(request.params.usrID)
  if(statusMongo != false){
    console.log(statusMongo)
    response.status(200).json(statusMongo);
  }
  else{
    response.status(200).json({'status': false});
  }  
};



module.exports = {SavePost, getAllPosts};