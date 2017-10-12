const express  = require('express'); //Pulling express package
const app      = express(); //initializing express
const router   = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // ORM for MongoDB
const config   = require('./config/database'); //import database.js module
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const path     = require('path'); //NodeJS Package for file paths
const myClientDir   = '/client/dist/';
const myClientIndexFileName = 'index.html';
const myFrontEndDomain      = 'http://localhost:4200';
const port = process.env.PORT || 8080;

const authentication     = require('./routes/authentication')(router); // Import Authentication Routes
const blogs              = require('./routes/blogs')(router); // Import Authentication Routes


mongoose.Promise = global.Promise;

mongoose.connect(config.uri,(err)=>{
  if(err){
      console.log('Could not connect to db'+err);
  }else{      
      console.log('Connected to db');
      //console.log(config.secret);
  }
});

//middle ware
app.use(cors({ origin: myFrontEndDomain })); // Allows cross origin in development only
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse application/json
app.use(express.static(__dirname + myClientDir));//Provide static directory for frontend
app.use('/authentication', authentication); // Use Authentication routes in application
app.use('/blogs', blogs); // Use blog routes in application

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + myClientDir + myClientIndexFileName))
  //res.send('<h1>Hello Angular2</h1>');
});

/*
app.get('/', (req, res) => {
  res.send('<h1>Hello Angular2</h1>');
});
*/

app.listen(port, () => {
    console.log('Listening on port:' + port);
});