# 2021-db
-데이터베이스 설계

<br><br>

## <span style="color:red"> 3주차 실습 
3주차에서는 하나의 student라는 테이블을 만들어서 웹과 연동하여 mysql의 student 테이블이 3000port에서 보여지게 하는 실습을 진행하였습니다. 

1. 레포지토리 복사(wsl환경에서 명령어 입력)
 - (SSH 설정한 경우) git clone git@github.com: doyeon0811/ex2.git
 - (token 을 사용하는 경우) git clone https://github.com/doyeon0811/ex2.git
2. week3 폴더로 이동 
    > cd week3
3. 콘솔창(powershell) 에서 npm package설치
    > npm install
4. database/sql.js 에서 본인의 데이터베이스 정보입력 (주석부분)

<pre>
<code>
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root', //본인의 mysql user id
        database: 'week3', //본인이 만든 데이터베이스 이름
        password: 'password', //본인의 mysql password
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);
</code>
</pre>

<br>

mysql과 연동하면 다음과 같은 student테이블이 나오게됩니다. 
## <span> student table </span>

학번|이름|전공|학년|메일주소
---|---|---|---|---|
12181807 |이도연|정보통신공학과|3|도연@naver.com
12123456|김철수|정보통신공학과|4|철수@gmail.com
12181808|지연|수학과|2|지연@naver.com
12181809|준홍|디자인과|1|준홍@naver.com
12181810|수영|수학과|4|shma@naver.com


## <span style="color:red"> 8주차 실습

8주차 실습은 두개의 테이블 employee와 department 에서 웹 페이지에서 입력과 delete를 수행해서 테이블에 값을 insert하는 것을 웹에서 진행을 하고 employee의 salary를 웹 페이지에서 조건에 맞게 수정을 하는 실습을 진행하였습니다. 

1. mysql에서 week8폴더에 employee와 department라는 테이블을 생성한다.

2. vs 코드에서 routes 폴더 내부의 home.js , select.js , update.js 그리고 delete.js 파일을 작성한다. 

    >update.js 파일도 employee부분을 다음과 같이 수정해주었습니다.

    <pre>
    <code>
    router.post('/employee', async (req,res) => {
    const vars = req.body;
    console.log(vars.salary);

    const data = {
        Salary: vars.salary
    }

    await updateSql.updateEmployee(data);

    res.redirect('/select'); //localhost:3000/select -> 바꾼 값이 반영이 됬는지 바로 확인이 가능하다.
}); //post는 데이터를 받아서 처리할 때,
    </pre>
    </code>
  
3. database폴더 내부의 sql.js 파일에서 update부분을 다음과 같이 수정해주었습니다. 
   >조건을 Minit이 B인 사람만 salary수정이 가능하게 바꾼다.
<pre>
<code>
export const updateSql = {
    updateEmployee : async (data) => {
        const sql = `update employee set salary = "${data.Salary}" where Minit = "B"`; //Minit이 인 사람의 salary를 바꾼다. 
        await promisePool.query(sql);
    },
    </code>
    </pre>

4. 나머지 src와 views 파일 안의 index.js 와 hbs 파일도 작성해줍니다. 
   > Employeeupdate.hbs 파일의 수정부분
   <pre>
   <code>
     <td><input type="text" name="salary" placeholder={{Salary}}></td>
        <td>{{Super_ssn}}</td>
        <td>{{Dno}}</td>
        <td><input type="submit" value="수정" formaction="/update/employee"></td>

    </code>
    </pre>

5. power shell로 npm run start하고 웹 페이지로 결과를 확인합니다. 

employee와 department 테이블에 각각 insert하고 delete하고 결과를 확인할 수 있는 select 웹페이지가 생성이 되고 update에서 값을 수정할 수 있으며 salary의 값은 minit이 'B'인 employee만 수정 가능하도록 코드를 작성하였습니다. 

## <span style="color:red"> 10주차 실습

10주차에서는 week10이라는 데이터베이스 안에 임의로 음식메뉴 테이블을 만들어서 8주차에서 했던 것과 비슷하게 이번에는 update페이지가 아닌 delete페이지에서 조건을 주어 삭제한 후 select페이지에서 결과를 확인할 수 있게 하는 실습을 진행하였습니다. 

이번 실습에서 수정해준 sql.js의 코드는 다음과 같이 작성해주었습니다. 

<pre>
<code>
export const deleteSql = {
    //deleteMenu라는 함수를 만든것, 그리고 data라는 파라미터를 받는다. 
    deleteMenu : async (data) => {
        console.log('deleteSql.deleteMenu:',data.price); //콘솔창에 출력
        const sql = `delete from Menu where price = "${data.price}" and "${data.price}" > 10000`; //삭제 버튼으로부터 받은 price정보가 10000원 보다 클 때만 삭제한다. 
        await promisePool.query(sql);
    },
}//외부에서 함수를 쓰려면 export를 붙여야한다. 

</code>
</pre>

> delete 페이지에서 삭제버튼을 누르면 price가 10000원보다 클 때만 삭제가 되게끔 코드를 작성해주었습니다. 

delete.js

<pre>
<code>
router.post('/',async (req,res) => {
    console.log('delete router:',req.body.delBtn);
    const data = {
        price: req.body.delBtn,
    } //data를 버튼으로부터받은 price

    await deleteSql.deleteMenu(data); //그리고 그 data를 deleteMenu의 함수에 넣는다. 함수 실행

    res.redirect('/delete'); 
</pre>
</code>

Fid|Fname|pride
---|---|---|
1|pizza|15000
2|spaghetti|20000
3|waffle|3000
4|cake|9000
5|salad|11000






