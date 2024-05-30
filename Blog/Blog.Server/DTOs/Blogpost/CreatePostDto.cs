using System.ComponentModel.DataAnnotations;

namespace Blog.Server.DTOs.Blogpost
{
    public class CreatePostDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string Author { get; set; }
    }
}
