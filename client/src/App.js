import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import CreatePost from "./pages/createPost";
import Post from "./pages/post";

function App() {
  return (
    <>
      <div className="navbar">
        <header className="links">
          <a href="/">Main Page</a>
          <a href="/createpost">Create Post</a>
        </header>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:postid" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
