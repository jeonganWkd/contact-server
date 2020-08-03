const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

//로그 찍어주는 로거(미들웨어) : app.use에 추가해야한다
const morgan = require("morgan");

//항상 npm패키지의 아래쪽에 위치하여 작성
const contacts = require("./router/contacts");
const users = require("./router/users");

const app = express();

//Body parser설정,클라이언트에서 body로 데이터 보내는 것 처리
app.use(express.json());

//먼저 로그 찍어주도록 미들웨어 설정
app.use(morgan("common"));

//api경로 연결
app.use("/api/v1/contacts", contacts);
app.use("/api/v1/users", users);

const PORT = process.env.PORT || 5300;

app.listen(PORT, console.log("API SERVER"));
