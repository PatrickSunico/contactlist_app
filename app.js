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


//Get Route
//Show all contacts
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


//Create Route
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

//Delete Route
app.delete('/contacts/:id', function(req, res){
  var id = req.params.id;
  // console.log(id);
  Contact.findByIdAndRemove(id, function(err, contact) {
    if(err) {
      console.log(err);
      throw err;
    } else {
      res.json(contact);
    }
  });
});


app.get('/contacts/:id', function(req,res){
  var id = req.params.id;
  console.log(id);
  Contact.findById(id,function(err,foundContact) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json(foundContact);
    }
  });
});

app.put('/contacts/:id', function(req, res) {
  var id = req.params.id;


  var newContact = {
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  };

  Contact.findByIdAndUpdate(id,newContact, function(err, updatedContact){
    if(err){
      console.log(err);
    } else {
      res.json(updatedContact);
    }
  });
});

app.listen(3000,function(){
  console.log('Server Stared');
});
