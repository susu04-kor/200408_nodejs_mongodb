var http = require("http");
var express = require("express");
var app = express();

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
app.use(app.router);

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
