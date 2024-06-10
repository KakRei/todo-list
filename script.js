const inputField = document.querySelector(".input-field textarea"),
todoLists = document.querySelector(".todo-list"),
pendingNum = document.querySelector(".pending-num"),
clearButton = document.querySelector(".clear-button");

loadList();
function allTasks() {
    let tasks = document.querySelectorAll(".pending");
    pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

    let allLists = document.querySelectorAll(".list");
    if (allLists.length > 0) {
        todoLists.style.marginTop = "20px";
        clearButton.style.pointerEvents = "auto";
        return
    }
    clearButton.style.pointerEvents = "none";
    todoLists.style.marginTop = "0px";
}
inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim()

    if (e.key === "Enter" && inputVal.length > 0) {
        let liTag = `<li class="list pending" onclick="handleStatus(this)">
        <input type="checkbox" />
        <span class="task">${inputVal}</span>
        <i class="uil uil-trash" onclick="deleteTask(this)"></i>
    </li>`

    todoLists.insertAdjacentHTML("beforeend", liTag);
    inputField.value = "";
    };
    allTasks();
    saveList();
});

function handleStatus(e) {
    const checkbox = e.querySelector("input")
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("pending");
    allTasks();
}

clearButton.addEventListener("click", () => {
    todoLists.innerHTML = "";
    allTasks();
    saveList();
});

function deleteTask(e) {
    e.parentElement.remove();
    allTasks();
    saveList();
}

function saveList() {
    let tasks = document.querySelectorAll(".list");
    let tasksArr = [];
    tasks.forEach(task => {
        tasksArr.push(task.querySelector(".task").textContent);
    });
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
}

function loadList() {
    let tasksArr = JSON.parse(localStorage.getItem("tasksArr"));
    if (tasksArr) {
        tasksArr.forEach(task => {
            let liTag = `<li class="list pending" onclick="handleStatus(this)">
                <input type="checkbox" />
                <span class="task">${task}</span>
                <i class="uil uil-trash" onclick="deleteTask(this)"></i>
            </li>`;
            todoLists.insertAdjacentHTML("beforeend", liTag);
        });
        allTasks();
    }
}