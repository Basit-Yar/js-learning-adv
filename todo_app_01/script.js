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

addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    todoValue = todo.value
    currentNow = formattedDateTime(new Date());
    todoValue = todo.value;
    finishedTimeValue = finishedTime.value;

    elem = `<tr>
                <td>S.no</td>
                <td>${todoValue}</td>
                <td>${currentNow}</td>
                <td>${finishedTimeValue}</td>
                <td><button class="edit-btn">Edit</button></td>
                <td><button class="delete-btn">Delete</button></td>
            </tr>`

    dataStorageArray.push(elem);
    // console.log(dataStorageArray)

    tableBody.innerHTML = "";
    for(i=0; i<dataStorageArray.length; i++){
        tableBody.innerHTML += dataStorageArray[i]
    }
})
// const deleteBtn = document.querySelector(".delete-btn")
tableBody.addEventListener("click", (event) => {
    console.log(event.target.parentElement.parentElement)
    if(event.target.innerHTML === "Delete"){
        let isRemove = confirm("Do you want to delete this to-do task!")
        if(isRemove){

            event.target.parentElement.parentElement.remove()
        }
        // console.log("Yes this is delete btn now you can delete")
    }
})

