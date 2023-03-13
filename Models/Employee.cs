namespace Models;

public class Employee
{
    [Key]
    public int ID { get; set; }
    public required string FullName { get; set; }
    public required string PhNumber { get; set; }
    public required string Email { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int MonthlySalary { get; set; }
    [JsonIgnore]
    public List<Task>? Tasks { get; set; }
}