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

        li.addEventListener("dragstart", onDragStart);
        li.addEventListener("dragover", onDragOver);
        li.addEventListener("drop", onDrop);
        li.addEventListener("dragend", onDragEnd);
    });
}

let draggedIndex = null;

function onDragStart(e) {
    draggedIndex = Number(e.target.dataset.index);
    e.target.classList.add("dragging");
    setTimeout(() => {
        e.target.style.display = "none";
    }, 0);
}

function onDragOver(e) {
    e.preventDefault();
    const target = e.target.closest("li");
    if (target && target.dataset.index !== undefined) {
        target.classList.add("drag-over");
    }
}

function onDrop(e) {
    e.preventDefault();
    const target = e.target.closest("li");
    if (target && target.dataset.index !== undefined) {
        const targetIndex = Number(target.dataset.index);

        const draggedTask = todoList.splice(draggedIndex, 1)[0];
        todoList.splice(targetIndex, 0, draggedTask);

        renderTasks();
    }
}

function onDragEnd(e) {
    e.target.style.display = "flex";
    e.target.classList.remove("dragging");

    document.querySelectorAll(".drag-over").forEach(item => item.classList.remove("drag-over"));
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
