namespace Store.Models;

public class ApiErrorResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = "An error occurred";
}
