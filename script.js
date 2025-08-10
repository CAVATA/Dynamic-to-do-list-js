

/* script.js - To-Do List application logic */
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * addTask
     * Retrieves user input, validates it, creates a new list item with a Remove button,
     * appends it to the task list, and clears the input.
     */
    function addTask() {
        // Retrieve and trim the value from the input field
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user and do not add a task
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new <li> element and set its text content
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When the remove button is clicked, remove the corresponding li from the list
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the li, and the li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add click event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding a task by pressing the Enter key while input has focus
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded only if there is already text in the input (safe guard)
    if (taskInput.value.trim() !== '') {
        addTask();
    }
});


