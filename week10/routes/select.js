//select.hbs 파일과 연동 
import express from "express"; //라우터
import { selectSql } from "../database/sql"; //{}는 사용자가 만든 모듈을 불러올 때 쓴다. 이름 수정 못함 

const router = express.Router(); //라우터 기능 씀

//실제 웹에서 보여지는 주소는 /select 가 포함되어있다. ex> /select/회원1
router.get('/', async function(req,res) {

    const Menu = await selectSql.getMenu(); //함수를 불러와서 객체에 저장 

    //select.hbs파일 사용
    res.render('select',{
        title: '음식 메뉴판',
        Menu
    });
});

module.exports = router;