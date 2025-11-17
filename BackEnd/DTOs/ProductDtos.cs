namespace Store.DTOs;

public class ProductCreateUpdateDto
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = null!;
    public int Stock { get; set; }
    public string Category { get; set; } = null!;
}
