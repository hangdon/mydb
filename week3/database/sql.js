import mysql from "mysql2";
const pool = mysql.createPool(
process.env.JAWSDB_URL ?? {
host: 'localhost',
user: 'root',
database: 'week3',
password: 'dlehdus123!',
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
}
);
const promisePool = pool.promise();
const sql = {
getUsers : async () => {
const [rows] = await promisePool.query(`
SELECT * FROM user
`)
return rows
},
}
module.exports = sql