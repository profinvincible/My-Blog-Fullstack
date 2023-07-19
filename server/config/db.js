const mysql = require("mysql");

const db = mysql.createPool({
  user: "admin",
  host: "mysql-136293-0.cloudclusters.net",
  password: "j2dABS8v",
  database: "my_blog",
  IPAddress: "181.215.242.87",
  port: "10035",
});

// const db = mysql.createPool({
//   user: "root",
//   host: "localhost",
//   password: "myanchorholds12#",
//   database: "my_blog",
// });

module.exports = db;
