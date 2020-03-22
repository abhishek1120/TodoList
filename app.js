// define ui vars
// localStorage.clear();
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners

loadEventListeners();

// creating loadEventListeners

function loadEventListeners() {
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter task event
    filter.addEventListener('keyup', filterTasks);
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

}

// function getTasks
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // create li elements
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text-node and append to the li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a')
        // add a class 
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = `<i class="fas fa-minus-circle red-text"></i>`;
        // append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    })
}

// add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    else {
        // create li elements
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text-node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link element
        const link = document.createElement('a')
        // add a class 
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = `<i class="fas fa-minus-circle red-text"></i>`;
        // append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
        // store in localStorage
        storeTaskInLocalStorage(taskInput.value);
        // clear the input
        taskInput.value = '';
    }
    e.preventDefault();
}

// store task in localStorage

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target);
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            // remove task from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    // console.log(taskItem);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear task button function
function clearTasks(e) {
    // first way of doing this (not faster)
    // taskList.innerHTML = '';

    // faster way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from local storage
    clearTasksFromLocalStorage();
    e.preventDefault();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter tasks event

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    // queryselector uses a nodelist so can be used with foreach loops while getelementby dash dash returns a htmlcollection which we have to convert further to an array to perform the foreach method

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    })
    e.preventDefault();
}

