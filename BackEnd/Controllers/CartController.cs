using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.DTOs;
using Store.Models;

namespace Store.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "User,Admin")]
public class CartController : ControllerBase
{
    private readonly AppDbContext _context;

    public CartController(AppDbContext context)
    {
        _context = context;
    }

private int GetUserId()
{
    var userIdClaim =
        User.FindFirstValue(ClaimTypes.NameIdentifier) ??
        User.FindFirstValue("id") ??
        User.FindFirstValue("UserId");

    if (string.IsNullOrWhiteSpace(userIdClaim))
    {
        throw new Exception("❌ User id claim not found in token");
    }

    if (!int.TryParse(userIdClaim, out var id))
    {
        throw new Exception($"❌ User id claim is not an int: {userIdClaim}");
    }

    return id;
}


    [HttpGet]
    public async Task<IActionResult> GetMyCart()
    {
        var userId = GetUserId();
        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
            return NotFound(new ApiErrorResponse { Message = "Cart not found" });

        return Ok(cart);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddItem(CartAddItemDto dto)
    {
        var userId = GetUserId();
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            cart = new Cart { UserId = userId };
            _context.Carts.Add(cart);
        }

        var product = await _context.Products.FindAsync(dto.ProductId);
        if (product == null)
            return NotFound(new ApiErrorResponse { Message = "Product not found" });

        var existing = cart.Items.FirstOrDefault(i => i.ProductId == dto.ProductId);
        if (existing != null)
        {
            existing.Quantity += dto.Quantity;
        }
        else
        {
            cart.Items.Add(new CartItem
            {
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            });
        }

        await _context.SaveChangesAsync();
        return Ok(cart);
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateItem(CartUpdateItemDto dto)
    {
        var userId = GetUserId();
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
            return NotFound(new ApiErrorResponse { Message = "Cart not found" });

        var item = cart.Items.FirstOrDefault(i => i.Id == dto.ItemId);
        if (item == null)
            return NotFound(new ApiErrorResponse { Message = "Item not found" });

        item.Quantity = dto.Quantity;
        if (item.Quantity <= 0)
            _context.CartItems.Remove(item);

        await _context.SaveChangesAsync();
        return Ok(cart);
    }

    [HttpDelete("remove/{itemId}")]
    public async Task<IActionResult> RemoveItem(int itemId)
    {
        var userId = GetUserId();

        var cartItem = await _context.CartItems
            .Include(ci => ci.Cart)
            .FirstOrDefaultAsync(ci => ci.Id == itemId && ci.Cart.UserId == userId);

        if (cartItem == null)
            return NotFound(new ApiErrorResponse { Message = "Item not found" });

        _context.CartItems.Remove(cartItem);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Item removed" });
    }
}
