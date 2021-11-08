//삽입 기능 구현 
//home.hbs 파일과 연동 , form형식 구현 
//form에서 데이터를 넘겨받아서 처리
import e from "express";
import express from "express"; //express의 라우터기능 사용
import { selectSql } from "../database/sql"; //sql에서의 insertSql모듈

const router = express.Router(); //express의 라우터기능 사용

router.get('/',(req, res) => {
    res.render('login');
}); //home.hbs 가 나옴

//form 화면에서 삽입을 눌렀을 때 처리하는 부분 
//값을 req로 받는다.
router.post('/',async (req,res) => {
    const vars = req.body; //넘겨받은 데이터가 저장이된다. 
    const users = await selectSql.getUsers();
    let whoAmI = '' //빈 스트링을 만든다. let은 값을 바꿀 수 있는 변수를 저장할 때 
    let checklogin = false;

    //내가 입력한 값이 vars에 들어간다. 
   
    users.map((user) => {
        if(vars.id === user.Id && vars.password === user.Password){
            checklogin = true;
            if( vars.id === 'admin') //로그인 체크
            {
                whoAmI = 'admin'; //admin이 입력되면 admin으로
            }
            else{
                whoAmI = 'users'; //test가 입력되면 users로
            }
        }
    }) //자동으로 처음부터 하나씩 증가
    console.log('whoAmI',whoAmI);


    //페이지 이동 지정
    //checklogin이 1 => login 완료
    if(checklogin && whoAmI ==='admin') {
        res.redirect('/delete'); //만일 받은 값이 admin이면 delete페이지로 이동한다. 
    }
    else if(checklogin && whoAmI ==='users')
    {
        res.redirect('/select'); //만일 받은 값이 user이면 select페이지로 이동한다.
    }
    else{
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>")
    }
 })

module.exports = router;
