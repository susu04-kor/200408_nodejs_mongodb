var http = require("http");
var express = require("express");

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'bit';

var app = express();
app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);


app.get("/blogDetail", function(request, response){
      var _id = request.param("_id");

      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo.collection("articles").findOne({_id:new ObjectID(_id)}, function(err, result) {
        if (err) throw err;
      //  console.log(result);
        db.close();
        response.send(result);
      });
    });
});



app.get("/blogList", function(request, response){
  const client = new MongoClient(url);
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection('articles');
        col.find({}).toArray(function(err, docs) {
        client.close();
        response.send(docs);
      });
  });
});

app.get("/blogEdit", function(request, response){
  var _id = request.param("_id");
  var title = request.param("title");
  var content = request.param("content");

  // var q = {_id:new ObjectID(_id)}
  var doc = {title:title, content:content}

  console.log("수정할 문서"+doc);
  console.log("_id:"+_id);
  console.log("title:"+title);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = {_id:new ObjectID(_id)};
    var newvalues = { $set: doc };
    dbo.collection("articles").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
      response.send("1");
    });
  });
});

app.get("/blogDelete", function(request, response){
  var _id = request.param("_id");
  var doc = {_id:new ObjectID(_id)};

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { address: 'Mountain 21' };
    dbo.collection("articles").deleteOne(doc, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
      response.send("1");
    });
  });

})


app.get("/blogInsert", function(request, respone){
  var title = request.param("title");
  var content = request.param("content");
  var saved_at = new Date();
  var doc = {title:title, content:content, saved_at:saved_at};

    const client = new MongoClient(url);
    client.connect(function(err, client) {
    const db = client.db(dbName);
    db.collection('articles').insertOne(doc, function(err, r) {
      _id = r.insertedId;
      client.close();
      respone.send(_id);
    });
  });
});


http.createServer(app).listen(52273, function(){
  console.log("서버가 가동되었습니다");
});
