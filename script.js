document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
        taskInput.value = "";
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});


// script.js - To-Do List with Local Storage persistence
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper: read tasks from localStorage (returns array)
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Helper: save tasks array to localStorage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * addTask
     * If taskTextParam is provided (string) it uses that; otherwise it reads from the input.
     * If save === true it will push the new task to localStorage.
     */
    function addTask(taskTextParam, save = true) {
        // Get task text either from parameter or from the input field
        const taskText = (typeof taskTextParam === 'string') ? taskTextParam : taskInput.value.trim();

        // If empty, alert and exit
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove handler: remove from DOM and update localStorage
        removeBtn.onclick = function () {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Update localStorage: remove the first matching occurrence
            const storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                saveTasksToLocalStorage(storedTasks);
            }
        };

        // Append button to li, then li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input when adding from input (but not when loading from storage)
        if (taskTextParam === undefined) {
            taskInput.value = '';
        }

        // Save to localStorage if requested
        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(taskText);
            saveTasksToLocalStorage(storedTasks);
        }
    }

    // Load tasks from localStorage and render them (do not save them again while loading)
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(task => addTask(task, false));
    }

    // Attach event listeners
    addButton.addEventListener('click', function () {
        addTask(); // reads from input and saves
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize the app by loading saved tasks
    loadTasks();
});

       