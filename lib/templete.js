var db = require('./db.js');


var templete ={
  HTML:function(list, body){
    return `
    <!doctype html>
    <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" media="all" href='lib/css/flight.css'/>

      <title>FliMate</title>
      <script src="https://kit.fontawesome.com/8eb5905426.js" crossorigin="anonymous"></script>
      <style>
        body {
          background-image: url(https://images.unsplash.com/photo-1569839333583-7375336cde4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1630&q=80);
          background-repeat: no-repeat;
          background-size: cover;
        }

        a{
          text-decoration-line : none;
        }

        select{
          width: 100px;
          height: 40px;
          border: none;
          font-size: 10pt;
          float: left;
          padding-left: 0px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }

        button{
          width: 100px;
          height: 40px;
          border: none;
          font-size: 10pt;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
        button:hover{
        	background: rgba(78, 128, 136, 0.92);
        	cursor: pointer;
        	box-shadow: 0 2px 4px rgba(78, 128, 136, 0.6);
        }

        div.a{
          text-align: right;
        }

        div.b{
          text-align: center;
          display: flex;
          justify-content: center;
          align-items:center;
          border-radius: 30%;
          min-height: 100vh;
          padding-left: 45px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          box-shadow: 0 4px 16px rgba(0,79,255,0.3);
        }

        input{
          width: 200px;
          height: 38px;
          border: none;
          font-size: 10pt;
          float: left;
          padding-left: 45px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }

        #icon{
          position: absolute;
          top: 50%;
          margin-left: -235px;
          margin-top: 72px;
          z-index: 1;
          color: #4f5b66;
        }



        #container
        {

        	margin: 0 auto;
        	padding: 20px 0 0;
        	width: 650px;
        }
        #airplane{
          background: url(/airplane_img) no-repeat;
          cursor: default;

          clear: both;
          font-size: 0;
          margin: 0 0 15px;
          overflow: hidden;
          position: relative;
          width: 650px;
          height: 148px;

        }
        #airplane a
        {
        	background-image: url(/seat_img);
          cursor: default;

        	background-repeat: no-repeat;
        	display: block;
        	overflow: hidden;
        	text-indent: -99999px;
        	width: 10px;
        	height: 10px;
        }
        #airplane a:hover,
        #airplane a:focus
        {
        	background-position: -10px 0;
        }
        #airplane a.selected,
        #airplane a.selected:hover
        {
        	background-position: -20px 0;
        }
        #airplane li{
          visibility: visible;

          list-style: none;
        	position: absolute;

        	width: 10px;
        	height: 10px;
        }

        #airplane .A
        {
        	top: 108px;
        }

        #airplane .B
        {
        	top: 96px;
        }

        #airplane .C
        {
        	top: 84px;
        }

        #airplane .D
        {
        	top: 54px;
        }

        #airplane .E
        {
        	top: 42px;
        }

        #airplane .F
        {
        	top: 30px;
        }

        /* =Airplane - Seat Numbers
        ----------------------------------------------------------------------*/

        #airplane .seat_1
        {
        	left: 123px;
        }

        #airplane .seat_2
        {
        	left: 139px;
        }

        #airplane .seat_3
        {
        	left: 155px;
        }

        #airplane .seat_4
        {
        	left: 171px;
        }

        #airplane .seat_5
        {
        	left: 187px;
        }

        #airplane .seat_6
        {
        	left: 203px;
        }

        #airplane .seat_7
        {
        	left: 219px;
        }

        #airplane .seat_8
        {
        	left: 235px;
        }

        #airplane .seat_9
        {
        	left: 251px;
        }

        #airplane .seat_10
        {
        	left: 267px;
        }

        #airplane .seat_11
        {
        	left: 283px;
        }

        #airplane .seat_12
        {
        	left: 299px;
        }

        #airplane .seat_13
        {
        	left: 330px;
        }

        #airplane .seat_14
        {
        	left: 346px;
        }

        #airplane .seat_15
        {
        	left: 362px;
        }

        #airplane .seat_16
        {
        	left: 378px;
        }

        #airplane .seat_17
        {
        	left: 394px;
        }

        #airplane .seat_18
        {
        	left: 410px;
        }

        #airplane .seat_19
        {
        	left: 426px;
        }

        #airplane .seat_20
        {
        	left: 442px;
        }

        #airplane .seat_21
        {
        	left: 458px;
        }

        #airplane .seat_22
        {
        	left: 474px;
        }

        #airplane .seat_23
        {
        	left: 490px;
        }

        #airplane .seat_24
        {
        	left: 506px;
        }

        #airplane .seat_25
        {
        	left: 522px;
        }

        .table1 {
        margin-left:auto;
        margin-right:auto;
        }

        input:checked{
          box-shadow: 0 0 0 3px hotpink;
        }
      </style>
    </head>
    <body>
      <h1 style="display:inline">
        <a href='/' title='home'>
          FliMate
        </a>
        </h2>
      ${list}
      ${body}
    </body>
    </html>
    `;
  },
  List:function(fileList){
    var list = '<div class="a">';

    var i = 0;
    while (i < fileList.length) {
      list = list + `<h2 style="display:inline"><a
      href="/?id=${fileList[i]}">${fileList[i]}</a></h2>`;
      i = i + 1;
    }
    list = list + '</div>';
    return list;
  },
  select:function(nameOfAirline){
    var select = '<select name= "airline"><option value="">항공사 선택</option>';
    var i = 0;
    while(i <nameOfAirline.length){
      select = select + `<option value="${nameOfAirline[i].name}">${nameOfAirline[i].name}</option>`;
      i = i + 1;
    }
    select = select+'</select>';
    return select;
  },
  seatList:function(flight_name, seat_id_list){
    var seatList = `
    <script>alert('유효한 정보입니다.');</script>
    <script type="text/javascript">
      function callFunction(obj){
        let span = document.getElementById('your_seat_td');
        let hidden = span.getAttribute("hidden");
        document.getElementById('now').value = obj.title;
        document.getElementById('user_seat').type = 'text';
        if(hidden){
          span.removeAttribute("hidden");
        }
        document.getElementById('cotect_btn').value = '요청하기';
      }


      function callFunction2(obj){
        let span = document.getElementById('your_seat_td');
        let hidden = span.getAttribute("hidden");
        document.getElementById('now').value = obj.title;
        document.getElementById('user_seat').type = 'hidden';
        if(!hidden){
          span.setAttribute("hidden", "hidden");
        }
        document.getElementById('cotect_btn').value = '확인';
      }
    </script>
    <strong>${flight_name}편의 좌석 데이터</strong>
    <div id="container">
    <ul id="airplane">
    `;
    var check = '';
    for(i=0; i<25; i++){
      var i2 = i+1;

      for(j=0; j<6; j++){
        var j2 = j+65;
        var eng = String.fromCharCode(j2);
        var db_exist = (i2+eng).toLowerCase();

        var result = seat_id_list.some(item => item.seat_id == db_exist);//seat_id_list 객체에서 seat_id 값이 db_exist인 값이 있으면 result 변수에 true를 저장.(db에 저장된 좌석명이 소문자일경우)
        //var result2 = seat_id_list.some(item => item.seat_id == (i2+eng));//seat_id_list 객체에서 seat_id 값이 db_exist인 값이 있으면 result 변수에 true를 저장.(db에 저장된 좌석명이 대문자일경우) 저장할 때 무조건 소문자로 저장하기 때문에 필요없는 코드인듯.
          //db에 이미 데이터가 있는 좌석일경우,
          if(result){
            seatList += `
            <li class="seat_${i2} ${eng}"><a href="javascript:void(0);" onclick="callFunction(this);" id="" title="${i2}${eng}"><input type="checkbox" name="${i2} ${eng}" checked disabled>${i2}${eng}</a></li>
            `;

            //db에 데이터가 없는 좌석일 경우,
          } else{
            seatList += `
            <li class="seat_${i2} ${eng}"><a href="javascript:void(0);" onclick="callFunction2(this);" id="" title="${i2}${eng}"><input type="checkbox" name="${i2} ${eng}" disabled>${i2}${eng}</a></li>
            `;
          }


      }
      seatList += `<p></p>
      `;
    }
    seatList += `
    </ul>
    </div>
    <form action="/userRequest?id=${flight_name}" method='post' >
      <table class="table1">
        <tr>
          <td>
            <strong>Selected Seat</strong>
          </td>
          <td>
            <span id='your_seat_td' hidden="hidden">
              <strong>Your seat</strong>
            </span>
          </td>
          <td>
            <strong>Contect</strong>
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" name="seat_name" id="now" value="" readonly>
          </td>
          <td>
            <input type="hidden" name="user_seat" id="user_seat" placeholder='your seat'>
          </td>
          <td>
            <input type="text" name="email" id="inputEmail" value='' placeholder='your email'>
            <select name= "email2">
              <option value="@naver.com">@naver.com</option>
              <option value="@gmail.com">@gmail.com</option>
              <option value="@nate.com">@nate.com</option>
            </select>
          </td>
          <td>
            <input type="submit" id="cotect_btn" value="확인">
          </td>
        </tr>
        <input type='hidden' name='flight_name' value=${flight_name}
      </table>
    </form>

    `;
    return seatList;
  }
}


module.exports = templete;
