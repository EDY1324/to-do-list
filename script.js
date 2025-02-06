let todoList = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task) {
    todoList.push(task);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = ''; 

  todoList.forEach((task, index) => {
    const li = document.createElement("li");

    li.draggable = true;
    li.dataset.index = index;

    const taskNumber = document.createElement("span");
    taskNumber.innerText = `${index + 1}. `;

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = task;
    taskInput.disabled = true;
    taskInput.addEventListener("change", () => updateTask(index, taskInput.value));

    const editButton = document.createElement("button");
    editButton.innerText = "✏️";
    editButton.onclick = () => enableEditing(index, taskInput);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.onclick = () => deleteTask(index);

    li.appendChild(taskNumber);
    li.appendChild(taskInput);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskListElement.appendChild(li);

    li.addEventListener("dragstart", (e) => onDragStart(e));
    li.addEventListener("dragover", (e) => onDragOver(e));
    li.addEventListener("drop", (e) => onDrop(e));
    li.addEventListener("dragend", (e) => onDragEnd(e));
  });
}

let draggedIndex = null;

function onDragStart(e) {
  draggedIndex = e.target.dataset.index;
  e.target.classList.add("dragging");
}

function onDragOver(e) {
  e.preventDefault();
  const target = e.target;
  if (target && target !== e.target && target.nodeName === "LI") {
    target.classList.add("drag-over");
  }
}

function onDrop(e) {
  e.preventDefault();
  const target = e.target;
  if (target && target.nodeName === "LI") {
    const draggedTask = todoList[draggedIndex];
    const targetIndex = target.dataset.index;

    todoList.splice(draggedIndex, 1);
    todoList.splice(targetIndex, 0, draggedTask);

    renderTasks();
  }
}

function onDragEnd(e) {
  const draggedItem = e.target;
  draggedItem.classList.remove("dragging");
  const items = document.querySelectorAll("li");
  items.forEach(item => item.classList.remove("drag-over"));
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
}