//Dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var app = express();
//=========================================================
//MongoDB Models
var Contact = require('./models/contact');
//=========================================================

//=========================================================
//Mongoose Model Config
mongoose.connect('mongodb://localhost/contacts');
var db = mongoose.connection;
//=========================================================

//MongoDB Connection err handling
//=========================================================
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Mongo db Connected');
});
//=========================================================

//MiddleWares
//=========================================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
//=========================================================




app.get('/contacts', function(req,res){

  console.log('I recieved a GET Request');

  //Todo Create a SEED for the DATABASE
  // Contact.create({name: 'WowuFranku', email: 'wowu@gmail.com', number:'(555)-5555'}, function(err, newContact) {
  //   if(err) {
  //     console.log(err)
  //     throw err;
  //   } else {
  //     console.log(newContact);
  //   }
  // });
  Contact.find({}, function(err,contacts){
    if(err) {
      console.log(err);
      throw err;
    } else {
      res.json(contacts);
    }
  });
});

app.post('/contacts', function(req,res) {
  console.log(req.body); // from terminal

  Contact.create(req.body, function(err, newContact){
    if(err) {
      console.log(err);
      throw err;
    } else {
      res.json(newContact);
    }
  });
});

app.listen(3000,function(){
  console.log('Server Stared');
});
