var express = require('express');
var mongojs = require('mongojs');
var body = require('body-parser');

var server = express();
var db = mongojs('mean',['test']);

server.use(express.static(__dirname));

server.use(body.json());

server.get('/getContacts',function(req, res){
    
    db.test.find(function (err, doc) {
        res.json(doc);
    });
    
});

server.post('/addContact',function(req, res){
    db.test.insert(req.body, function(err, doc){
        res.json(doc);
    });
});

server.get('/deleteUser/:id',function(req, res){
    var id = req.params.id;
    
    db.test.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
        
  });
});

server.post('/update',function(req, res){
    var user = req.body;
    db.test.findAndModify({
    query: {_id: mongojs.ObjectId(user._id)},
    update: {$set: {name: user.name, lastName: user.lastName, phone: user.phone}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

server.listen(7000,function(){console.log('MEAN server started')});
