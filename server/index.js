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

// app.post("/createPost", (req, res) => {
//   const username = req.body.userName;
//   const title = req.body.title;
//   const text = req.body.text;
//   // console.log(username + title + text);
//   db.query(
//     "INSERT INTO posts(title,post_text,username)VALUES(?,?,?)",
//     [title, text, username],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }

//       console.log(result);
//     }
//   );
// });

app.post("/createPost", (req, res) => {
  const { userName, title, text } = req.body;

  // Check if any of the required fields is missing
  if (!userName || !title || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    "INSERT INTO posts(title, post_text, username) VALUES (?, ?, ?)",
    [title, text, userName],
    (err, result) => {
      if (err) {
        console.log("Error creating post:", err);
        return res.status(500).json({ error: "Failed to create post" });
      }

      console.log("Post created successfully");
      return res.status(200).json({ message: "Post created successfully" });
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
        res.status(500).json({ error: "Failed to like the post." });
      } else {
        // After updating the likes count, get the updated post data
        db.query("SELECT * FROM posts WHERE id=?", id, (err, result) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .json({ error: "Failed to fetch updated post data." });
          } else {
            const updatedPost = result[0];
            res.status(200).json(updatedPost);
          }
        });
      }
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

// app.put("/update/:id", (req, res) => {
//   const postId = parseInt(req.params.id);
//   const updatedPostText = req.body.updatedPostText;

//   const postToUpdate = postList.find((post) => post.id === postId);
//   if (!postToUpdate) {
//     return res.status(404).json({ message: "Post not found" });
//   }

//   postToUpdate.post_text = updatedPostText;
//   res.json({ message: "Post updated successfully", post: postToUpdate });
// });

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { updatedPostText } = req.body;

  db.query(
    "UPDATE posts SET post_text = ? WHERE id = ?",
    [updatedPostText, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating post" });
      } else {
        console.log("Post updated successfully");
        res.json({ message: "Post updated successfully" });
      }
    }
  );
});

// app.put("/update/:id", (req, res) => {
//   const id = req.params.id;
//   const { updatedPostText } = req.body;

//   db.query(
//     "UPDATE posts SET post_text = ? WHERE id = ?",
//     [updatedPostText, id],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error updating post" });
//       } else {
//         console.log("Post updated successfully");
//         // Assuming the server responds with the updated post data, you can send it to the client
//         res.json({ message: "Post updated successfully", updatedPostText });
//       }
//     }
//   );
// });
// app.listen(3030, () => {
//   console.log("yey, your server is running on port 3030");
// });
