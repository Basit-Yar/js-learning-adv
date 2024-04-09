const todo = document.querySelector("#task");
const finishedTime = document.querySelector("#f-time")
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


dataStorageArray = [];
toEditTodoEventTarget = null;

addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    todoValue = todo.value;
    todo.value = "";
    currentNow = formattedDateTime(new Date());
    finishedTimeValue = finishedTime.value;
    finishedTime.value = "";

    elem = `<tr>
                <td>S.no</td>
                <td class="todo-value">${todoValue}</td>
                <td>${currentNow}</td>
                <td class="todo-due-time">${finishedTimeValue}</td>
                <td><button class="edit-btn">Edit</button></td>
                <td><button class="delete-btn">Delete</button></td>
            </tr>`

    if (addBtn.value === "Edit") {
        updatedTodoValue = todoValue;
        console.log(updatedTodoValue)
        toEditTodoEventTarget.closest("tr").querySelector(".todo-value").innerHTML = updatedTodoValue;
        
        addBtn.value = "Add Todo"
    }

    dataStorageArray.push(elem);
    // console.log(dataStorageArray)

    tableBody.innerHTML = "";
    for (i = 0; i < dataStorageArray.length; i++) {
        tableBody.innerHTML += dataStorageArray[i]
    }
})

tableBody.addEventListener("click", (event) => {
    // console.log(event.target.parentElement.parentElement)
    if (event.target.innerHTML === "Delete") {
        let isRemove = confirm("Do you want to delete this to-do task!")
        if (isRemove) {

            event.target.parentElement.parentElement.remove()
        }
        // console.log("Yes this is delete btn now you can delete")
    }

    if (event.target.innerHTML === "Edit") {
        const closestTableRow = event.target.closest("tr")
        toEditToDoValue = closestTableRow.querySelector(".todo-value").innerHTML;
        toEditDueTime = closestTableRow.querySelector(".todo-due-time").innerHTML
        // isConfirmed = confirm("Do you want to see the data!");
        // if (isConfirmed) {

        // }
        addBtn.value = "Edit";
        todo.value = toEditToDoValue;
        finishedTime.value = toEditDueTime;

        toEditTodoEventTarget = event.target;
        console.log(`ToDo : ${toEditToDoValue} and its due time is : ${toEditDueTime}`)

    }
})

