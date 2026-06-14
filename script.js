const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCount() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  taskCount.textContent = `${done}/${total} выполнено`;
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    li.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} data-index="${index}"/>
      <span>${task.text}</span>
      <button class="delete" data-index="${index}">✕</button>
    `;

    taskList.appendChild(li);
  });
  updateCount();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

taskList.addEventListener('click', (e) => {
  const index = e.target.dataset.index;
  if (e.target.type === 'checkbox') {
    tasks[index].done = e.target.checked;
    saveTasks();
    renderTasks();
  }
  if (e.target.classList.contains('delete')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
});

clearBtn.addEventListener('click', () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

renderTasks();
