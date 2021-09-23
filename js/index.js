const form = document.querySelector("#new-task-form");
const reset = document.querySelector("#reset");


function validation() {
    //grabbing variables
    let taskName = document.getElementById("taskName");
    let textArea = document.getElementById("floatingTextarea");
    let assignedTo = document.getElementById("assignedTo");
    let status = document.getElementById("status");
    let dueDate = document.getElementById("duedate");
    
    let tnError = document.getElementById("tnError");
    let taError = document.getElementById("taError");
    let astError = document.getElementById("astError");
    let sError = document.getElementById("sError");
    let ddError = document.getElementById("ddError");
    let errorNum =0;

    //Validation form for Task name
    if (taskName.value.length > 5){
        tnError.innerHTML = '';
        
       
    } else if (taskName.value.length <= 5){
        tnError.innerHTML = 'Task name must be more than 5 characters';
        errorNum++;
    }
    //Validation for text area
    if (textArea.value.length > 5){
        taError.innerHTML = '';
      
    } else if (textArea.value.length <= 5){
        taError.innerHTML = 'Task name must be more than 5 characters';
        errorNum++;
    }
     //Validation for assigned to
    if (assignedTo.value.length > 5){
        astError.innerHTML = '';
        
    } else if (assignedTo.value.length <= 5) {
        astError.innerHTML = 'Task name must be more than 5 characters';
        errorNum++;
    }
    //validation form for status and dueDate
    if (status.value){
        sError.innerHTML = '';
        
    } else if (!status.value){
        sError.innerHTML = "Status must have a value";
        errorNum++;
    }

    //validation form for dueDate
    if (dueDate.value){
        ddError.innerHTML = ''
       
    } else if (!dueDate.value){
        ddError.innerHTML = "Date must be selected"
        errorNum++;
    }


    if (errorNum = 0){
        return true;
    } return false;

    
}

function resetForm(){
    let taskName = document.getElementById("taskName");
    let textArea = document.getElementById("floatingTextarea");
    let assignedTo = document.getElementById("assignedTo");
    let status = document.getElementById("status");
    let dueDate = document.getElementById("duedate");


    taskName.value = '';
    textArea.value = '';
    assignedTo.value = '';
    status.value = '';
    dueDate.value = '';
}


//calling events
form.addEventListener("click", validation);
reset.addEventListener("click",resetForm)








