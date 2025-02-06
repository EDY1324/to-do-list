let todoList = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  
  if (task) {
    todoList.push(task);
    taskInput.value = '';
    renderTasks();
  }
}

function renderTasks() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = ''; 

  todoList.forEach((task, index) => {
    const li = document.createElement("li");

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = task;
    taskInput.disabled = true;
    taskInput.addEventListener("change", () => updateTask(index, taskInput.value));
    
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => enableEditing(index, taskInput);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    li.appendChild(taskInput);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskListElement.appendChild(li);
  });
}

function enableEditing(index, taskInput) {
  taskInput.disabled = false;
  taskInput.focus();
}

function updateTask(index, updatedTask) {
  if (updatedTask.trim()) {
    todoList[index] = updatedTask;
    renderTasks();
  }
}

function deleteTask(index) {
  todoList.splice(index, 1);
  renderTasks();
}
