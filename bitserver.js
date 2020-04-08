var http = require("http");
var express = require("express");

var app = express();            //express객체 생성
app.use(express.static("public"));
app.use(express.bodyParser());      //사용자로부터 파라메타를 받아드려 처리 할수 있음
app.use(app.router);            //서버 사용자마다 다르게 하기 위해 router

app.all("/insertblog",function(request, response){
      var title = request.param("title");
      var content = request.param("content");

      var doc = {title:title,content:content}


      const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database name
const dbName = 'bit';

const client = new MongoClient(url);

(async function() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Insert a single document
    let r = await db.collection('articles').insertOne(doc);

    // Close connection

  } catch(err) {
    console.log(err.stack);
  }
    client.close();
})();
})
http.createServer(app).listen(52273, function(){
    console.log("서버가 가동되었습니다.");
})
