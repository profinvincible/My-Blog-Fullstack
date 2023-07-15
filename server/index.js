const express = require("express");
const cors = require("cors");
const db = require("./config/db");

// import { config } from "dotenv";
// require("dotenv").config();

// config();
// console.log(process.env.DB_URI);

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/get", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result);
  });
});

app.get("/getfromid/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result);
  });
});

app.post("/createPost", (req, res) => {
  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;
  // console.log(username + title + text);
  db.query(
    "INSERT INTO posts(title,post_text,username)VALUES(?,?,?)",
    [title, text, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      console.log(result);
    }
  );
});

app.post("/like/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE posts SET likes = likes + 1 WHERE id=?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// app.listen(3030, () => {
//   console.log("yey, your server is running on port 3030");
// });