const todo = document.querySelector("#task");
const dueTime = document.querySelector("#f-time")
const addBtn = document.getElementById("add-todo");
const tableBody = document.querySelector("#table-body")

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
        task : todo.value,
        dueTime : dueTime.value,
        createdAt : currentTime
    }
    clearDataUtil();

    todoStorageArray.push(inputtedTaskObj)
    localStorage.setItem("todos", JSON.stringify(todoStorageArray));
    displayAllTodoTask()
}

const displayAllTodoTask = () => {

    tableBody.innerHTML = ""
    todoStorageArray.forEach(todoElement => {
    tableBody.innerHTML +=  `<tr>
                                <td>S.no</td>
                                <td class="todo-value">${todoElement.task}</td>
                                <td>${todoElement.createdAt}</td>
                                <td class="todo-due-time">${todoElement.dueTime}</td>
                                <td><button class="edit-btn">Edit</button></td>
                                <td><button class="delete-btn">Delete</button></td>
                            </tr>`
});
    
}

const editTodoTask = () => {

}

const deleteTodoTask = () => {

}


addBtn.addEventListener("click", addNewTodoTask);
displayAllTodoTask()