class TaskManager{
    constructor(currentId =0){
        this.tasks = []; 
        this.currentId = currentId;
    }
    addTask(name, description, assignedTo, dueDate, status){
       const task = {
        id: this.currentId++,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status,
       }

       this.tasks.push(task);
    }
}

let bla = new TaskManager();
bla.addTask("Finish button", "Use HTML,CSS and JS for it", "Ekaterina", "23/09/2021", "to do");

//check what is inside array
console.log(bla.tasks);
