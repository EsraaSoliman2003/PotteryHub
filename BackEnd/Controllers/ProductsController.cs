using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.DTOs;
using Store.Models;

namespace Store.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.Products.ToListAsync());
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Get(int id)
    {
        var p = await _context.Products.FindAsync(id);
        if (p == null)
            return NotFound(new ApiErrorResponse { Message = "Product not found" });

        return Ok(p);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(ProductCreateUpdateDto dto)
    {
        var p = new Product
        {
            Title = dto.Title,
            Description = dto.Description,
            Price = dto.Price,
            ImageUrl = dto.ImageUrl,
            Stock = dto.Stock,
            Category = dto.Category
        };

        _context.Products.Add(p);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = p.Id }, p);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, ProductCreateUpdateDto dto)
    {
        var p = await _context.Products.FindAsync(id);
        if (p == null)
            return NotFound(new ApiErrorResponse { Message = "Product not found" });

        p.Title = dto.Title;
        p.Description = dto.Description;
        p.Price = dto.Price;
        p.ImageUrl = dto.ImageUrl;
        p.Stock = dto.Stock;
        p.Category = dto.Category;

        await _context.SaveChangesAsync();
        return Ok(p);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await _context.Products.FindAsync(id);
        if (p == null)
            return NotFound(new ApiErrorResponse { Message = "Product not found" });

        _context.Products.Remove(p);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Product deleted" });
    }

    [HttpGet("best-sellers")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBestSellers([FromQuery] int take = 8)
    {
        const int minCount = 3;
        var desiredCount = Math.Max(take, minCount);

        var bestSellers = await _context.OrderItems
            .Include(oi => oi.Product)
            .Include(oi => oi.Order)
            .Where(oi => oi.Order.Status == "Paid" || oi.Order.Status == "Completed")
            .GroupBy(oi => new
            {
                oi.ProductId,
                oi.Product.Title,
                oi.Product.Description,
                oi.Product.Price,
                oi.Product.ImageUrl,
                oi.Product.Category
            })
            .Select(g => new
            {
                ProductId = g.Key.ProductId,
                g.Key.Title,
                g.Key.Description,
                g.Key.Price,
                g.Key.ImageUrl,
                g.Key.Category,
                TotalSold = g.Sum(x => x.Quantity)
            })
            .OrderByDescending(p => p.TotalSold)
            .Take(desiredCount)
            .ToListAsync();

        if (bestSellers.Count < minCount)
        {
            var needed = minCount - bestSellers.Count;

            var existingIds = bestSellers.Select(p => p.ProductId).ToList();

            var fallbackProducts = await _context.Products
                .Where(p => !existingIds.Contains(p.Id))
                .OrderByDescending(p => p.CreatedAt)
                .Take(needed)
                .Select(p => new
                {
                    ProductId = p.Id,
                    p.Title,
                    p.Description,
                    p.Price,
                    p.ImageUrl,
                    p.Category,
                    TotalSold = 0
                })
                .ToListAsync();

            bestSellers.AddRange(fallbackProducts);
        }

        return Ok(bestSellers);
    }

}
