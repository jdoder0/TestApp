using Models;

namespace TestProjectJS.AddControllers;

[ApiController]
[Route("[controller]")]

public class EmployeeController : ControllerBase
{
    public TestContext Context {get; set;}
    public EmployeeController(TestContext context)
    {
        Context = context;
    }




    [HttpPost("EmployeeCreate/{name}/{phone}/{email}/{dateOfBirth}/{monthlySalary}")]
    public async Task<ActionResult> CreateEmployee(string name, string phone, string email, DateTime dateOfBirth, int monthlySalary)
    {
        try
        {
        var employee = new Employee
        {
            FullName = name,
            PhNumber = phone,
            Email = email,
            DateOfBirth = dateOfBirth,
            MonthlySalary = monthlySalary
        };
        
        await Context.Employees.AddAsync(employee);
        await Context.SaveChangesAsync();
        return Ok($"Successfully added employee with ID:{employee.ID}");
        }
    
        catch(Exception e)
        {
        return BadRequest(e.Message);
        }
}




    [HttpPut("EmployeeUpdate/{employeeID}/{name}/{phone}/{email}/{dateOfBirth}/{monthlySalary}")]
    public async Task<ActionResult> EmployeeUpdate(int employeeID, string name, string phone, string email, DateTime dateOfBirth, int monthlySalary)
    {
    try
    {
        var updateEmployee = await Context.Employees.FindAsync(employeeID);
        if(updateEmployee != null)
        {
            updateEmployee.FullName = name;
            updateEmployee.PhNumber = phone;
            updateEmployee.Email = email;
            updateEmployee.DateOfBirth = dateOfBirth;
            updateEmployee.MonthlySalary = monthlySalary;
            await Context.SaveChangesAsync();
            return Ok($"Successfully updated employee with ID:{employeeID}");
        }
        else
        {
            return BadRequest("Employee with that ID doesn't exist!");
        }
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
    }

    [HttpDelete("EmployeeDelete/{IDemployee}")]
    public async Task<ActionResult> EmployeeDelete(int IDemployee)
    {
        try
        {
            var employeeDelete = await Context.Employees.FindAsync(IDemployee);
            if(employeeDelete != null)
            {
                Context.Employees.Remove(employeeDelete);
                await Context.SaveChangesAsync();
                return Ok($"Successfully deleted employee with ID:{IDemployee}");
            }
            else
            {
                return BadRequest("Employee with that ID doesn't exist!");
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("EmployeeRead")]
    public async Task<ActionResult> EmployeeRead()
    {
    try
    {
        var employees = Context.Employees.Include(p => p.Tasks);
        var employee = await employees.ToListAsync();

        return Ok(employee.Select(e=>
        new{
            FullName = e.FullName,
            PhNumber = e.PhNumber,
            Email = e.Email,
            DateOfBirth = e.DateOfBirth,
            MonthlySalary = e.MonthlySalary,
            Tasks = e.Tasks!.Select(q =>
            new{
                Title = q.Title,
                Description = q.Description,
                DueDate = q.DueDate,
                IsCompleted = q.IsCompleted
            })
        }));
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
    }

    [HttpGet("EmployeeReadByTask")]
    public async Task<ActionResult> EmployeeReadByTasks()
    {
        try
        {
            var oneMonthAgo = DateTime.Now.AddMonths(-1);
            var employeeTaskCounts = Context.Tasks
            .Where(t => t.IsCompleted && t.DueDate >= oneMonthAgo)
            .GroupBy(t => t.Employee)
            .Select(g => 
            new
            {
                Employee = g.Key,
                IsCompleted = g.Count()
            })
            .OrderByDescending(e => e.IsCompleted)
            .Take(5)
            .ToList();

            var result = employeeTaskCounts.Select(p => 
            new Employee
            {
                ID = p.Employee!.ID,
                FullName = p.Employee!.FullName,
                PhNumber = p.Employee.PhNumber,
                Email = p.Employee.Email,
                DateOfBirth = p.Employee.DateOfBirth,
                MonthlySalary = p.Employee.MonthlySalary,
            });
            return Ok(result);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);   
        }
    }
}