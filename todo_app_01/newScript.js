const todo = document.querySelector("#task");
const dueTime = document.querySelector("#f-time");
const addBtn = document.getElementById("add-todo");
const tableBody = document.querySelector("#table-body")
const searchBox = document.querySelector("#search");
const deleteAllBtn = document.querySelector("#delete-all-todo");

const addBtnDisplayValue = addBtn.value;
let editIndexNum = null;
let taskCreationRealTime;

formattedDateTime = (currentDate) => {

    // Get the current date and time components
    const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if needed
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
    const year = currentDate.getFullYear(); // Get the full year
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Get the hours and pad with leading zero if needed
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Get the minutes and pad with leading zero if needed

    // Construct the formatted date and time string
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDateTime;
}

const clearDataUtil = () => {
    todo.value = ""
    dueTime.value = ""
}

todoStorageArray = [];

retrieveLocalStorageTodoObjs = JSON.parse(localStorage.getItem("todos"));
if (retrieveLocalStorageTodoObjs != null) {
    todoStorageArray = retrieveLocalStorageTodoObjs;
}

const addNewTodoTask = (event) => {
    event.preventDefault();
    let currentTime = formattedDateTime(new Date());

    inputtedTaskObj = {
        task: todo.value,
        dueTime: dueTime.value,
        createdAt: currentTime
    }


    if (editIndexNum != null) {
        const updatedTaskObj = { ...inputtedTaskObj, createdAt: taskCreationRealTime }

        todoStorageArray.splice(editIndexNum, 1, updatedTaskObj);
        editIndexNum = null;
        addBtn.value = addBtnDisplayValue;
    }
    else
        todoStorageArray.push(inputtedTaskObj)

    clearDataUtil();
    localStorage.setItem("todos", JSON.stringify(todoStorageArray));
    displayAllTodoTask()
}

const displayAllTodoTask = () => {

    tableBody.innerHTML = ""
    todoStorageArray.forEach((todoElement, index) => {
        tableBody.innerHTML += `<tr>
                                <td class= "s-no">${index + 1}</td>
                                <td class="todo-value">${todoElement.task}</td>
                                <td>${todoElement.createdAt}</td>
                                <td class="todo-due-time">${todoElement.dueTime}</td>
                                <td><button class="edit-btn">Edit</button></td>
                                <td><button class="delete-btn">Delete</button></td>
                            </tr>`
    });

}

const editTodoTask = (e) => {
    let isConfirmed;
    if (e.target.innerHTML === "Edit")
        isConfirmed = confirm("Do you want to edit task?");

    if (isConfirmed) {
        let selectedRow = e.target.closest("tr");
        let indexNum = selectedRow.querySelector(".s-no").innerHTML - 1;
        // let task = selectedRow.querySelector(".todo-value").innerHTML;
        let task = todoStorageArray[indexNum].task;
        // let dueAt = selectedRow.querySelector(".todo-due-time").innerHTML;
        let dueAt = todoStorageArray[indexNum].dueTime;
        taskCreationRealTime = todoStorageArray[indexNum].createdAt;

        todo.value = task;
        dueTime.value = dueAt;

        editIndexNum = indexNum;
        addBtn.value = "Edit Todo"
    }
}

const deleteTodoTask = (e) => {
    if (e.target.innerHTML === "Delete") {
        let indexNum = e.target.closest("tr").querySelector(".s-no").innerHTML;
        const isConfirmed = confirm(`You are going to delete this task! Sno. ${indexNum}\nDo you want to delete this task?`);
        if (isConfirmed) {
            todoStorageArray.splice(indexNum - 1, 1);
            localStorage.setItem("todos", JSON.stringify(todoStorageArray));
            displayAllTodoTask()
        }
    }
}


addBtn.addEventListener("click", addNewTodoTask);
tableBody.addEventListener("click", editTodoTask);
tableBody.addEventListener("click", deleteTodoTask);
displayAllTodoTask();


// ================================== Search Feature ==================================

let allTr = tableBody.querySelectorAll("#table-body tr");

searchBox.addEventListener("input", () => {
    const searchValue = searchBox.value.toLowerCase();
    // console.log(searchValue);
    tableBody.innerHTML = "";
    allTr.forEach(tr => {
        let todoValue = tr.querySelector(".todo-value").innerHTML.toLowerCase();
        console.log(todoValue);
        const isFound = todoValue.indexOf(searchBox.value);
        if(isFound >= 0) {
            tableBody.appendChild(tr);
        }
    });
})

// ============= delete all todos ================

deleteAllBtn.addEventListener("click", () => {
    const isConfirmed = confirm("Do you really want to delete all the todos ?");
    if (isConfirmed) {
        localStorage.removeItem("todos");
        todoStorageArray = [];
        displayAllTodoTask();
    }
})