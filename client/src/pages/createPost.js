import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitPost = () => {
    Axios.post("https://my-mini-blog.onrender.com/createPost", {
      userName: userName,
      title: title,
      text: text,
    })
      .then((response) => {
        setMessage("Post submitted successfully!");
        // Optionally, clear the form fields after successful submission
        setUserName("");
        setTitle("");
        setText("");
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again later.");
      });
  };

  const handleSubmit = (Event) => {
    submitPost();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="Post">
        <div className="posts">
          <label>UserName</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label>Post text</label>
          <textarea
            className="opal"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button className="btn" type="submit">
            Submit Post
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </form>
  );
}
