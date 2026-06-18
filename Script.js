let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let priority = document.getElementById("priority").value;

    tasks.push({
        text: task,
        completed: false,
        priority: priority
    });


    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

function toggleCheckbox(index) {
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}


function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
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
        let color = "";

        if (task.priority === "High") {
            color = "green";
        }
        else if (task.priority === "Medium") {
            color = "orange";
        }
        else {
            color = "red";
        }

        taskList.innerHTML += `
            <li class="task">
                <span class="task-text">${task.text}</span>
 
                <span class="status">
    ${task.completed ? "Task Complete" : "Task Not Complete"}
</span>
<span
style="
background:${color};
color:white;
padding:5px 12px;
border-radius:20px;
font-size:13px;
margin-left:10px;
">
${task.priority}
</span>   
                <div class="actions">
                <input
                  type="checkbox"
                  class="task-checkbox"
                  ${task.completed ? "checked" : ""}
                  onchange="toggleCheckbox(${index})"
                 />
                 
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