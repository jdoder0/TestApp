import { Employee } from "./Employee.js";
import { Task } from "./Task.js";

export class Company{
    constructor(ListEmployees, ListTasks)
    {
        this.ListEmployees = ListEmployees;
        this.ListTasks = ListTasks;
        this.container = null;
    }

    draw(host)
    {
        this.container = document.createElement("div");
        this.container.className = "ContainerParent";
        host.appendChild(this.container);

        let header = document.createElement("h1");
        header.className = "header";
        header.innerHTML = "Test Application";
        this.container.appendChild(header);

        let containerEmployee = document.createElement("div");
        containerEmployee.className = "containerEmployee";
        this.container.appendChild(containerEmployee);

        let divLeftEmployee = document.createElement("div");
        divLeftEmployee.className = "divLeftEmployee";
        containerEmployee.appendChild(divLeftEmployee);

        let divRightEmployee = document.createElement("div");
        divRightEmployee.className = "divRightEmployee";
        containerEmployee.appendChild(divRightEmployee);

        this.drawEmployee(divLeftEmployee);
        this.drawTableEmployee(divRightEmployee);
        this.drawTable2Employee(divRightEmployee);


        let containerTask = document.createElement("div");
        containerTask.className = "containerTask";
        this.container.appendChild(containerTask);

        let containerTaskLeft = document.createElement("div");
        containerTaskLeft.className = "containerTaskLeft";
        containerTask.appendChild(containerTaskLeft);

        let containerTaskRight = document.createElement("div");
        containerTaskRight.className = "containerTaskRight";
        containerTask.appendChild(containerTaskRight);

        this.drawTask(containerTaskLeft);
        this.drawTableTask(containerTaskRight);  
    }


    //Employee

    drawTableEmployee(host)
    {
        let read = document.createElement("div");
        read.className = "read";
        host.appendChild(read);

        var table = document.createElement("table");
        table.className = "tabela";
        read.appendChild(table);

        var tableHead = document.createElement("thead");
        table.appendChild(tableHead);

        var tr = document.createElement("tr");
        tr.className = "row";
        tableHead.appendChild(tr);

        var tableBody = document.createElement("tbody");
        tableBody.className = "tableData";
        table.appendChild(tableBody);

        let th;
        var zag =["ID","Full Name","Phone Number","Email","Date of birth","Monthly Salary"];
        zag.forEach(el =>
            {
                th = document.createElement("th");
                th.innerHTML = el;
                tr.appendChild(th);
            }) 
    }

    drawTable2Employee(host)
    {
        let read2 = document.createElement("div");
        read2.className = "read2";
        host.appendChild(read2);

        var table2 = document.createElement("table");
        table2.className = "tabela2";
        read2.appendChild(table2);

        var tableHead2 = document.createElement("thead");
        table2.appendChild(tableHead2);

        var tr2 = document.createElement("tr");
        tr2.className = "row2";
        tableHead2.appendChild(tr2);

        var tableBody2 = document.createElement("tbody");
        tableBody2.className = "tableData2";
        table2.appendChild(tableBody2);

        let th;
        var zag2 =["ID","Full Name","Phone Number","Email","Date of birth","Monthly Salary"];
        zag2.forEach(el =>
            {
                th = document.createElement("th");
                th.innerHTML = el;
                tr2.appendChild(th);
            }) 
    }

