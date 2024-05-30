using Microsoft.AspNetCore.Identity;

namespace Blog.Server.BLL.Model
{
    public class User : IdentityUser
    {
        public ICollection<BlogPost> Posts { get; set; }

    }
}
