# 2021-db
-데이터베이스 설계

<br><br>

## 3주차 실습 실행 방법
1. 레포지토리 복사(wsl환경에서 명령어 입력)
 - (SSH 설정한 경우) git clone git@github.com: doyeon0811/ex2.git
 - (token 을 사용하는 경우) git clone https://github.com/doyeon0811/ex2.git
2. week3 폴더로 이동 
    > cd week3
3. 콘솔창(powershell) 에서 npm package설치
    > npm install
4. database/sql.js 에서 본인의 데이터베이스 정보입력 (주석부분)

```c++
cout<<"hello world"<<endl
```
<pre>
<code>
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root', //본인의 mysql user id
        database: 'tutorial', //본인이 만든 데이터베이스 이름
        password: 'password', //본인의 mysql password
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);
</code>
</pre>

<br>

## <span style="color:red"> 테이블 작성법 </span>

이름|과|전공|학번
---|---|---|---|
이도연|정보통신공학과|정보통신|12181807
홍길동|컴퓨터공학과|데이터베이스|12191900
이순신|인공지능공학과|인공지능|12191917

## 텍스트 강조

- **테이터베이스** 실습은 재미~~없어요~~있어요.# mydb
