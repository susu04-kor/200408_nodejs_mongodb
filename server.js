var http = require("http");
var express = require("express");
var app = express();
app.use(express.static("public"));  //미들웨어 이름 - express에 있는 static 중에 정적 문서를 ("public")으로 지정하겠습니다

app.use(function(request,response){ //앞에 있는 게 사용자 요청에 대한 정보,
                                  //뒤에 있는 게 응답에 대한 정보 - 이름은 아무거나 가능
  response.send("<h1>안녕하세요<h1>"); //존재하지 않는 문서를 호출하면 이 호출문 이 뜨고 (index.html 요청하면 그게 요청됨)
})


http.createServer(app).listen(52273, function(){
  console.log("서버를 가동했습니다.");
});
