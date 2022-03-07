var http = require('http');
var url = require('url');
var page = require('./lib/page.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;//url을 분석해서 string query의 값을 가져와라.
    var pathname = url.parse(_url, true).pathname;
  //queryData로 가져온 query string의 데이터 중에 id의 값을 가져와라.

    if(pathname == '/'){
      if(queryData.id == undefined){
        page.home(request, response);

      }else{
        page.page(request, response);
      }
    }else if(pathname == '/confirm'){
      page.confirm(request, response);

    } else if(pathname == '/seat'){
      page.seat(request, response);

    } else if(pathname == '/seat_img'){
      page.seat_img(request, response);

    } else if(pathname == '/airplane_img'){
      page.airplane_img(request, response);

    } else if(pathname == '/userRequest'){
      page.userRequest(request, response);

    } else{
        response.writeHead(404);//404 : 파일을 찾을 수 없다는 의'미//'
        response.end('Not found');
      }
    });

app.listen(3000);//3000번 포트를 통해 접속함.
