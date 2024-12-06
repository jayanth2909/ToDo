import { TodoList } from './todoList.js';
import { DateTimeUtils } from './dateTimeUtils.js';

const todoList = new TodoList();

// DOM Elements
const todoInput = document.getElementById('todoInput');
const dateTimeInput = document.getElementById('dateTimeInput');
const addButton = document.getElementById('addButton');
const filterButtons = document.querySelectorAll('.filter-btn');

// Set min datetime to now
dateTimeInput.min = DateTimeUtils.formatDateTimeLocal(new Date());

// Event Listeners
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        setActiveFilter(button);
        todoList.filterTodos(filter);
    });
});

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function addTodo() {
    const text = todoInput.value.trim();
    const dateTime = dateTimeInput.value;
    let isValid = true;

    if (!text) {
        showError(todoInput, "Task name cannot be empty.");
        isValid = false;
    } else {
        hideError(todoInput);
    }

    const parsedDate = new Date(dateTime);
    if (!dateTime || isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
        showError(dateTimeInput, "Please select a valid future date and time.");
        isValid = false;
    } else {
        hideError(dateTimeInput);
    }

    if (!isValid) return;

    todoList.addTodo(text, parsedDate);
    todoInput.value = '';
    dateTimeInput.value = '';
}

function setActiveFilter(activeButton) {
    filterButtons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Initialize the app
todoList.initialize();
