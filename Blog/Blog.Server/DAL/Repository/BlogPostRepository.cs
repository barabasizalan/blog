using Blog.Server.BLL.Model;
using Blog.Server.BLL.Repository_interfaces;
using Microsoft.EntityFrameworkCore;

namespace Blog.Server.DAL.Repository
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly BlogDbContext _dbContext;

        public BlogPostRepository(BlogDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<BlogPost>> GetAllPostsAsync()
        {
            return await _dbContext.BlogPosts.ToListAsync();
        }

        public async Task<BlogPost> GetPostByIdAsync(int id)
        {
            var post = await _dbContext.BlogPosts.FindAsync(id);
            if(post == null)
            {
                return null;
            }
            return post;
        }

        public async Task CreatePostAsync(BlogPost post)
        {
            _dbContext.BlogPosts.Add(post);
            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdatePostAsync(BlogPost post)
        {
            _dbContext.BlogPosts.Update(post);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> DeletePostAsync(int id)
        {
            var post = await _dbContext.BlogPosts.FindAsync(id);
            if (post != null)
            {
                _dbContext.BlogPosts.Remove(post);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
