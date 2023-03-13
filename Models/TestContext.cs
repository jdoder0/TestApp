namespace Models;
public class TestContext : DbContext
{
    public required DbSet<Employee> Employees { get; set; }
    public required DbSet<Task> Tasks { get; set; }
    public TestContext(DbContextOptions options) : base(options)
    {
       
    }
}