const myTaskId = document.getElementById("mytaskId");
const myTaskName = document.getElementById("taskName");
const myTaskText = document.getElementById("floatingTextarea");
const myTaskAssTo = document.getElementById("assignedTo");
const myTaskStatus = document.getElementById("status");
const myTaskDueDate = document.getElementById("duedate");

const createTaskHtml = (
  id,
  name,
  description,
  assignedTo,
  dueDate,
  status,
  style
) => {
  const html = `<div class="card mycard"  data-task-id="${id}" style="width: 24rem">
            <div class="card-body">
              <div id="mytaskId"> ${id} </div>
              <h5 class="card-title mycard-title ${style}"> 
              ${name}</h5>
              <p class="card-text"> Description: ${description}</p>
              <p class="card-text">Assigned to: ${assignedTo}</p>
              <p class="card-text">Status: ${status}</p>
              <p class="card-text">Due date: ${dueDate}</p>
              <div class="mycard-buttons">
                
                <button type="button" 
                class="btn btn-secondary ed-dl-button edit-button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal" 
                onclick="openEditModeForm(this)"
                id="myTaskId"
                data-task-id="${id}">

                <svg xmlns="http://www.w3.org/2000/svg" width="14"
                 height="14" fill="currentColor" class="bi bi-pencil-fill edit-svg" 
                 viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
              </button>
  
              <button type="button"  class="btn btn-secondary ed-dl-button delete-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash delete-svg " viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
                </div>
            </div>
          </div>`;
  return html;
};

function openEditModeForm(n) {
  const mytask = taskManager.getTaskById(Number(n.dataset.taskId));
  myTaskId.value = mytask.id;
  myTaskName.value = mytask.name;
  myTaskName.readOnly = "true";
  myTaskText.value = mytask.description;
  myTaskAssTo.value = mytask.assignedTo;
  myTaskStatus.value = mytask.status;
  myTaskDueDate.value = mytask.dueDate;
}

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  addTask(id, name, description, assignedTo, dueDate, status) {
    if (id === -1) {
      let task = {
        id: this.currentId++,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status,
        style: (function (status) {
          if (status === "To Do!") {
            return "toDo";
          } else if (status === "Review") {
            return "review";
          } else if (status === "In Progress") {
            return "inProgress";
          } else {
            return "done";
          }
        })(status),
      };
      this.tasks.push(task);
    } else {
      this.editTask(id, name, description, assignedTo, dueDate, status);
    }
   
    //sorting array correctly
    this.tasks.sort(function (taskA, taskB) {
      let stat = {
        "To Do!": 1,
        "In Progress": 2,
        Review: 3,
        "Done!": 4,
      };
      return stat[taskA.status] - stat[taskB.status];
    });

    //updates webpage after save
    window.location.href = window.location.href;
  }

  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    console.log(foundTask);
    return foundTask;
  }

  editTask(id, name, description, assignedTo, dueDate, status) {
    let matchingTask = this.tasks.find((t) => t.id == id);
    matchingTask.name = name;
    matchingTask.description = description;
    matchingTask.assignedTo = assignedTo;
    matchingTask.dueDate = dueDate;
    matchingTask.status = status;
    matchingTask.style = (function (status) {
      if (status === "To Do!") {
        return "toDo";
      } else if (status === "Review") {
        return "review";
      } else if (status === "In Progress") {
        return "inProgress";
      } else {
        return "done";
      }
    })(status);

    //check if the status has changed
  }

  render() {
    let tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      //the task html function calls createTaskHtml()

      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status,
        task.style
      );

      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }
  save() {
    let tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    let currentId = JSON.stringify(this.currentId);
    localStorage.setItem("currentId", currentId);
  }

  load() {
    if (localStorage.getItem("tasks")) {
      let tasksJson = localStorage.getItem("tasks");
      this.tasks = JSON.parse(tasksJson);
    }
    if (localStorage.getItem("currentId")) {
      let currentId = localStorage.getItem("currentId");
      this.currentId = JSON.parse(currentId);
    }
  }

  deleteTask(taskId) {
    let newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

  prog () {
    let totalTasks=0;
    let doneTasks=0;
     for(let i=0;i<this.tasks.length;i++){
        totalTasks+=1;
      const task = this.tasks[i];
      if (task.status === "Done!") {
          doneTasks+=1; }
      }
    let percent = Math.round(doneTasks*100 / totalTasks);
    
    document.querySelector("#progressbar").innerHTML = `Done by ${percent} %`;
    document.getElementById("progressbar").setAttribute("style", `width:${percent}%`);
    console.log(totalTasks, doneTasks, percent) ;
   
}
}