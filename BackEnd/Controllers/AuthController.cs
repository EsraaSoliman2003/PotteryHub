using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    public AuthController(AppDbContext context, IJwtService jwt)
    {
        _context = context;
        _jwt = jwt;
    }

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

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return Unauthorized(new ApiErrorResponse 
            { 
                Message = "Invalid credentials" 
            });


        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new ApiErrorResponse 
            { 
                Message = "Invalid credentials" 
            });
        var token = _jwt.GenerateToken(user);

        return Ok(new
        {
            token,
            user = new { user.Id, user.Name, user.Email, user.Role }
        });
    }
}
