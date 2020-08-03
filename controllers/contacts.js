const connection = require("../db/mysql_connection");

//모든 주소록 데이터를 다 가져와서 20~30개씩 끊어 보낸다
//@desc         모든 주소록 가져오기
//@route        GET/api/v1/contacts?offset=0&limit=25
//next는 미들웨어 사용을 위해 작성
exports.getAllcontacts = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  let query = `select * from contact limit ${offset}, ${limit}`;
  try {
    [rows, fields] = await connection.query(query);
    let count = rows.length;
    res.status(200).json({ success: true, items: rows, count: count });
  } catch (e) {
    res.status(500).json({ success: false, message: "DB ERROR", error: e });
  }
};

//@desc         주소록 1개 추가하기
//@route        POST/api/v1/contacts
exports.createContact = async (req, res, next) => {
  let offset = req.query.offset
  let name = req.body.name;
  let phone_number = req.body.phone_number;
  let query = "insert into contact (name, phone_number) values ?";
  let data = [[name, phone_number]];
  try {
    [result] = await connection.query(query, [data]);
    res.status(200).json({ success: true, result: result });
  } catch (e) {
    res.status(500).json({ success: false, message: "DB ERROR", error: e });
  }
};

//@desc         주소록 1개 수정하기
//@route        PUT/api/v1/contacts
exports.updateContact = async (req, res, next) => {
  let id = req.body.id;
  let name = req.body.name;
  let phone_number = req.body.phone_number;
  let query = "update contact set name=?, phone_number=? where id=?";
  let data = [name, phone_number, id];
  try {
    [result] = await connection.query(query, data);
    res.status(200).json({ success: true, result: result });
  } catch (e) {
    res.status(500).json({ success: false, message: "DB ERROR", error: e });
  }
};

//@desc         주소록 1개 삭제하기
//@route        DELETE/api/v1/contacts
//@parameters   id
exports.deleteContact = async (req, res, next) => {
  let id = req.body.id;
  let query = "delete from contact where id=?";
  let data = [id];
  try {
    [result] = await connection.query(query, data);
    res.status(200).json({ success: true, result: result });
  } catch (e) {
    res.status(500).json({ success: false, message: "DB ERROR", error: e });
  }
};

//@desc         이름이나 전화번호로 검색하는 api
//@route        GET/api/v1/contacts/serch?keyword=67
//@route        GET/api/v1/contacts/serch?keyword=길동
exports.searchContact = async (req, res, next) => {
  let keyword = req.query.keyword;
  let query = `select * from contact where name 
  like "%${keyword}%" or phone_number like "%${keyword}%"`;
  try {
    [rows] = await connection.query(query);
    res.status(200).json({ success: true, items: rows });
  } catch (e) {
    res.status(500).json({ success: false, message: "DB ERROR", error: e });
  }
};
