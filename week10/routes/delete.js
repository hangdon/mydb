import express from "express"; //라우터기능 사용
import { selectSql, deleteSql } from "../database/sql"; //어떤 데이터가 있는지를 보기위함 

const router = express.Router(); 

//employee 기존의 입력값 불러오기
///update/employee

//department 기존의 입력값 불러오기
//  /delete/Menu
router.get('/',async (req,res) => {
    const Menu = await selectSql.getMenu(); //getMenu함수로부터 가져온 데이터
    res.render('delete',{ //updateDepartment.hbs 파일 사용
        title: "메뉴판 삭제",
        Menu //데이터를 출력
    })
}); //get은 데이터를 받아서 보여줄 때,

//hbs의 값이 post로 값을 받아서 처리한다.
router.post('/',async (req,res) => {
    console.log('delete router:',req.body.delBtn);
    const data = {
        price: req.body.delBtn,
    } //data를 버튼으로부터받은 price

    await deleteSql.deleteMenu(data); //그리고 그 data를 deleteMenu의 함수에 넣는다. 함수 실행

    res.redirect('/delete'); 
});

module.exports = router;