    drawEmployee(host)
    {
        let divID = document.createElement("div");
        let labelID = document.createElement("label");
        labelID.innerHTML = "Employee ID:"
        let inputID = document.createElement("input");
        inputID.id = 'employee-id';
        divID.appendChild(labelID);
        divID.appendChild(inputID);
        host.appendChild(divID);

        let divName = document.createElement("div");
        let labelN = document.createElement("label");
        labelN.innerHTML = "Full Name:"
        let inputName = document.createElement("input");
        inputName.id = 'employee-fullname';
        divName.appendChild(labelN);
        divName.appendChild(inputName);
        host.appendChild(divName);

        let divPhone = document.createElement("div");
        let labelPH = document.createElement("label");
        labelPH.innerHTML = "Phone Number:"
        let inputPH = document.createElement("input");
        inputPH.id = 'employee-phnumber';
        divPhone.appendChild(labelPH);
        divPhone.appendChild(inputPH);
        host.appendChild(divPhone);

        let divEmail = document.createElement("div");
        let labelE = document.createElement("label");
        labelE.innerHTML = "Email"
        let inputE = document.createElement("input");
        inputE.id ='employee-email'
        divEmail.appendChild(labelE);
        divEmail.appendChild(inputE);
        host.appendChild(divEmail);

        let divDate = document.createElement("div");
        let labelDate = document.createElement("label");
        labelDate.innerHTML = "Date of birth:"
        let inputDate = document.createElement("input");
        inputDate.type = "date";
        inputDate.id = 'employee-dob'
        divDate.appendChild(labelDate);
        divDate.appendChild(inputDate);
        host.appendChild(divDate);

        let divSalary = document.createElement("div");
        let labelMS = document.createElement("label");
        labelMS.innerHTML = "Monthly salary:"
        let inputMS = document.createElement("input");
        inputMS.id = 'employee-salary';
        divSalary.appendChild(labelMS);
        divSalary.appendChild(inputMS);
        host.appendChild(divSalary);

        let divButtons = document.createElement("div");
        divButtons.className = "divButtons";

        let divButtonsLeft = document.createElement("div");
        divButtonsLeft.className = "divButtonsLeft";

        let divButtonsRight = document.createElement("div");
        divButtonsRight.className = "divButtonsRight";
        
        let addButton = document.createElement("button");
        addButton.innerHTML = "Add Employee";
        addButton.onclick = (ev) => this.addEmployee(inputName.value, inputPH.value, inputE.value, inputDate.value, inputMS.value);
        
        let updateButton = document.createElement("button");
        updateButton.innerHTML = "Update Employee";
        updateButton.onclick = (ev) => this.updateEmployee(inputID.value,inputName.value, inputPH.value, inputE.value, inputDate.value, inputMS.value);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Employee";
        deleteButton.onclick = (ev) => this.deleteEmployee(inputID.value);

        let readButton = document.createElement("button");
        readButton.innerHTML = "Read Employees";
        readButton.onclick = (ev) => this.readEmployees();

        let maxTaskButton = document.createElement("button");
        maxTaskButton.innerHTML = "Load employees with 5 or more tasks";
        maxTaskButton.onclick = (ev) => this.maxTasks();

        divButtonsLeft.appendChild(addButton);
        divButtonsLeft.appendChild(updateButton);
        divButtonsRight.appendChild(deleteButton);
        divButtonsRight.appendChild(readButton);
        divButtons.appendChild(divButtonsLeft);
        divButtons.appendChild(divButtonsRight);
        divButtons.appendChild(maxTaskButton);
        host.appendChild(divButtons);
    }
    
