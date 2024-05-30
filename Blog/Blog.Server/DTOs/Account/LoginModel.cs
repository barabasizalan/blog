using System.ComponentModel.DataAnnotations;

namespace Blog.Server.DTOs.Account
{
    public class LoginModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
