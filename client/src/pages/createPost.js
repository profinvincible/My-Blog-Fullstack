import React, { useEffect, useState } from "react";
import "../App.css";
import Axios from "axios";

export default function CreatePost() {
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submitPost = () => {
    Axios.post("https://myminiblog.onrender.com/createPost", {
      userName: userName,
      title: title,
      text: text,
    });
  };

  return (
    <div className="Post">
      <div className="posts">
        <label>UserName</label>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Post text</label>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="btn" onClick={submitPost}>
          submit Post
        </button>
      </div>
    </div>
  );
}
