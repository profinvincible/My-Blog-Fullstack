import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Post() {
  let { postid } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`https://myminiblog.onrender.com/getfromid/${postid}`)
      .then((data) => {
        setPost({
          title: data.data[0].title,
          posttext: data.data[0].post_text,
          username: data.data[0].username,
        });
      });
  }, []);
  return (
    <div className="IndividualPost">
      <div className="Posts Individual">
        <h1>{post.title}</h1>
        <p>{post.posttext}</p>
        {<h4>{post.username}</h4>}
      </div>
    </div>
  );
}
