using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Store.Data;
using Store.DTOs;
using Store.Models;
using Store.Services;

namespace Store.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwt;
    private readonly JwtSettings _jwtSettings;

    public AuthController(AppDbContext context, IJwtService jwt, IOptions<JwtSettings> jwtOptions)
    {
        _context = context;
        _jwt = jwt;
        _jwtSettings = jwtOptions.Value;
    }

    // POST: api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest(new ApiErrorResponse
            {
                Message = "Email already exists"
            });


        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Role = "User",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        // create empty cart for user
        var cart = new Cart { User = user };

        await _context.Users.AddAsync(user);
        await _context.Carts.AddAsync(cart);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Registered successfully" });
    }

    // POST: api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return Unauthorized(new ApiErrorResponse { Message = "Invalid credentials" });

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new ApiErrorResponse { Message = "Invalid credentials" });

        var token = _jwt.GenerateToken(user);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpireMinutes)
        };

        Response.Cookies.Append("access_token", token, cookieOptions);

        return Ok(new
        {
            message = "Logged in successfully",
            user = new { user.Id, user.Name, user.Email, user.Role }
        });
    }

    // POST: api/auth/logout
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("access_token");
        return Ok(new { message = "Logged out successfully" });
    }
}
