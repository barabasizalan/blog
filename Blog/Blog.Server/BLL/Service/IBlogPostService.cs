using Blog.Server.BLL.Model;
using Blog.Server.DTOs.Blogpost;

namespace Blog.Server.BLL.Service
{
    public interface IBlogPostService
    {
        Task<IEnumerable<BlogPost>> GetAllPosts();
        Task<BlogPost> GetPostById(int id);
        Task<BlogPost> CreatePost(CreatePostDto post);
        Task<BlogPost> UpdatePost(int id, CreatePostDto post);
        Task<bool> DeletePost(int id);
    }
}
