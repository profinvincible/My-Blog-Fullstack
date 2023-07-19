import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [postList, setPostList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("https://my-mini-blog.onrender.com/get").then((data) => {
      setPostList(data.data);
      console.log(data.data);
    });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("https://my-mini-blog-api-deployedd.onrender.com/get")
  //     .then((response) => {
  //       const responseData = response.data;
  //       const postsArray = Object.values(responseData); // Convert object values to an array
  //       setPostList(postsArray);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const LikePost = (id) => {
    axios.post(`https://my-mini-blog.onrender.com/${id}`).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="MainPage">
      <div className="Everything">
        {postList.map((val, key) => {
          return (
            <div
              className="Posts"
              key={key}
              onClick={() => {
                navigate(`/post/${val.id}`);
              }}>
              <h1>{val.title}</h1>
              <p>
                {val.post_text.length > 100
                  ? val.post_text.substring(0, 100) + "..."
                  : val.post_text}
              </p>
              <button
                onClick={() => {
                  LikePost(val.id);
                }}>
                Like
              </button>
              <div className="flex">
                <h4>{val.username}</h4>
                <h4>{val.likes}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// useEffect(() => {
//   axios
//     .get("https://myminiblog.onrender.com/get")
//     .then((response) => {
//       const responseData = response.data;
//       const postsArray = Object.values(responseData); // Convert object values to an array
//       setPostList(postsArray);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, []);

// const newArray = [...postList];

// useEffect(() => {
//   axios
//     .get("https://myminiblog.onrender.com/get")
//     .then((response) => {
//       const responseData = response.data;
//       const postsArray = Object.values(responseData); // Convert object values to an array
//       console.log(responseData); // Check the response data
//       console.log(postsArray); // Check the converted array
//       setPostList(postsArray);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, []);
