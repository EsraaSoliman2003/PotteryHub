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

    // GET: api/Products
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.Products.ToListAsync());
    }

    // GET: api/Products/{id}
    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Get(int id)
    {
        var p = await _context.Products.FindAsync(id);
        if (p == null)
            return NotFound(new ApiErrorResponse { Message = "Product not found" });

        return Ok(p);
    }

    // POST: api/Products
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

            ImageUrl2 = dto.ImageUrl2,
            ImageUrl3 = dto.ImageUrl3,
            ImageUrl4 = dto.ImageUrl4,
            ImageUrl5 = dto.ImageUrl5,

            Stock = dto.Stock,
            Category = dto.Category,

            Dimensions = dto.Dimensions,
            Quantity = dto.Quantity
        };

        _context.Products.Add(p);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = p.Id }, p);
    }

    // PUT: api/Products/{id}
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
        p.ImageUrl2 = dto.ImageUrl2;
        p.ImageUrl3 = dto.ImageUrl3;
        p.ImageUrl4 = dto.ImageUrl4;
        p.ImageUrl5 = dto.ImageUrl5;

        p.Stock = dto.Stock;
        p.Category = dto.Category;

        p.Dimensions = dto.Dimensions;
        p.Quantity = dto.Quantity;

        await _context.SaveChangesAsync();
        return Ok(p);
    }

    // DELETE: api/Products/{id}
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

    // GET: api/Products/best-sellers
    [HttpGet("best-sellers")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBestSellers([FromQuery] int take = 8)
    {
        const int minCount = 4;
        var desiredCount = Math.Max(take, minCount);

        var bestSellers = await _context.OrderItems
            .Include(oi => oi.Product)
            .Include(oi => oi.Order)
            .Where(oi => oi.Order.Status == "Paid" || oi.Order.Status == "Completed")
            .GroupBy(oi => oi.Product)
            .Select(g => new
            {
                ProductId = g.Key.Id,
                g.Key.Title,
                g.Key.Description,
                g.Key.Price,
                g.Key.ImageUrl,
                g.Key.ImageUrl2,
                g.Key.ImageUrl3,
                g.Key.ImageUrl4,
                g.Key.ImageUrl5,
                g.Key.Stock,
                g.Key.Category,
                g.Key.Dimensions,
                g.Key.Quantity,
                g.Key.CreatedAt,
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
                    p.ImageUrl2,
                    p.ImageUrl3,
                    p.ImageUrl4,
                    p.ImageUrl5,
                    p.Stock,
                    p.Category,
                    p.Dimensions,
                    p.Quantity,
                    p.CreatedAt,
                    TotalSold = 0
                })
                .ToListAsync();

            bestSellers.AddRange(fallbackProducts);
        }

        return Ok(bestSellers);
    }

}
