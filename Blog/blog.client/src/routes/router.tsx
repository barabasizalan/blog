import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostBlog from "../pages/PostBlog";
import DetailedBlogPost from "../pages/DetailedBlogPost";

export const router = createBrowserRouter(
    [
        {path: "/", element: <App />},
        {path: "/login", element: <Login />},
        {path: "/register", element: <Register />},
        {path: "/create-post", element: <PostBlog />},
        {path: "/post/:id", element: <DetailedBlogPost />}
    ]
);