using Blog.Server.BLL.Model;
using Blog.Server.BLL.Service;
using Blog.Server.DTOs.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<User> userManager, SignInManager<User> singInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = singInManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = new User
                {
                    UserName = model.Username,
                    Email = model.Email
                };

                var createdUser = await _userManager.CreateAsync(user, model.Password);

                if(createdUser.Succeeded)
                {
                   return Ok(
                       new NewUserDto
                       {
                           Username = user.UserName,
                           Email = user.Email,
                           Token = _tokenService.CreateToken(user)
                       }
                       );
                } else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == model.Username);

                if(user == null)
                {
                    return Unauthorized("User not found");
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                if(!result.Succeeded)
                {
                    return Unauthorized("Invalid password or username");
                }

                return Ok(
                    new NewUserDto
                    {
                        Username = user.UserName,
                        Email = user.Email,
                        Token = _tokenService.CreateToken(user)
                    }
                );

            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
