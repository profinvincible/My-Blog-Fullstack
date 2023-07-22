import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [postList, setPostList] = useState([]);

  // const [showmore, setShowmore] = useState(false);
  const [like, setLike] = useState(false);
  // const [updatepost, setupdatepost] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("https://my-mini-blog.onrender.com/get").then((data) => {
      setPostList(data.data);
      console.log(data.data);
    });
  }, []);

  const LikePost = (id) => {
    axios.post(`https://my-mini-blog.onrender.com/${id}`).then((response) => {
      console.log(response);
    });
  };

  const deletePost = (id) => {
    axios.delete(`https://my-mini-blog.onrender.com/delete${id}`);
    setPostList(
      postList.filter((val) => {
        return val.id !== id;
      })
    );
  };

  // const deletePost = (id) => {
  //   const encodedId = encodeURIComponent(id);
  //   axios
  //     .delete(`https://my-mini-blog.onrender.com/delete/34/${encodedId}`)
  //     .then((response) => {
  //       // The delete request was successful, now update the state
  //       setPostList(
  //         postList.filter((val) => {
  //           return val.id !== id;
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       // Handle error if the request fails
  //       console.error("Error deleting post:", error.response);
  //     });
  // };

  return (
    <div className="MainPage">
      <div className="Everything">
        {postList.map((val, key) => {
          return (
            <>
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
                  }}
                  className={
                    val.likes > 0 ? "likebutton likestyle  " : "likebutton "
                  }>
                  Like
                </button>
                <div className="flex">
                  <h4>{val.username}</h4>
                  <h4>{val.likes}</h4>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deletePost(val.id);
                    }}>
                    Delete
                  </button>
                </div>
                {/* <div>
                  <input
                    placeholder="update"
                    onChange={(e) => setupdatepost(e.target.value)}
                    type="text"
                  /> */}
                {/* <button
                    onClick={() => {
                      update(val.id);
                    }}
                    className="btn btn-primary  px-0 py-0 mx-2">
                    Update
                  </button> */}
                {/* </div> */}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
