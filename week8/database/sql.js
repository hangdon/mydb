import mysql from "mysql2";

//데이터베이스 연결 
const pool = mysql.createPool(
    process.env.JAWSDB_URL ??{
        host: 'localhost',
        user: 'root',
        database: 'week8', //나중에 바뀔수도 있음, 내가 사용할 데이터베이스 이름
        password: 'dlehdus123!',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// async / await 사용
const promisePool = pool.promise(); //awiat-> 명령문이 실행될 때까지 기다림

//selec query
export const selectSql = {
    getEmployee : async () => {
        const [rows] = await promisePool.query(`select * from employee`); 
        console.log(rows)
        return rows
    },
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department`);

        return rows
    }, //sql문
}
//insert query 
export const insertSql = {
    //data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query 생성 
    setEmployee : async (data) => { //data를 받는다. -> home.js에서
        //query문 `` 는 문자열 안에 변수를 넣을 수 있다. 
        const sql = `insert into employee values (
            "${data.Fname}",  "${data.Minit}",  "${data.Lname}",  "${data.Ssn}",  "${data.Bdate}",  "${data.Address}", "${data.Sex}" , "${data.Salary}" , "${data.Super_ssn}", "${data.Dno}" )`;
            //data의 변수를 사용한다. 
            await promisePool.query(sql); //sql문을 query가 실행
    },

    setDepartment : async (data) => {
        const sql = `insert into department values (
            "${data.Dname}",  "${data.Dnumber}",  "${data.Mgr_ssn}",  "${data.Mgr_start_date}")`;
            
            await promisePool.query(sql);
    },
}

//update query 
export const updateSql = {
    updateEmployee : async (data) => {
        const sql = `update employee set salary = "${data.Salary}" where Minit = "B"`; //Minit이 인 사람의 salary를 바꾼다. 
        await promisePool.query(sql);
    },
    updateDepartment : async (data) => {
        const sql = `update department set dname = "${data.Dname}" where Dnumber = 2`; //Dnumber가 0인 사람의 dname을 바꾼다.
        await promisePool.query(sql);
    },
}

//외부에서 함수를 쓰려면 export를 붙여야한다. 