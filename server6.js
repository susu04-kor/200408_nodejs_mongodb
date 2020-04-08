var http = require("http");
var express = require("express");
var app = express();
var member = require("./member.js");   //db연동을 위한 작업

//몽고 DB 연결하여 insert 실험
var items = [
  {
    name: "우유",
    price: 2000
  },
  {
    name: "홍차",
    price: 5000
  },
  {
    name: "커피",
    price: 5000
  }
];

app.use(express.static("public"));
app.use(express.bodyParser());  //router 위에 위치시키기 (순서 중요-순서바뀌면 데이터 안 옴)
app.use(app.router);

//member.html로 사용자에게 정보 입력을 받아 몽고DB연동하여 다큐먼트 추가하기
app.get("/insertMember", function(request, response){ //app이라는 게 있어야 사용자의 요청을 받아들일 수 있음
  var name = request.param("name");
  var age = request.param("age");
  var addr = request.param("addr");
  var doc = {name:name, age:age, addr:addr};
  console.log(doc);
  //노드 cmd창 결과값:{ name: '안철수', age: '60', addr: '서울' }
  response.send(doc);
})

//member.html로 사용자에게 정보 입력을 받아 몽고DB연동하여 다큐먼트 추가하기
app.get("/insertMember", function(request,respone){
  var name = request.param("name");
  var age = request.param("age");
  var addr = request.param("addr");

  var doc = {name:name, age:age,addr:addr};
  console.log(doc);

  insertMember(doc);

  respone.send(doc);
})
// insert 끝.

//노드랑 mongodb연동하기
app.get("/member", function(request, response){
//사이트에서 다 긁어온 것 http://mongodb.github.io/node-mongodb-native/3.5/tutorials/crud/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name    //우리가 미리 만들어놓은 db 이름으로 설정
const dbName = 'bit';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);
  //db를 선택해서

  const col = db.collection('member');  //col - 컬렉션 변수
  //const 혹은 let - var대신 사용하는 예약어
  //member라는 테이블을 선택한 것

  // Insert multiple documents
  // col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
  //   assert.equal(null, err);
  //   assert.equal(3, r.insertedCount);
    //다큐먼트가 있어야 find를 할 수 있기 때문에 insert부터 하는 것

    // Get first two documents that match the query
    col.find().toArray(function(err, docs) {  //find한 결과를 배열(array)로 바꿔주고 docs에 가져온단 뜻
      // assert.equal(null, err);
      // assert.equal(2, docs.length);
      client.close();
          response.send(docs);  //검색된 결과를 응답하겠습니다
    });
//  }); -insert의 괄호
});
//우리가 기대하는 결과 => 우리가 만들어놓은 테이블의 정보가 오는 것

});

app.all("/data.html", function(request, response){
  var output = "";
  output += "<!DOCTYPE html>";
  output += "<html>";
  output += "<head>";
  output += "</head>";
  output += "<title>Data HTML</title>";
  output += "<body>";
  items.forEach(function(item){
    output += "<div>";
    output += "<h1>"+item.name+"</h1>";
    output += "<h2>"+item.price+"</h2>";
    output += "</div>";
  })
  output += "</body>";
  output += "</html>";
  response.send(output);
})

app.all("/data.json", function(request, response){
  response.send(items);
})

app.get("/products/:id", function(request, response){ //:id-> 파라미터는 숫자를 문자로 인식
  //따라서 문자를 숫자로 바꿔줘야 함
  var id = Number(request.param("id"));
  if(isNaN(id)){
    response.send({error:"숫자를 입력하세요"})
  }else if(items[id]){
    response.send(items[id]);
  }else{
    response.send({error:"상품의 인덱스를 확인하세요"});
  }
//  response.send(items[id]);    //items배열의 id 하나를 반환하겠다는 것
})
//이미 있는 items 배열에 사용자가 데이터를 추가하는 실험
app.post("/products", function(request, response){
  //사용자가 입력한 값을 받아오기 위해서는 bodyParser()라는 미들웨어가 필요함
  //위에 올라가서 추가하기
  try{  //사용자가 입력한 값을 받아올 때 예외가 발생할 수 있으니 try 해주기
      var name = request.param("name");
      var price = request.param("price");
      var item = {name:name, price:price};
      console.log("name:" + name);
      console.log("price:" + price);
      items.push(item);
      //ctrl+shift+d - 복사 키

      response.send({message:"데이터를 추가했습니다",
                      data:items});   //성공했다는 메시지와 함께 실제 데이터 가져오기(?)
  }catch(ex){
    console.log(ex);
  }

})

app.all("/data.xml", function(request, response){
  response.type("text/xml");
  var output = "";
  output += '<?xml version="1.0" encoding="UTF-8"?>';
  output += "<products>";
  items.forEach(function(item){
    output += "<product>";
    output += "<name>"+item.name+"</name>";
    output += "<price>"+item.price+"</price>";
    output += "</product>";
  });
  output += "</products>";
  response.send(output);
})

http.createServer(app).listen(52273, function(){
  console.log("서버가 가동되었습니다.");
});
