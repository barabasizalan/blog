using Blog.Server.BLL.Service;
using Blog.Server.DTOs.Blogpost;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IBlogPostService _blogPostService;

        public PostsController(IBlogPostService blogPostService)
        {
            _blogPostService = blogPostService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            try
            {
                var blogPosts = await _blogPostService.GetAllPosts();
                return Ok(blogPosts);
            } catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            try
            {
                var blogPost = await _blogPostService.GetPostById(id);
                if(blogPost == null)
                {
                    return NotFound();
                }
                return Ok(blogPost);
            } catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto createPostDto)
        {
            try
            {
                if (createPostDto == null)
                {
                    return BadRequest("Post is null");
                }
                var createdBlogPost = await _blogPostService.CreatePost(createPostDto);
                return CreatedAtAction(nameof(GetPost), new { id = createdBlogPost.Id }, createPostDto);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] CreatePostDto createPostDto)
        {
            try
            {
                var post = await _blogPostService.UpdatePost(id, createPostDto);
                return Ok(post);

            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(int id)
        {
            try
            {
                var result = await _blogPostService.DeletePost(id);
                if(result)
                {
                    return Ok();
                }
                return NotFound();
            } catch  (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}
