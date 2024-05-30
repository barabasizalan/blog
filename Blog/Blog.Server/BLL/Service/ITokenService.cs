using Blog.Server.BLL.Model;

namespace Blog.Server.BLL.Service
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
