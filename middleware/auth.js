const jwt = require("jsonwebtoken");
const connection = require("../db/mysql_connection");

const auth = async (req, res, next) => {
  let token;
  try {
    token = req.header("Authorization");
    token = token.replace("Bearer ", "");
  } catch (e) {
    res.status(400).json();
    return;
  }

  let user_id;
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    user_id = decoded.user_id;
    
  } catch (e) {
    res.status(401).json({ success: false, message: "인증 안된 토큰" });
    return;
  }

  let query =
    "select u.id, u.email, u.created_at, t.token \
    from contact_user as u \
    join contact_token as t\
    on u.id = t.user_id \
    where t.user_id = ? and t.token = ?;";

  let data = [user_id, token];
  try {
    [rows] = await connection.query(query, data);
    if (rows.length == 0) {
      res.status(401).json({ success: false, message: "이상한 토큰" });
      return;
    } else {
      req.user = rows[0];
      next();
    }
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

module.exports = auth;
