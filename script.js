let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  // وقتی صفحه لود شد، Event Listener برای Enter اضافه کن
  const taskInput = document.getElementById("taskInput");
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push(taskText);
    taskInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    // دکمه ویرایش
    const editButton = document.createElement("button");
    editButton.textContent = "ویرایش";
    editButton.className = "edit-btn";
    editButton.onclick = () => editTask(index);

    // دکمه حذف
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = () => deleteTask(index);

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function editTask(index) {
  const newTask = prompt("متن جدید کار را وارد کنید:", tasks[index]);
  if (newTask && newTask.trim() !== "") {
    tasks[index] = newTask.trim();
    displayTasks();
  }
}
