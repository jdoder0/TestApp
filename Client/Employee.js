export class Employee{
    constructor(id, fullName, phNumber, email, dateOfBirth, monthlySalary)
    {
        this.id = id;
        this.fullName = fullName;
        this.phNumber = phNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.monthlySalary = monthlySalary;
        this.Tasks = [];
    }
    draw(host)
    {
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.id;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.fullName;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.phNumber;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.email;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.dateOfBirth;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.monthlySalary;
        tr.appendChild(el);
        
    }

    draw2(host) 
    {
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.id;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.fullName;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.phNumber;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.email;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.dateOfBirth;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.monthlySalary;
        tr.appendChild(el);
    }
}