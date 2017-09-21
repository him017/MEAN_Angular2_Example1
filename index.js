const express  = require('express'); //Pulling express package
const app      = express(); //initializing express
const mongoose = require('mongoose');
const config   = require('./config/database'); //import database.js module
const path     = require('path');
const myClientDir   = '/client/dist/';
const myClientIndexFileName = 'index.html';


mongoose.Promise = global.Promise;

mongoose.connect(config.uri,(err)=>{
  if(err){
      console.log('Could not connect to db'+err);
  }else{      
      console.log('Connected to db');
      //console.log(config.secret);
  }
});

app.use(express.static(__dirname + myClientDir));

app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname + myClientDir + myClientIndexFileName))
  //res.send('<h1>Hello Angular2</h1>');
});

/*
app.get('/', (req, res) => {
  res.send('<h1>Hello Angular2</h1>');
});
*/

app.listen(8080, () => {
    console.log('Listening on port 8080');
});