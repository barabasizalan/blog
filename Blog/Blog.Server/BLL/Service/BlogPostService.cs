using Blog.Server.BLL.Model;
using Blog.Server.BLL.Repository_interfaces;
using Blog.Server.DTOs.Blogpost;

namespace Blog.Server.BLL.Service
{
    public class BlogPostService : IBlogPostService
    {
        private readonly IBlogPostRepository _blogPostRepository;

        public BlogPostService(IBlogPostRepository blogPostRepository)
        {
            _blogPostRepository = blogPostRepository;
        }

        public async Task<IEnumerable<BlogPost>> GetAllPosts()
        {
            return await _blogPostRepository.GetAllPostsAsync();
        }

        public async Task<BlogPost> GetPostById(int id)
        {
            var post = await _blogPostRepository.GetPostByIdAsync(id);
            if (post == null)
            {
                throw new Exception("Post not found");
            }
            return post;
        }

        public async Task<BlogPost> CreatePost(CreatePostDto post)
        {
            if(post == null)
            {
                throw new Exception("Post is null");
            }

            var newPost = new BlogPost
            {
                Title = post.Title,
                Content = post.Content,
                Author = post.Author,
                DateCreated = DateTime.Now
            };

            await _blogPostRepository.CreatePostAsync(newPost);
            return newPost;

        }

        public async Task<BlogPost> UpdatePost(int id, CreatePostDto post)
        {
            if (post == null)
            {
                throw new Exception("Post is null");
            }

            var postToUpdate = await _blogPostRepository.GetPostByIdAsync(id);
            if (postToUpdate == null)
            {
                throw new Exception("Post not found");
            }

            var newPost = new BlogPost {
                Id = id,
                Title = post.Title,
                Content = post.Content,
                Author = post.Author,
                DateCreated = postToUpdate.DateCreated
            };

            await _blogPostRepository.UpdatePostAsync(newPost);
            return newPost;
        }

        public async Task<bool> DeletePost(int id)
        {
            var post = await _blogPostRepository.GetPostByIdAsync(id);
            if (post == null)
            {
                return false;
            }
            return await _blogPostRepository.DeletePostAsync(id);
        }
    }
}
