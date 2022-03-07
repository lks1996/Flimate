var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var templete = require('./templete.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var db = require('./db.js');
var mailSender = require('./mailSender.js');

exports.home = function(request, response){
  db.query(`SELECT * FROM airline`, function(err, nameOfAirline){
    if(err){
      throw err;
    }
    //console.log(nameOfAirline);
    fs.readdir('./data', function(err, fileList){
      var select = templete.select(nameOfAirline);
      var body = `<div class="b">
      <form action = "/confirm" method = "post">
        <span>
          ${select}
          <span id="icon"><i class="fa fa-search"></i></span>
          <input type="text" name = "flight" id="search" placeholder="항공편 입력" />
          <button type="submit">확인</button>
        </span>
      </form>
    </div>`
      var list = templete.List(fileList);
      var html = templete.HTML(list, body);

      response.writeHead(200);//200 : 파일을 성공적으로 전송했다는 의미
      response.end(html);
    })
  });
}

exports.page = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  fs.readdir('./data', function(err, fileList){
    var filteredID = path.parse(queryData.id).base;
    fs.readFile(`data/${filteredID}`, 'utf8', function(err, body){
      //var title = queryData.id;
      //var list = templeteList(fileList);
      var html = templete.HTML(body);

      response.writeHead(200);//200 : 파일을 성공적으로 전송했다는 의미
      response.end(html);//변수 templete에 들어있는 templete literal코드를 화면에 출력.
    });
  });
}

exports.confirm = function(request, response){
  var body = '';
  request.on('data', function(data){
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    console.log(post);

    //항공편 자리 유효성 검사.
    if(!(post.flight.length == 5 || post.flight.length == 6)){
      console.log('Unvalid flight name');
      response.writeHead(302, {Location: `/`});
      response.end();
    }

    //항공편 자리수가 유효하면 db에서 사용자가 입력한 항공편명의 항공사 이름을 가져옴.
    else{          //flight 테이블에서 사용자가 입력한 항공편 이름이 있으면 그 이름을 validTestOfFlight로 반환하고, 값이 없는 경우에 '0'을 반환.
      db.query(`SELECT IFNULL(MAX(name), '0') AS name FROM flight WHERE name=?`, [post.flight], function(err, validTestOfFlight){
        if(validTestOfFlight[0].name == '0'){

          response.writeHead(302, {Location: `/`});
          response.end();
        }
        else{     //사용자가 입력한 항공편 이름이 flight테이블에 있는 경우, 해당 항공편의 항공사 이름(airline.name)을 가져옴.
          db.query(`SELECT airline.name FROM airline LEFT JOIN flight ON airline.id=flight.airline_id WHERE flight.name=?`, [post.flight], function(err, result){
            console.log(result);

           //사용자가 입력한 항공사와 db에 저장되어있는 사용자입 항공편의 항공사가 같을 경우,
            if(result[0].name == post.airline){
              db.query(`SELECT IFNULL(MAX(table_name), '0') AS table_name FROM information_schema.tables WHERE table_name =?`, [post.flight], function(err, table_name_result){

                //사용자가 입력한 항공편의 테이블이 없다면,
                if(table_name_result[0].table_name == '0'){
                  db.query(`SELECT id FROM flight WHERE name=?`,[post.flight], function(err, flight_id){
                    db.query(`CREATE TABLE ${post.flight} (seat_id VARCHAR(3) NOT NULL PRIMARY KEY, email VARCHAR(20), flight_id INT(2) DEFAULT ${flight_id[0].id})`, function(err, create){//쿼리문에 테이블명을 직접 가져오지 않고 매핑을 통해 가져오고 싶은데 그건 왜 안되는거지..
                      console.log(create);

                      response.writeHead(302, {Location: `/seat?id=${post.flight}`});
                      response.end();
                    });
                  })

                  //사용자가 입력한 항공편의 테이블이 이미 존재한다면,
                } else{
                  console.log("already exist table");

                  response.writeHead(302, {Location: `/seat?id=${post.flight}`});
                  response.end();
                }
              });
            }
            //사용자가 입력한 항공사와 db에 저장되어있는 사용자입력 항공편의 항공사가 다른 경우,
            else{
              response.writeHead(302, {Location: `/`});
              response.end();
            }
          });
        }
      });
    }
  })
}

exports.seat = function(request, response){
  fs.readdir('./data', function(err, fileList){
    var _url = request.url;// /seat?id=AW756
    var queryData = url.parse(_url, true).query;// {id: AW756}
    var filteredID = path.parse(queryData.id).base; //AW756
    db.query(`SELECT seat_id FROM ${filteredID}`, function(err, seat_id_list){

      var body = templete.seatList(filteredID, seat_id_list);
      var list = templete.List(fileList);
      var html = templete.HTML(list, body);

      response.writeHead(200);//200 : 파일을 성공적으로 전송했다는 의미
      response.end(html);
    })
  })
}

exports.seat_img = function(request, response){
  fs.readFile(`./lib/img/seat.GIF`, function(err, img){
    response.writeHead(200);
    response.write(img);
    response.end();
  })
}

exports.airplane_img = function(request, response){
  fs.readFile(`./lib/img/airplane.GIF`, function(err, img){
    response.writeHead(200);
    response.write(img);
    response.end();
  })
}

exports.userRequest = function(request, response){
  var body = '';
  request.on('data', function(data){
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    console.log(post);
    var user_email = post.email + post.email2;
    var lower_seat_name = post.seat_name.toLowerCase();
    var _url = request.url;// /seat?id=AW756
    var queryData = url.parse(_url, true).query;// {id: AW756}
    var filteredID = path.parse(queryData.id).base; //AW756
    db.query(`SELECT IFNULL(MAX(seat_id), '0') AS seat_id FROM ${filteredID} WHERE seat_id=?`, [post.seat_name], function(err, valid_seat_id){

      if(valid_seat_id[0].seat_id == '0'){
        db.query(`INSERT INTO ${filteredID} (seat_id, email) VALUES(?, ?)`, [lower_seat_name, user_email], function(err, email_insert_request){//좌석 이름은 무조건 소문자로 저장
          console.log(post.seat_name +"좌석에 앉은 사용자의 이메일"+ user_email +"등록이 완료되었습니다");
        })
      }
      else{
        db.query(`SELECT email FROM ${filteredID} WHERE seat_id=?`, [post.seat_name], function(err, email_request){
          console.log(email_request[0].email+"로 이메일 연결 요청을 했습니다.");
          console.log(user_email);
          var mailSubject = `Flimate 이메일 연락 요청`;
          var mailText = `이메일 연락 요청이 도착했습니다.

          요청자 좌석 : ${post.user_seat}
          요청자 email 주소 : ${user_email}`
          mailSender.sendGmail(email_request[0].email, mailSubject, mailText);//저장되있던 email, , 요청한 사용자의 email
        })
      }
    })
    response.writeHead(302, {Location: `/seat?id=${post.flight_name}`});
    response.end();
  })
}
