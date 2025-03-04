let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    // نمایش تاریخ و ساعت فعلی هر ثانیه
    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString('fa-IR', {
            dateStyle: 'medium',
            timeStyle: 'medium'
        });
        document.getElementById('currentDateTime').textContent = dateTimeString;
    }
    updateDateTime(); // نمایش اولیه
    setInterval(updateDateTime, 1000); // به‌روزرسانی هر ثانیه

    // پشتیبانی از کلید Enter
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const timestamp = new Date().toLocaleString('fa-IR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
        tasks.push({ text: taskText, time: timestamp });
        taskInput.value = '';
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        const timestampSpan = document.createElement('span');
        timestampSpan.textContent = `- ${task.time}`; // حفظ تاریخ و ساعت
        timestampSpan.className = 'timestamp';

        // دکمه ویرایش
        const editButton = document.createElement('button');
        editButton.textContent = 'ویرایش';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editTask(index);

        // دکمه حذف
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(taskSpan);
        li.appendChild(timestampSpan);
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
    const currentTask = tasks[index].text;
    const newTask = prompt('متن جدید کار را وارد کنید:', currentTask);
    if (newTask && newTask.trim() !== '') {
        const timestamp = new Date().toLocaleString('fa-IR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
        tasks[index] = { text: newTask.trim(), time: timestamp };
        displayTasks();
    }
}

function saveTasksToFile() {
    // ایجاد محتوای متنی برای لیست تودو
    let textContent = 'لیست کارهای من:\n\n';
    tasks.forEach((task, index) => {
        textContent += `${index + 1}. ${task.text} - ${task.time}\n`;
    });

    // ذخیره به‌عنوان فایل متنی و دانلود
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}