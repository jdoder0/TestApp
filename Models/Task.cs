namespace Models;

public class Task
{
    [Key]
    public int ID { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public Employee? Employee { get; set; }
}