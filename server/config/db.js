const mysql2 = require("mysql2");

// const db = mysql.createPool({
//   user: "admin",
//   host: "mysql-136293-0.cloudclusters.net",
//   password: "j2dABS8v",
//   database: "my_blog",
//   IPAddress: "181.215.242.87",
//   port: "10035",
// });

// const db = mysql.createPool({
//   user: "root",
//   host: "localhost",
//   password: "myanchorholds12#",
//   database: "my_blog",
// });

const db = mysql2.createPool({
  user: "root",
  host: "containers-us-west-209.railway.app",
  password: "cEZ6wbxDpDKsQQb2RZz3",
  database: "railway",
  port: "7856",
  url: "mysql://root:cEZ6wbxDpDKsQQb2RZz3@containers-us-west-209.railway.app:7856/railway",
});

module.exports = db;
