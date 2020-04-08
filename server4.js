var http = require("http");
var express = require("express");
var app = express();
app.use(express.static("public"));  //미들웨어 이름 - express에 있는 static 중에 정적 문서를 ("public")으로 지정하겠습니다
app.use(app.router);

app.all("/wiki/:id", function(request, response){ //:id가 파라미터로 받아올 값의 변수명
  var id = request.param("id"); //param을 통해 파라미터를 읽어올 수 있음
  response.send("<h1>"+id+"</h1>");
})


http.createServer(app).listen(52273, function(){
  console.log("서버를 가동했습니다.");
});
