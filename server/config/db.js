const mysql2 = require("mysql2");



// const db = mysql2.createPool({
//   user: "root",
//   host: "localhost",
//   password: "profinvincible20$",
//   database: "mini_blog",
// });


const db = mysql2.createPool({
  user: "avnadmin",
  host: "mysql-108709f8-muoghaluijeoma9-916f.j.aivencloud.com",
  password: "AVNS_bvYEHhTDMOs9d-Hm0rx",
  database: "defaultdb",
  port: "24205",
  // url: "mysql://avnadmin:AVNS_bvYEHhTDMOs9d-Hm0rx@mysql-108709f8-muoghaluijeoma9-916f.j.aivencloud.com:24205/defaultdb?ssl-mode=REQUIRED",
});


module.exports = db;
