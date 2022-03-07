![home](https://user-images.githubusercontent.com/91775452/156975006-ff697790-e0cc-42bd-9071-36b2fd102f02.PNG)
![seat](https://user-images.githubusercontent.com/91775452/156975094-74833ff5-cf93-42cf-aec7-b00d6a4d5df5.PNG)

# Flimate
###### 계기 
> 비행기에서 주변에 앉았던 사람과 연락을 하고 싶은 경우가 발생할 수 있겠다는 생각
###### 사이트 소개 
> home으로 들어올 경우, 사용자가 탑승했던 항공편이 유효한 항공편인지 db에서 대조하여 판별.
> 유효한 데이터라면 /seat 페이지로 이동하여 비행기 좌석 배치도를 통해 다른 사용자가 자신의 이메일을 좌석에 저장되어있는지 확인 후, 데이터가 있다면 표시함.
> 사용자는 자신의 데이터를 입력하고 싶다면, 표시되지 않은 자리를 클릭하여 데이터를 저장하고 기존에 데이터가 있는 좌석의 사용자와 연락을 하고 싶다면 해당 
> 좌석을 클릭 후 자신의 이메일 입력. 
> nodemailer를  통해 이메일로 A좌석의  탑승자가 이메일로 연락을 하고 싶어한다는 메일을 전송.
###### 파일 설명
- main.js > 사이트의 url에 따라서 어떤 함수를 호출할 지 안내.
- page.js > main.js를 통해 호출된 함수들이 정리되어 있는 파일.
- template.js > page.js에서 사용되는 template 및 함수들이 정리되어 있는 파일.
- db.js > node js의 mysqpl 모듈을 통해 db에 연결, 쿼리를 전송할 수 있게 정의해 놓은 파일.
- mailsender.js > node js의 nodemailer 모듈을 통해 메일을 전송할 수 있게 정의한 파일.
