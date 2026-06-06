let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index]);

    if (newText !== null && newText.trim() !== "") {
        tasks[index] = newText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
function displayTasks() {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <li class="task">
                <span class="task-text">${task}</span>

                <div class="actions">
                    <button class="edit" onclick="editTask(${index})">
                        Edit
                    </button>

                    <button class="delete" onclick="deleteTask(${index})">
                        Delete
                    </button>
                </div>
            </li>
        `;
    });
}