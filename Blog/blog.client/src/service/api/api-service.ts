import axios from "axios";
import { CreateBlogPost } from "../../dto/CreateBlogPost";
import { BlogPost } from "../../model/BlogPost";

const BASE_URL = "https://localhost:7144";

export const getAllBlogPostsAsync = async (): Promise<BlogPost[]> => {
    try {
        const response = await axios.get<BlogPost[]>(`${BASE_URL}/api/posts`);
        return response.data;
    } catch (error) {
        console.error('Failed to get blog posts: ', error);
        throw error;
    }
}

export const getBlogPostByIdAsync = async (id: number): Promise<BlogPost> => {
    try {
        const response = await axios.get<BlogPost>(`${BASE_URL}/api/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get blog post by id: ', error);
        throw error;
    }
}

export const postBlogAsync = async (blogPost: CreateBlogPost): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/api/posts`, blogPost, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error('Failed to post blog: ', error);
        throw error;
    }
}

export const updateBlogAsync = async (id: number, blogPost: CreateBlogPost): Promise<void> => {
    try {
        await axios.put(`${BASE_URL}/api/posts/${id}`, blogPost, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
    } catch (error) {
        console.error('Failed to update blog: ', error);
        throw error;
    }
}

export const deleteBlogAsync = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
    } catch (error) {
        console.error('Failed to delete blog: ', error);
        throw error;
    }
}

export const registerUserAsync = async (username: string, email: string, password: string): Promise<number> => {
    try {
        const response = await axios.post(`${BASE_URL}/api/account/register`, {
            username: username,
            email: email,
            password: password
        });

        return response.status;
    } catch (error) {
        console.error('Failed to register user: ', error);
        throw error;
    }
}