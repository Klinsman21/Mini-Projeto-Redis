require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const crud = require('./database/crud')
const redis = require('./redisDatabase/redis')
const mongo = require('./database/mongo')
const neo4j = require('./database/neo4j')


//http://localhost:3000/updateUser/klinsman@gmail.com/name/klinsman/email/klinsman@gmail.com/password/123
app.get('/newUser/:name/email/:email/password/:password', crud.NewUser);
app.get('/updateUser/:usrID/name/:name/email/:email/password/:password', crud.UpdateUser);
app.get('/deleteUser/:usrID', crud.DeleteUser);
app.get('/searchUser/:usrID', crud.SearchUser);

app.get('/writeSketch/:usrID/text/:text', redis.WriteSketch);
app.get('/readSketch/:usrID', redis.ReadSketch);

app.get('/savePost/:usrID/body/:text/title/:title/date/:date', mongo.SavePost);
app.get('/readAllPosts/:usrID', mongo.getAllPosts);

// app.get('/saveNeo4j/:name/email/:email', neo4j.SaveUser);
// app.get('/removeNeo4j/:email', neo4j.DeleteUser);
// app.get('/follow/:email1/follow/:email2', neo4j.FollowUser);


app.post('/saveNeo4j', (req, res) => {
  const obj = {
    name: req.body.name,
    email: req.body.email,
  }
  neo4j.Create(obj)
  res.end("ok");
})

app.post('/removeNeo4j', (req, res) => {
  neo4j.Remove(req.body.email)
  res.end("ok");
})

app.post('/follow', (req, res) => {
  neo4j.Follow(req.body.email1, req.body.email2)
  res.end("ok");
})


app.listen(process.env.PORT, () => { 
  console.log(`http://localhost:${process.env.PORT}`); 
});