    addEmployee(fullName, phNumber, email, dateOfBirth, monthlySalary) {    
        fetch(`http://localhost:5108/Employee/EmployeeCreate/${fullName}/${phNumber}/${email}/${dateOfBirth}/${monthlySalary}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if (response.ok) {
            alert('Employee added successfully!');
          } else {
            alert('Failed to add employee!');
          }
        }).catch(error => console.error(error));
      }

    readEmployees()
    {
        fetch("http://localhost:5108/Employee/EmployeeRead").then(e =>
        {
            if(e.ok)
            {
              this.deletePrevious();
                e.json().then(data =>
                    {
                        var tableBody = document.querySelector(".tableData")
                        data.forEach(s => {
                            let em = new Employee(s.id, s.fullName, s.phNumber, s.email,
                                s.dateOfBirth, s.monthlySalary);
                                em.draw(tableBody); 
                        });
                    })
            }
        })
    }

    deletePrevious()
    {
        var tableBody = document.querySelector(".tableData");
        var parent = tableBody.parentNode;
        parent.removeChild(tableBody);

        var tableBody = document.createElement("tbody");
        tableBody.className = "tableData";
        parent.appendChild(tableBody);
    }

    deletePrevious2()
    {
        var tableBody2 = document.querySelector(".tableData2");
        var parent2 = tableBody2.parentNode;
        parent2.removeChild(tableBody2);

        var tableBody2 = document.createElement("tbody");
        tableBody2.className = "tableData2";
        parent2.appendChild(tableBody2);
    }

    maxTasks()
    {
        fetch("http://localhost:5108/Employee/EmployeeReadByTask").then(e =>
        {
            if(e.ok)
            {
              this.deletePrevious2();
                e.json().then(data =>
                {
                    var tableBody = document.querySelector(".tableData2");
                        data.forEach(s => {
                            let em = new Employee(s.id, s.fullName, s.phNumber, s.email,
                            s.dateOfBirth, s.monthlySalary);
                            em.draw2(tableBody); 
                    });

                })
            }
        })
    }

    deleteEmployee(ID) 
    {
        fetch(`http://localhost:5108/Employee/EmployeeDelete/${ID}`, {
        method: 'DELETE'
        })
        .then(e =>
        {
            if(e.ok)
            {
                 alert("Employee successfully deleted!");
            }
        })
    .catch(error => console.error(error));
    }
    
    updateEmployee(ID, fullName, phNumber, email, dateOfBirth, monthlySalary) 
    {
        fetch(`http://localhost:5108/Employee/EmployeeUpdate/${ID}/${fullName}/${phNumber}/${email}/${dateOfBirth}/${monthlySalary}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if (response.ok) {
              alert('Employee updated successfully!');
            } else {
              alert('Failed to update employee!');
            }
          }).catch(error => console.error(error));
    }



//Task

    drawTask(host)
    {
        let divID = document.createElement("div");
        let labelID = document.createElement("label");
        labelID.innerHTML = "Task ID:"
        let inputID = document.createElement("input");
        inputID.id = 'task-id';
        divID.appendChild(labelID);
        divID.appendChild(inputID);
        host.appendChild(divID);

        let divTitle = document.createElement("div");
        let labelTitle = document.createElement("label");
        labelTitle.innerHTML = "Title:"
        let inputTitle = document.createElement("input");
        inputTitle.id = 'task-title';
        divTitle.appendChild(labelTitle);
        divTitle.appendChild(inputTitle);
        host.appendChild(divTitle);

        let divDes = document.createElement("div");
        let labelDes = document.createElement("label");
        labelDes.innerHTML = "Description:"
        let inputDes = document.createElement("input");
        inputDes.id = 'task-des';
        divDes.appendChild(labelDes);
        divDes.appendChild(inputDes);
        host.appendChild(divDes);

        let divDate = document.createElement("div");
        let labelDate = document.createElement("label");
        labelDate.innerHTML = "Due to date:"
        let inputDate = document.createElement("input");
        inputDate.type = "date";
        inputDate.id = 'task-dtd'
        divDate.appendChild(labelDate);
        divDate.appendChild(inputDate);
        host.appendChild(divDate);

        let divComp = document.createElement("div");
        let labelComp = document.createElement("label");
        labelComp.innerHTML = "Is Completed:"
        let inputComp = document.createElement("input");
        inputComp.id = 'task-completed';
        divComp.appendChild(labelComp);
        divComp.appendChild(inputComp);
        host.appendChild(divComp);

        let divEmp = document.createElement("div");
        let labelEmp = document.createElement("label");
        labelEmp.innerHTML = "Employee ID:"
        let inputEmp = document.createElement("input");
        inputEmp.id = 'emp-id';
        divEmp.appendChild(labelEmp);
        divEmp.appendChild(inputEmp);
        host.appendChild(divEmp);

        let divButtons = document.createElement("div");
        divButtons.className = "divButtons";

        let divButtonsLeft = document.createElement("div");
        divButtonsLeft.className = "divButtonsLeft";

        let divButtonsRight = document.createElement("div");
        divButtonsRight.className = "divButtonsRight";

        let addButton = document.createElement("button");
        addButton.innerHTML = "Add Task";
        addButton.onclick = (ev) => this.createTask(inputTitle.value, inputDes.value, inputDate.value, inputComp.value, inputEmp.value);
        
        let updateButton = document.createElement("button");
        updateButton.innerHTML = "Update Task";
        updateButton.onclick = (ev) => this.updateTask(inputID.value ,inputTitle.value, inputDes.value, inputDate.value, inputComp.value, inputEmp.value);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Task";
        deleteButton.onclick = (ev) => this.deleteTask(inputID.value);

        let readButton = document.createElement("button");
        readButton.innerHTML = "Read Tasks";
        readButton.onclick = (ev) => this.readTask();

        divButtonsLeft.appendChild(addButton);
        divButtonsLeft.appendChild(updateButton);
        divButtonsRight.appendChild(deleteButton);
        divButtonsRight.appendChild(readButton);
        divButtons.appendChild(divButtonsLeft);
        divButtons.appendChild(divButtonsRight);
        host.appendChild(divButtons);

    }

    drawTableTask(host)
    {
        let readT = document.createElement("div");
        readT.className = "readT";
        host.appendChild(readT);

        var tableT = document.createElement("table");
        tableT.className = "tabelaT";
        readT.appendChild(tableT);

        var tableHeadT = document.createElement("thead");
        tableT.appendChild(tableHeadT);

        var trT = document.createElement("tr");
        trT.className = "rowT";
        tableHeadT.appendChild(trT);

        var tableBodyT = document.createElement("tbody");
        tableBodyT.className = "tableDataT";
        tableT.appendChild(tableBodyT);

        let thT;
        var zag =["ID", "Title","Description","DueDate","IsCompleted", "Employee ID"];
        zag.forEach(el =>
            {
                thT = document.createElement("th");
                thT.innerHTML = el;
                trT.appendChild(thT);
            }) 
    }

    createTask(Title, Description, DueDate, IsCompleted, Employee)
    {
        fetch(`http://localhost:5108/Task/TaskCreate/${Title}/${Description}/${DueDate}/${IsCompleted}/${Employee}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if (response.ok) {
            alert('Task added successfully!');
          } else {
            alert('Failed to add Task!');
          }
        }).catch(error => console.error(error));
    }

    deleteTask(ID) 
    {
        fetch(`http://localhost:5108/Task/TaskDelete/${ID}`, {
        method: 'DELETE'
        })
        .then(e =>
        {
            if(e.ok)
            {
                 alert("Task successfully deleted!");
            }
        })
    .catch(error => console.error(error));
    }

    updateTask(id, title, description, dueDate, isCompleted, employee)
    {
        fetch(`http://localhost:5108/Task/TaskUpdate/${id}/${title}/${description}/${dueDate}/${isCompleted}/${employee}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if (response.ok) {
              alert('Task updated successfully!');
            } else {
              alert('Failed to update task!');
            }
          }).catch(error => console.error(error));
    }

    readTask() 
    {
        fetch("http://localhost:5108/Task/TaskRead").then(e =>
        {
            if(e.ok)
            {
              this.deletePreviousTask();
                e.json().then(data =>
                { 
                    var tableBody = document.querySelector(".tableDataT")
                    data.forEach(s => {
                    let ta = new Task(s.id, s.title, s.description, s.dueDate,
                        s.isCompleted, s.employeeID);
                        ta.draw(tableBody); 
                    });
                 })
            }
        })
    }
    deletePreviousTask()
    {
      var tableBodyT = document.querySelector(".tableDataT");
      var parent = tableBodyT.parentNode;
      parent.removeChild(tableBodyT);

      var tableBodyT = document.createElement("tbody");
      tableBodyT.className = "tableDataT";
      parent.appendChild(tableBodyT);
    }

}