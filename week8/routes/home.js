//삽입 기능 구현 
//home.hbs 파일과 연동 , form형식 구현 
//form에서 데이터를 넘겨받아서 처리
import express from "express"; //express의 라우터기능 사용
import { insertSql ,selectSql} from "../database/sql"; //sql에서의 insertSql모듈

const router = express.Router(); //express의 라우터기능 사용

router.get('/',(req, res) => {
    res.render('home');
}); //home.hbs 가 나옴

//form 화면에서 삽입을 눌렀을 때 처리하는 부분 
//값을 req로 받는다.
router.post('/',(req,res) => {
    const vars = req.body; //넘겨받은 데이터가 저장이된다. 
    //employee와 department모두 정보를 post로 넘겨준다. 이때 입력해주는 정보의 수가 다르다.
    const var_length = Object.keys(req.body).length;
 //어떤 것이 employee인지 department인지를 넘어오는 갯수로 확인 
    if(var_length > 4) {
        const data = {
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        }; //employee 데이터

        insertSql.setEmployee(data); //data라는 객체를 만들어서 setEmployee함수로 넘겨준다. 
    } else{
        const data = {
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };//department 데이터

        insertSql.setDepartment(data);
    }
    res.redirect('/'); //입력하고 나서 어떤 페이지로 가는지를 결정 (홈화면-> 새로고침 하겠다.)
})

module.exports = router;
