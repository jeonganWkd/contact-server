//promise로 개발된 mysql2패키치 설치하고 로딩
const mysql = require("mysql2");

//connection pool 만들기(pool이 커넥션 연결을 자동으로 컨트롤 한다)
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWD,
  waitForConnections: true,
  connectionLimit: 10,
});

//await으로 사용하기위해 promise로 저장
const connection = pool.promise();

module.exports = connection;

//error처리와 유지보수를 쉽게 할 수 있다
