using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Models;

namespace Store.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
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
            throw new Exception("User id claim not found in token");
        }

        if (!int.TryParse(userIdClaim, out var id))
        {
            throw new Exception($"User id claim is not an int: {userIdClaim}");
        }

        return id;
    }

    // =============== Create Order from Cart ===============

    [HttpPost]
    [Authorize(Roles = "User,Admin")]
    public async Task<IActionResult> CreateOrderFromCart()
    {
        var userId = GetUserId();

        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null || !cart.Items.Any())
            return BadRequest(new ApiErrorResponse { Message = "Cart is empty" });

        var order = new Order
        {
            UserId = userId,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        decimal total = 0;

        foreach (var item in cart.Items)
        {
            if (item.Product.Stock < item.Quantity)
            {
                return BadRequest(new ApiErrorResponse
                {
                    Message = $"Not enough stock for {item.Product.Title}"
                });
            }

            var price = item.Product.Price;
            total += price * item.Quantity;

            order.Items.Add(new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                Price = price
            });
        }

        order.TotalPrice = total;

        _context.Orders.Add(order);
        _context.CartItems.RemoveRange(cart.Items);

        await _context.SaveChangesAsync();

        return Ok(order);
    }

    // =============== Get My Orders ===============

    [HttpGet("my")]
    [Authorize(Roles = "User,Admin")]
    public async Task<IActionResult> GetMyOrders()
    {
        var userId = GetUserId();

        var orders = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return Ok(orders);
    }

    // =============== Get All (Admin) ===============

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.Items)
            .ThenInclude(oi => oi.Product)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return Ok(orders);
    }

    // =============== Admin: Update Status ===============

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound(new ApiErrorResponse { Message = "Order not found" });

        var oldStatus = order.Status;
        var newStatus = status;

        if (string.Equals(oldStatus, "Pending", StringComparison.OrdinalIgnoreCase) &&
            string.Equals(newStatus, "Approved", StringComparison.OrdinalIgnoreCase))
        {
            foreach (var item in order.Items)
            {
                if (item.Product.Stock < item.Quantity)
                {
                    return BadRequest(new ApiErrorResponse
                    {
                        Message = $"Not enough stock for {item.Product.Title}"
                    });
                }
            }

            foreach (var item in order.Items)
            {
                item.Product.Stock -= item.Quantity;
            }
        }

        order.Status = newStatus;

        await _context.SaveChangesAsync();

        return Ok(order);
    }

    // =============== User/Admin: Cancel Pending Order ===============

    [HttpPut("{id}/cancel")]
    [Authorize(Roles = "User,Admin")]
    public async Task<IActionResult> CancelOrder(int id)
    {
        var userId = GetUserId();
        var isAdmin = User.IsInRole("Admin");

        var order = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound(new ApiErrorResponse { Message = "Order not found" });

        if (!isAdmin && order.UserId != userId)
            return Forbid();

        if (!string.Equals(order.Status, "Pending", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new ApiErrorResponse
            {
                Message = "Only pending orders can be cancelled."
            });
        }

        order.Status = "Cancelled";

        await _context.SaveChangesAsync();

        return Ok(order);
    }
}
