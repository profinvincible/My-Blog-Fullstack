// const express = require("express");
// const cors = require("cors");
// const db = require("./config/db");

// const app = express();
// const PORT = process.env.PORT || 3030;

// app.use(express.json());
// app.use(cors());

// app.listen(process.env.PORT || PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// // app.get("/get", (req, res) => {
// //   db.query("SELECT * FROM posts", (err, result) => {
// //     if (err) {
// //       console.log(err);
// //     }

// //     res.send(result);
// //   });
// // });
// // app.get("/get", (req, res) => {
// //   db.query("SELECT * FROM posts", (err, result) => {
// //     if (err) {
// //       console.log(err);
// //       res.status(500).send("Server error");
// //     } else {
// //       console.log("Fetched posts:", result); // Log fetched posts
// //       res.send(result);
// //     }
// //   });
// // });

// app.get("/get", (req, res) => {
//   db.query("SELECT * FROM posts", (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Failed to fetch posts" });
//     }
//     res.json(result); // Use res.json for consistent response format
//   });
// });


// app.get("/getfromid/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }

//     res.send(result);
//   });
// });

// app.post("/createPost", (req, res) => {
//   const username = req.body.userName;
//   const title = req.body.title;
//   const text = req.body.text;
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

// app.post("/like/:id", (req, res) => {
//   const id = req.params.id;
//   db.query(
//     "UPDATE posts SET likes = likes + 1 WHERE id=?",
//     id,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ error: "Failed to like the post." });
//       } else {
//         db.query("SELECT * FROM posts WHERE id=?", id, (err, result) => {
//           if (err) {
//             console.log(err);
//             res
//               .status(500)
//               .json({ error: "Failed to fetch updated post data." });
//           } else {
//             const updatedPost = result[0];
//             res.status(200).json(updatedPost);
//           }
//         });
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
 
//   db.query("DELETE FROM posts where id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });



// app.put("/update/:id", (req, res) => {
//   const id = req.params.id;
//   const { updatedPostText } = req.body;

//   db.query(
//     "UPDATE posts SET post_text = ? WHERE id = ?",
//     [updatedPostText, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ error: "Error updating post" });
//       } else {
//         console.log("Post updated successfully");
//         res.json({ message: "Post updated successfully" });
//       }
//     }
//   );
// });

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Fetch all posts
app.get("/get", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
    res.json(result);
  });
});

// Fetch a post by ID
app.get("/getfromid/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch post" });
    }
    res.json(result);
  });
});

// Create a new post
app.post("/createPost", (req, res) => {
  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;

  db.query(
    "INSERT INTO posts (title, post_text, username) VALUES (?, ?, ?)",
    [title, text, username],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create post" });
      }

      const newPostId = result.insertId;
      db.query("SELECT * FROM posts WHERE id = ?", [newPostId], (err, newPost) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to fetch new post" });
        }

        res.status(201).json(newPost[0]);
      });
    }
  );
});

// Like a post
app.post("/like/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to like the post." });
      }
      db.query("SELECT * FROM posts WHERE id=?", id, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to fetch updated post data." });
        }
        const updatedPost = result[0];
        res.status(200).json(updatedPost);
      });
    }
  );
});

// Delete a post
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete post." });
    }
    res.status(200).json({ message: "Post deleted successfully." });
  });
});

// Update a post
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { updatedPostText } = req.body;

  db.query(
    "UPDATE posts SET post_text = ? WHERE id = ?",
    [updatedPostText, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error updating post" });
      }
      res.json({ message: "Post updated successfully" });
    }
  );
});
