// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function MainPage() {
//   const [postList, setPostList] = useState([]);
//   const [updatePostId, setUpdatePostId] = useState(null);
//   const [updatedPostText, setUpdatedPostText] = useState("");
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   fetchPosts();
//   // }, []);

//   // const fetchPosts = async () => {
//   //   try {
//   //     const response = await axios.get("https://my-blog-fullstack.onrender.com/get");
//   //     console.log("API response:", response.data);
//   //     setPostList(response.data); // Update postList state with fetched data
//   //   } catch (error) {
//   //     console.error("Error fetching posts:", error);
//   //   }
//   // };
 
  
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("https://my-blog-fullstack.onrender.com/get");
//         setPostList(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator while fetching
//   }
  
//   console.log("postList:", postList);

//   const likePost = async (id) => {
//     try {
//       const response = await axios.post(
//         `https://my-blog-fullstack.onrender.com/like/${id}`
//       );
//       const updatedPostList = postList.map((post) =>
//         post.id === id ? { ...post, likes: response.data.likes } : post
//       );
//       setPostList(updatedPostList);
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const deletePost = async (id) => {
//     try {
//       await axios.delete(`https://my-blog-fullstack.onrender.com/delete/${id}`);
//       const updatedPostList = postList.filter((post) => post.id !== id);
//       setPostList(updatedPostList);
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const handleUpdate = (id) => {
//     setUpdatePostId(id);
//     const postToUpdate = postList.find((post) => post.id === id);
//     setUpdatedPostText(postToUpdate.post_text);
//   };

//   const handleSaveUpdate = async (id) => {
//     console.log("Updating post with:", updatedPostText);
//     try {
//       const response = await axios.put(
//         `https://my-blog-fullstack.onrender.com/update/${id}`,
//         {
//           updatedPostText,
//         }
//       );
//       console.log("Update response:", response.data);
//       const updatedPostList = postList.map((post) =>
//         post.id === id ? { ...post, post_text: updatedPostText } : post
//       );
//       setPostList(updatedPostList);
//       setUpdatedPostText("");
//       setUpdatePostId(null);
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };
  

//   return (
//     <div className="MainPage">
//       <div className="Everything">
//         {postList.length > 0 ? (
//           postList.map((post) => (
//             <div key={post.id} className="Posts">
//               <h1>{post.title}</h1>
              
//               <p>
//                 {post.post_text.length > 100
//                   ? post.post_text.substring(0, 100) + "..."
//                   : post.post_text}
//               </p>
//               <button
//                 onClick={() => likePost(post.id)}
//                 className={
//                   post.likes > 0 ? "likebutton likestyle" : "likebutton"
//                 }>
//                 Like
//               </button>
//               <div className="flex">
//                 <h4>{post.username}</h4>
//                 <h4>{post.likes}</h4>
//               </div>
//               <div>
//                 {updatePostId === post.id ? (
//                   <div>
//                     <input
//                       type="text"
//                       value={updatedPostText}
//                       onChange={(event) =>
//                         setUpdatedPostText(event.target.value)
//                       }
//                     />
//                     <button onClick={() => handleSaveUpdate(post.id)}>
//                       Save
//                     </button>
//                     <button
//                       onClick={() => {
//                         setUpdatedPostText("");
//                         setUpdatePostId(null);
//                       }}>
//                       Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleUpdate(post.id)}>Update</button>
//                 )}
//                 <button onClick={() => deletePost(post.id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No posts available.</p>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function MainPage() {
//   const [postList, setPostList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updatePostId, setUpdatePostId] = useState(null);
//   const [updatedPostText, setUpdatedPostText] = useState("");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("https://my-blog-fullstack.onrender.com/get");
//         setPostList(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setError("Failed to fetch posts.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const likePost = async (id) => {
//     try {
//       const response = await axios.post(`https://my-blog-fullstack.onrender.com/like/${id}`);
//       setPostList((prevList) =>
//         prevList.map((post) =>
//           post.id === id ? { ...post, likes: response.data.likes } : post
//         )
//       );
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const deletePost = async (id) => {
//     try {
//       await axios.delete(`https://my-blog-fullstack.onrender.com/delete/${id}`);
//       setPostList((prevList) => prevList.filter((post) => post.id !== id));
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const handleUpdate = (id) => {
//     setUpdatePostId(id);
//     const postToUpdate = postList.find((post) => post.id === id);
//     setUpdatedPostText(postToUpdate.post_text);
//   };

//   const handleSaveUpdate = async (id) => {
//     try {
//       await axios.put(`https://my-blog-fullstack.onrender.com/update/${id}`, {
//         updatedPostText,
//       });
//       setPostList((prevList) =>
//         prevList.map((post) =>
//           post.id === id ? { ...post, post_text: updatedPostText } : post
//         )
//       );
//       setUpdatedPostText("");
//       setUpdatePostId(null);
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="MainPage">
//       <div className="Everything">
//       {postList.length > 0 ? (
//         postList.map((post) => (
//           <div key={post.id} className="Posts">
//             <h1>{post.title}</h1>
//             <p>{post.post_text}</p>
//             <button onClick={() => likePost(post.id)}>
//               {post.likes > 0 ? `Like (${post.likes})` : "Like"}
//             </button>
//             <div className="flex">
//               <h4>{post.username}</h4>
//               <h4>{post.likes}</h4>
//             </div>
//             <div>
//               {updatePostId === post.id ? (
//                 <div>
//                   <input
//                     type="text"
//                     value={updatedPostText}
//                     onChange={(event) => setUpdatedPostText(event.target.value)}
//                   />
//                   <button onClick={() => handleSaveUpdate(post.id)}>Save</button>
//                   <button onClick={() => setUpdatePostId(null)}>Cancel</button>
//                 </div>
//               ) : (
//                 <button onClick={() => handleUpdate(post.id)}>Update</button>
//               )}
//               <button onClick={() => deletePost(post.id)}>Delete</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No posts available.</p>
//       )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [postList, setPostList] = useState([]);
  const [updatePostId, setUpdatePostId] = useState(null);
  const [updatedPostText, setUpdatedPostText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://my-blog-fullstack.onrender.com/get");
        console.log("API response:", response.data);
        setPostList(response.data); // Update postList state with fetched data
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Initial fetch
    const intervalId = setInterval(fetchPosts, 1000); // Fetch posts every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const likePost = async (id) => {
    try {
      const response = await axios.post(`https://my-blog-fullstack.onrender.com/like/${id}`);
      const updatedPostList = postList.map((post) =>
        post.id === id ? { ...post, likes: response.data.likes } : post
      );
      setPostList(updatedPostList);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://my-blog-fullstack.onrender.com/delete/${id}`);
      const updatedPostList = postList.filter((post) => post.id !== id);
      setPostList(updatedPostList);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = (id) => {
    setUpdatePostId(id);
    const postToUpdate = postList.find((post) => post.id === id);
    setUpdatedPostText(postToUpdate.post_text);
  };

  const handleSaveUpdate = async (id) => {
    console.log("Updating post with:", updatedPostText);
    try {
      await axios.put(`https://my-blog-fullstack.onrender.com/update/${id}`, { updatedPostText });
      const updatedPostList = postList.map((post) =>
        post.id === id ? { ...post, post_text: updatedPostText } : post
      );
      setPostList(updatedPostList);
      setUpdatedPostText("");
      setUpdatePostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="MainPage">
      <div className="Everything">
        {postList.length > 0 ? (
          postList.map((post) => (
            <div key={post.id} className="Posts">
              <h1>{post.title}</h1>
              <p>{post.post_text.length > 100 ? post.post_text.substring(0, 100) + "..." : post.post_text}</p>
              <button onClick={() => likePost(post.id)}>{post.likes > 0 ? `Like (${post.likes})` : "Like"}</button>
              <div className="flex">
                <h4>{post.username}</h4>
                <h4>{post.likes}</h4>
              </div>
              <div>
                {updatePostId === post.id ? (
                  <div>
                    <input type="text" value={updatedPostText} onChange={(event) => setUpdatedPostText(event.target.value)} />
                    <button onClick={() => handleSaveUpdate(post.id)}>Save</button>
                    <button onClick={() => setUpdatePostId(null)}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleUpdate(post.id)}>Update</button>
                )}
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}
