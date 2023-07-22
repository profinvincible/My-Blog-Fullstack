import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// export default function MainPage() {
//   const [postList, setPostList] = useState([]);

//   let navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://my-mini-blog.onrender.com/get").then((data) => {
//       setPostList(data.data);
//       console.log(data.data);
//     });
//   }, []);

//   const LikePost = (id) => {
//     axios.post(`https://my-mini-blog.onrender.com/${id}`).then((response) => {
//       console.log(response);
//     });
//   };

//   const deletePost = (id) => {
//     axios.delete(`https://my-mini-blog.onrender.com/delete${id}`);
//     setPostList(
//       postList.filter((val) => {
//         return val.id !== id;
//       })
//     );
//   };

// ... (other imports and code above)

export default function MainPage() {
  const [postList, setPostList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://my-mini-blog.onrender.com/get")
      .then((response) => {
        setPostList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const LikePost = (id) => {
    axios
      .post(`https://my-mini-blog.onrender.com/like/${id}`)
      .then((response) => {
        console.log(response.data);
        // Assuming the server returns updated post data, update the postList state
        setPostList((prevPostList) =>
          prevPostList.map((post) =>
            post.id === id ? { ...post, likes: response.data.likes } : post
          )
        );
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`https://my-mini-blog.onrender.com/delete/${id}`)
      .then(() => {
        // Filter the deleted post out of the postList state
        setPostList((prevPostList) =>
          prevPostList.filter((post) => post.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  // ... (rest of the code)

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
