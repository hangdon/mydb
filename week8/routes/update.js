import express from "express"; //라우터기능 사용
import { selectSql, updateSql } from "../database/sql"; //어떤 데이터가 있는지를 보기위함 

const router = express.Router(); 

//employee 기존의 입력값 불러오기
///update/employee
router.get('/employee',async (req,res) => {
    const emp_res = await selectSql.getEmployee();
    res.render('updateEmployee',{ //updateEmployee.hbs 파일 사용
        title: "직원 테이블 갱신",
        emp_res //이름을 바꿔서 설정 가능 
    });
});
//department 기존의 입력값 불러오기
///update/department
router.get('/department',async (req,res) => {
    const dept_res = await selectSql.getDepartment();
    res.render('updateDepartment',{ //updateDepartment.hbs 파일 사용
        title: "부서 테이블 갱신",
        dept_res
    });
}); //get은 데이터를 받아서 보여줄 때,

//수정버튼을 눌렀을 경우 update query를 실행하여 조회페이지로 이동한다.
//hbs의 값이 post로 값을 받아서 처리한다.
router.post('/employee', async (req,res) => {
    const vars = req.body;
    console.log(vars.salary);

    const data = {
        Salary: vars.salary
    }

    await updateSql.updateEmployee(data);

    res.redirect('/select'); //localhost:3000/select -> 바꾼 값이 반영이 됬는지 바로 확인이 가능하다.
}); //post는 데이터를 받아서 처리할 때,

//수정버튼을 눌렀을 경우 update query를 실행하여 조회페이지로 이동한다.
//hbs의 값이 post로 값을 받아서 처리한다.
router.post('/department',async (req,res) => {
    const vars = req.body;
    console.log(vars.dname);

    const data = {
        Dname: vars.dname
    }

    await updateSql.updateDepartment(data);

    res.redirect('/select'); 
});

module.exports = router;