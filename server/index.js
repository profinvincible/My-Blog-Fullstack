const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || PORT, () => {
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

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  // Your database query to delete the post with the provided ID goes here
  // ...
  db.query("DELETE FROM posts where id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// app.delete("/delete/:name", (req, res) => {
//   const name = req.params.name;
//   db.query("DELETE FROM posts WHERE name?", name, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   });
// });

// app.delete("/delete/:name", (req, res) => {
//   const name = req.params.name;
//   db.query("DELETE FROM posts WHERE name = ?", name, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Error deleting the post.");
//     } else {
//       console.log(result);
//       res.status(200).send("Post deleted successfully.");
//     }
//   });
// });

// app.listen(3030, () => {
//   console.log("yey, your server is running on port 3030");
// });
