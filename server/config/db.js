const mysql = require("mysql");

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "myanchorholds12#",
  database: "my_blog",
});

module.exports = db;
