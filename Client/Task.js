export class Task {
    constructor(id, title, description, dueDate, isCompleted, employeeID)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
        this.employeeID = employeeID;
    }
  
    draw(host) {
      var tr = document.createElement("tr");
      host.appendChild(tr);
  
      var el = document.createElement("td");
      el.innerHTML = this.id;
      tr.appendChild(el);
  
      el = document.createElement("td");
      el.innerHTML = this.title;
      tr.appendChild(el);
  
      el = document.createElement("td");
      el.innerHTML = this.description;
      tr.appendChild(el);
  
      el = document.createElement("td");
      el.innerHTML = this.dueDate;
      tr.appendChild(el);
  
      el = document.createElement("td");
      el.innerHTML = this.isCompleted;
      tr.appendChild(el);

      el = document.createElement("td");
      el.innerHTML = this.employeeID;
      tr.appendChild(el);
    }
  }