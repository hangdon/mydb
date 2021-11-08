import mysql from "mysql2";

//데이터베이스 연결 
const pool = mysql.createPool(
    process.env.JAWSDB_URL ??{
        host: 'localhost',
        user: 'root',
        database: 'week10', //나중에 바뀔수도 있음, 내가 사용할 데이터베이스 이름
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
    getUsers : async () => {
        const [rows] = await promisePool.query(`select * from user`); 
        return rows
    }, //getusers 라는 함수는 그 안에 데이터를 select해서 가져온다. 
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department`);

        return rows
    }, //sql문
    getMenu : async () => {
        const [rows] = await promisePool.query(`select * from Menu`);

        return rows
    }, //Select 페이지에서 Menu까지 출력 , getMenu라는 함수 생성 
}

//update query 
export const deleteSql = {
    //deleteMenu라는 함수를 만든것, 그리고 data라는 파라미터를 받는다. 
    deleteMenu : async (data) => {
        console.log('deleteSql.deleteMenu:',data.price); //콘솔창에 출력
        const sql = `delete from Menu where price = "${data.price}" and "${data.price}" > 10000`; //삭제 버튼으로부터 받은 price정보가 10000원 보다 클 때만 삭제한다. 
        await promisePool.query(sql);
    },
}//외부에서 함수를 쓰려면 export를 붙여야한다. 