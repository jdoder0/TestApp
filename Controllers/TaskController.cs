using System.Globalization;

namespace Models;


[ApiController]
[Route("[controller]")]

public class TaskController : ControllerBase
{
    public TestContext Context {get; set;}
    public TaskController(TestContext context)
    {
        Context = context;
    }

    [HttpPost("TaskCreate/{title}/{description}/{dueDate}/{isCompleted}/{employeeID}")]
    public async Task<ActionResult> TaskCreate(
    string title,
    string description,
    DateTime dueDate,
    bool isCompleted,
    int employeeID
    )
    {
        try
        {
            var task = new Models.Task{
                Title = title,
                Description = description,
                DueDate = dueDate,
                IsCompleted = isCompleted
            };
            var employee = await Context.Employees.FindAsync(employeeID);
            if(employee != null)
            {
                task.Employee = employee;
                await Context.Tasks.AddAsync(task);
                await Context.SaveChangesAsync();
                return Ok($"Successfully added task with ID:{task.ID}");
            }
            else 
            {
                return BadRequest("Error!");
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

   [HttpPut("TaskUpdate/{taskID}/{title}/{description}/{dueDate}/{isCompleted}")]
    public async Task<ActionResult> TaskUpdate(int taskID, string title, string description, DateTime dueDate, bool isCompleted)
    {
        try
        {
            var updateTask = await Context.Tasks.FindAsync(taskID);
            if(updateTask != null)
            {
                updateTask.Title = title;
                updateTask.Description = description;
                updateTask.DueDate = dueDate;
                updateTask.IsCompleted = isCompleted;
                await Context.SaveChangesAsync();
                return Ok($"Successfully updated task with ID:{taskID}");
            }
            else
            {
            return BadRequest("Task with that ID doesn't exist!");
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }



    [HttpDelete("TaskDelete/{IDtask}")]
    public async Task<ActionResult> TaskDelete(int IDtask)
    {
        try
        {
            var taskDelete = await Context.Tasks.FindAsync(IDtask);
            if(taskDelete != null)
            {
                Context.Tasks.Remove(taskDelete);
                await Context.SaveChangesAsync();
                return Ok($"Successfully deleted task with ID:{IDtask}");
            }
            else
            {
                return BadRequest("Task with that ID doesn't exist!");
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("TaskRead")]
    public async Task<ActionResult> TaskRead()
    {
    try
    {
        var tasks = await Context.Tasks
            .Include(p => p.Employee)
            .Select(p => new {
                p.ID,
                p.Title,
                p.Description,
                p.DueDate,
                p.IsCompleted,
                EmployeeID = p.Employee!.ID // include Employee ID if it exists
            })
            .ToListAsync();

        return Ok(tasks);
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
    }
}