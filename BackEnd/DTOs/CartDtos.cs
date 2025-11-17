namespace Store.DTOs;

public class CartAddItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class CartUpdateItemDto
{
    public int ItemId { get; set; }
    public int Quantity { get; set; }
}
