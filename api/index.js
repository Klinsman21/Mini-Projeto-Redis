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


//http://localhost:3000/updateUser/klinsman@gmail.com/name/klinsman/email/klinsman@gmail.com/password/123
app.get('/newUser/:name/email/:email/password/:password', crud.NewUser);
app.get('/updateUser/:usrID/name/:name/email/:email/password/:password', crud.UpdateUser);
app.get('/deleteUser/:usrID', crud.DeleteUser);
app.get('/searchUser/:usrID', crud.SearchUser);

app.get('/writeSketch/:usrID/text/:text', redis.WriteSketch);
app.get('/readSketch/:usrID', redis.ReadSketch);

app.listen(process.env.PORT, () => { 
  console.log(`http://localhost:${process.env.PORT}`); 
});