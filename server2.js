var http = require("http");
var express = require("express");

var app = express();

app.use(express.static("public")); //정적인 문서는 여기 두겠습니다 - 하는 게 static 미들웨어
//public에 두겠습니다
app.use(app.router);

app.all("/list",function(request, response){ //list라고 호출하면 동작할 function
  response.send("<h1>글목록보기</h1>");
});

app.all("/write",function(request, response){ //list라고 호출하면 동작할 function
  response.send("<h1>글작성하기</h1>");
});

app.all("/update",function(request, response){ //list라고 호출하면 동작할 function
  response.send("<h1>글수정하기</h1>");
});

http.createServer(app).listen(52273, function(){//app-익스프레스 객체
  console.log("서버를 가동했습니다."); //아무 내용없어도 되고 이렇게 출력문 설정해도 됨
});
