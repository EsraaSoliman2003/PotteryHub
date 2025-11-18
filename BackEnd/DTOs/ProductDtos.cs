namespace Store.DTOs;

public class ProductCreateUpdateDto
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = null!;
    public string? ImageUrl2 { get; set; }
    public string? ImageUrl3 { get; set; }
    public string? ImageUrl4 { get; set; }
    public string? ImageUrl5 { get; set; }
    public int Stock { get; set; }
    public string Category { get; set; } = null!;
    
    public string? Dimensions { get; set; }
    public string? Quantity { get; set; }
}
