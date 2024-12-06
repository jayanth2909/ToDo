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

function addTodo() {
    const text = todoInput.value.trim();
    const dateTime = dateTimeInput.value;

    if (text && dateTime) {
        todoList.addTodo(text, new Date(dateTime));
        todoInput.value = '';
        dateTimeInput.value = '';
    }
}

function setActiveFilter(activeButton) {
    filterButtons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Initialize the app
todoList.initialize();