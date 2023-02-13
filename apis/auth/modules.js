const dbConfig = require("../../config/connect.db");
const knex = require("knex")(dbConfig);
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("./config/private.key");
module.exports = {
  // function login เข้าสู่ระบบ
  login: (req, res) => {
    let { username, password } = req.body;
    return knex("users")
      .select("id", "username", "type")
      .where("username", username)
      .andWhere("password", password)
      .then((res) => {
        if (res.length == 0) return Promise.reject("ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง");
        let obj = res.map((mp) => Object.assign({}, mp))[0];
        let newObject = {
          token: jwt.sign(obj, privateKey),
          user: obj
        }
        return Promise.resolve(newObject);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },

  // function me check ตัวเองว่า token ถูกต้องมั้ย
  me: (req, res) => {
    let token =
      req?.headers?.authorization
        .replace("Bearer", "")
        .trim() || undefined;
    if (!token) return Promise.reject("ไม่พบ Token");
    return jwt.verify(token, privateKey, (error, decoded) => {
      if (!decoded) {
        return Promise.reject("Token ไม่ถูกต้อง");
      }
      return knex("users")
        .select("id", "username", "full_name", "type")
        .where("username", decoded.username)
        .then((resSelect) => {
          if (resSelect.length == 0) return Promise.reject("ไม่พบข้อมูล");
          return Promise.resolve(resSelect);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    });
  },
};
