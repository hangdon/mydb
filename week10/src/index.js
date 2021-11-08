//node_modules 안에있는 모듈 불러오기 import (별명)이름 from "모듈의이름"
import express from "express"; //express모듈을 사용, 이름을 바꿔서 import해도 상관없음
import logger from "morgan"; 
import path from "path"; //경로설정시 많이쓰는 모듈

//다른 폴더의 파일을 쓸 때, 현재 위치를 기준으로 경로 설정
import loginRouter from "../routes/login"; //home화면에서 동작
import deleteRouter from "../routes/delete"; //(수정하는 주소)update화면에서 동작 
import selectRouter from "../routes/select"; //조회하는 기능

const PORT = 3000; //3000번 포트를 쓴다. (자유롭게 수정가능)

const app = express(); //http 서버연결모듈

app.use(express.urlencoded({ extended: false}));
app.use(express.json()); //데이터를 다루기 편하게 

app.set('views',path.join(__dirname, '../views'))
app.set('view engine', 'hbs') //hbs사용

app.use(logger("dev")); //logger를 자세하게 보기 위함

app.use('/', loginRouter); //home화면
app.use('/delete', deleteRouter); // '/' 뒤에 update 입력하면 updateRouter에 해당하는 화면이 나온다. 
app.use('/select', selectRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
}) //서버를 실행 
