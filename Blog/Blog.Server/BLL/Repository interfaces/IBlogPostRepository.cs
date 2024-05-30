using Blog.Server.BLL.Model;

namespace Blog.Server.BLL.Repository_interfaces
{
    public interface IBlogPostRepository
    {
        Task<IEnumerable<BlogPost>> GetAllPostsAsync();
        Task<BlogPost> GetPostByIdAsync(int id);
        Task CreatePostAsync(BlogPost post);
        Task UpdatePostAsync(BlogPost post);
        Task<bool> DeletePostAsync(int id);
    }
}
