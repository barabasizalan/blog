import Navbar from "./components/Navbar";
import "./App.css";
import BlogPostCard from "./components/blogpost/BlogPostCard";
import { BlogPost } from "./model/BlogPost";
import { useEffect, useState } from "react";
import { getAllBlogPostsAsync } from "./service/api/api-service";

function App() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogPostsAsync();
      setBlogs(response);
    } catch (error) {
      console.error("Failed to fetch blogs: ", error);
    }
  }

  return (
    <>
      <div className="main-container">
        <Navbar />
      </div>
      {
        blogs.map((blog) => (
            <BlogPostCard key={blog.id} blog={blog} />
        ))
        }
    </>
  );
}

export default App;
