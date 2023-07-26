// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MainPage() {
//   const [postList, setPostList] = useState([]);
//   const [updatePostId, setUpdatePostId] = useState(null);
//   const [updatedPostText, setUpdatedPostText] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("https://my-mini-blog.onrender.com/get")
//       .then((response) => {
//         setPostList(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//       });
//   }, []);

//   const LikePost = (event, id) => {
//     event.preventDefault();
//     axios
//       .post(`https://my-mini-blog.onrender.com/like/${id}`)
//       .then((response) => {
//         console.log(response.data);
//         // Assuming the server returns updated post data, update the postList state
//         setPostList((prevPostList) =>
//           prevPostList.map((post) =>
//             post.id === id ? { ...post, likes: response.data.likes } : post
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Error liking post:", error);
//       });
//   };

//   const deletePost = (event, id) => {
//     event.preventDefault();
//     axios
//       .delete(`https://my-mini-blog.onrender.com/delete/${id}`)
//       .then(() => {
//         // Filter the deleted post out of the postList state
//         setPostList((prevPostList) =>
//           prevPostList.filter((post) => post.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting post:", error);
//       });
//   };

//   const handleUpdate = (event, id) => {
//     event.preventDefault();
//     setUpdatePostId(id);

//     const postToUpdate = postList.find((post) => post.id === id);

//     setUpdatedPostText(postToUpdate.post_text);
//   };

//   const handleSaveUpdate = (event, id) => {
//     event.preventDefault();
//     axios
//       .put(`https://my-mini-blog.onrender.com/update/${id}`, {
//         updatedPostText,
//       })
//       .then((response) => {
//         console.log(response.data);
//         // Assuming the server responds with a success message, update the postList state
//         setPostList((prevPostList) =>
//           prevPostList.map((post) =>
//             post.id === id ? { ...post, post_text: updatedPostText } : post
//           )
//         );
//         // Clear the input and updatePostId after updating
//         setUpdatedPostText("");
//         setUpdatePostId(null);
//       })
//       .catch((error) => {
//         console.error("Error updating post:", error);
//       });
//   };

//   return (
//     <div className="MainPage">
//       <div className="Everything">
//         {/* Use a unique key for each item when using map */}
//         {postList.map((val) => (
//           <div key={val.id} className="Posts">
//             <h1>{val.title}</h1>
//             <p>
//               {val.post_text.length > 100
//                 ? val.post_text.substring(0, 100) + "..."
//                 : val.post_text}
//             </p>
//             <button
//               onClick={(event) => {
//                 LikePost(event, val.id);
//               }}
//               className={val.likes > 0 ? "likebutton likestyle" : "likebutton"}>
//               Like
//             </button>
//             <div className="flex">
//               <h4>{val.username}</h4>
//               <h4>{val.likes}</h4>
//             </div>
//             <div>
//               {updatePostId === val.id ? (
//                 // Display input field for updating the post text
//                 <div>
//                   <input
//                     type="text"
//                     value={updatedPostText}
//                     onChange={(event) => setUpdatedPostText(event.target.value)}
//                   />
//                   {/* <button onClick={(event) => handleSaveUpdate(event, val.id)}>
//                     Save
//                   </button> */}
//                   <button onClick={(event) => handleSaveUpdate(event, val.id)}>
//                     Save
//                   </button>

//                   <button
//                     onClick={() => {
//                       // Cancel editing, clear input, and reset updatePostId
//                       setUpdatedPostText("");
//                       setUpdatePostId(null);
//                     }}>
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 // Display the "Update" button
//                 <button onClick={(event) => handleUpdate(event, val.id)}>
//                   Update
//                 </button>
//               )}
//               <button
//                 onClick={(event) => {
//                   deletePost(event, val.id);
//                 }}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [postList, setPostList] = useState([]);
  const [updatePostId, setUpdatePostId] = useState(null);
  const [updatedPostText, setUpdatedPostText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("https://my-mini-blog.onrender.com/get")
      .then((response) => {
        setPostList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

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

  const handleUpdate = (id) => {
    setUpdatePostId(id);

    const postToUpdate = postList.find((post) => post.id === id);

    setUpdatedPostText(postToUpdate.post_text);
  };

  const handleSaveUpdate = (id) => {
    axios
      .put(`https://my-mini-blog.onrender.com/update/${id}`, {
        updatedPostText,
      })
      .then((response) => {
        console.log(response.data);
        // Assuming the server responds with a success message, update the postList state
        setPostList((prevPostList) =>
          prevPostList.map((post) =>
            post.id === id ? { ...post, post_text: updatedPostText } : post
          )
        );
        // Clear the input and updatePostId after updating
        setUpdatedPostText("");
        setUpdatePostId(null);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <div className="MainPage">
      <div className="Everything">
        {postList.map((val) => (
          <div key={val.id} className="Posts">
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
              className={val.likes > 0 ? "likebutton likestyle" : "likebutton"}>
              Like
            </button>
            <div className="flex">
              <h4>{val.username}</h4>
              <h4>{val.likes}</h4>
            </div>
            <div>
              {updatePostId === val.id ? (
                // Display input field for updating the post text
                <div>
                  <input
                    type="text"
                    value={updatedPostText}
                    onChange={(event) => setUpdatedPostText(event.target.value)}
                  />
                  <button onClick={() => handleSaveUpdate(val.id)}>Save</button>
                  <button
                    onClick={() => {
                      // Cancel editing, clear input, and reset updatePostId
                      setUpdatedPostText("");
                      setUpdatePostId(null);
                    }}>
                    Cancel
                  </button>
                </div>
              ) : (
                // Display the "Update" button
                <button onClick={() => handleUpdate(val.id)}>Update</button>
              )}
              <button onClick={() => deletePost(val.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
