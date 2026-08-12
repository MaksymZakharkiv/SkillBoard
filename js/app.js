const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");

const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskCategoryInput = document.getElementById("taskCategory");
const taskPriorityInput = document.getElementById("taskPriority");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priorityFilter = document.getElementById("priorityFilter");

const todoList = document.getElementById("todoList");
const progressList = document.getElementById("progressList");
const doneList = document.getElementById("doneList");

const totalTasks = document.getElementById("totalTasks");
const progressTasks = document.getElementById("progressTasks");
const doneTasks = document.getElementById("doneTasks");

const defaultTasks = [
  {
    id: 1,
    title: "Repeat array methods",
    description: "Practice map, filter, reduce and find with small examples.",
    category: "javascript",
    priority: "high",
    status: "todo",
  },
  {
    id: 2,
    title: "Solve simple algorithm tasks",
    description: "Focus on loops, conditions and working with arrays.",
    category: "algorithms",
    priority: "medium",
    status: "todo",
  },
  {
    id: 3,
    title: "Build SkillBoard layout",
    description: "Create a clean dashboard for internship preparation.",
    category: "project",
    priority: "high",
    status: "progress",
  },
  {
    id: 4,
    title: "Prepare short self-introduction",
    description: "Write a simple B1-level introduction for an interview.",
    category: "english",
    priority: "low",
    status: "done",
  },
];

let tasks = loadTasks();

function openModal() {
  taskModal.classList.remove("hidden");
}

function closeModal() {
  taskModal.classList.add("hidden");
  taskForm.reset();
}

function capitalizeText(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function saveTasks() {
  localStorage.setItem("skillboardTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("skillboardTasks");

  if (savedTasks === null) {
    return defaultTasks;
  }

  return JSON.parse(savedTasks);
}

function getTaskListByStatus(status) {
  if (status === "todo") {
    return todoList;
  }

  if (status === "progress") {
    return progressList;
  }

  if (status === "done") {
    return doneList;
  }
}

function getFilteredTasks() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  const selectedPriority = priorityFilter.value;

  let filteredTasks = tasks;

  if (searchText !== "") {
    filteredTasks = filteredTasks.filter(function (task) {
      return task.title.toLowerCase().includes(searchText);
    });
  }

  if (selectedCategory !== "all") {
    filteredTasks = filteredTasks.filter(function (task) {
      return task.category === selectedCategory;
    });
  }

  if (selectedPriority !== "all") {
    filteredTasks = filteredTasks.filter(function (task) {
      return task.priority === selectedPriority;
    });
  }

  return filteredTasks;
}

function updateStatistics() {
  const inProgressCount = tasks.filter(function (task) {
    return task.status === "progress";
  }).length;

  const doneCount = tasks.filter(function (task) {
    return task.status === "done";
  }).length;

  totalTasks.textContent = tasks.length;
  progressTasks.textContent = inProgressCount;
  doneTasks.textContent = doneCount;
}

function createEmptyMessage(text) {
  const emptyMessage = document.createElement("div");

  emptyMessage.classList.add("empty-message");
  emptyMessage.textContent = text;

  return emptyMessage;
}

function showEmptyMessages() {
  if (todoList.children.length === 0) {
    todoList.appendChild(createEmptyMessage("No tasks to learn yet."));
  }

  if (progressList.children.length === 0) {
    progressList.appendChild(createEmptyMessage("No tasks in progress."));
  }

  if (doneList.children.length === 0) {
    doneList.appendChild(createEmptyMessage("No completed tasks yet."));
  }
}

function deleteTask(taskId) {
  const confirmDelete = confirm("Delete this task?");

  if (confirmDelete === false) {
    return;
  }

  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  saveTasks();
  renderTasks();
}

function changeTaskStatus(taskId, newStatus) {
  tasks = tasks.map(function (task) {
    if (task.id === taskId) {
      task.status = newStatus;
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function createStatusSelect(task) {
  const statusSelect = document.createElement("select");

  statusSelect.classList.add("status-select");

  const todoOption = document.createElement("option");
  todoOption.value = "todo";
  todoOption.textContent = "To Learn";

  const progressOption = document.createElement("option");
  progressOption.value = "progress";
  progressOption.textContent = "In Progress";

  const doneOption = document.createElement("option");
  doneOption.value = "done";
  doneOption.textContent = "Done";

  statusSelect.appendChild(todoOption);
  statusSelect.appendChild(progressOption);
  statusSelect.appendChild(doneOption);

  statusSelect.value = task.status;

  statusSelect.addEventListener("change", function () {
    changeTaskStatus(task.id, statusSelect.value);
  });

  return statusSelect;
}

function createTaskCard(task) {
  const taskCard = document.createElement("article");
  taskCard.classList.add("task-card");

  if (task.status === "done") {
    taskCard.classList.add("done");
  }

  const taskTop = document.createElement("div");
  taskTop.classList.add("task-top");

  const categoryTag = document.createElement("span");
  categoryTag.classList.add("tag", task.category);
  categoryTag.textContent = capitalizeText(task.category);

  const priorityTag = document.createElement("span");
  priorityTag.classList.add("priority", task.priority);
  priorityTag.textContent = capitalizeText(task.priority);

  const taskTitle = document.createElement("h3");
  taskTitle.textContent = task.title;

  const taskDescription = document.createElement("p");
  taskDescription.textContent = task.description;

  const taskActions = document.createElement("div");
  taskActions.classList.add("task-actions");

  const statusSelect = createStatusSelect(task);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    deleteTask(task.id);
  });

  taskTop.appendChild(categoryTag);
  taskTop.appendChild(priorityTag);

  taskActions.appendChild(statusSelect);
  taskActions.appendChild(deleteButton);

  taskCard.appendChild(taskTop);
  taskCard.appendChild(taskTitle);
  taskCard.appendChild(taskDescription);
  taskCard.appendChild(taskActions);

  return taskCard;
}

function renderTasks() {
  todoList.innerHTML = "";
  progressList.innerHTML = "";
  doneList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  filteredTasks.forEach(function (task) {
    const taskCard = createTaskCard(task);
    const taskList = getTaskListByStatus(task.status);

    taskList.appendChild(taskCard);
  });

  showEmptyMessages();
  updateStatistics();
}

addTaskBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);

taskModal.addEventListener("click", function (event) {
  if (event.target === taskModal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

searchInput.addEventListener("input", function () {
  renderTasks();
});

categoryFilter.addEventListener("change", function () {
  renderTasks();
});

priorityFilter.addEventListener("change", function () {
  renderTasks();
});

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const category = taskCategoryInput.value;
  const priority = taskPriorityInput.value;

  if (title === "") {
    alert("Please enter task title");
    return;
  }

  const newTask = {
    id: Date.now(),
    title: title,
    description: description || "No description added.",
    category: category,
    priority: priority,
    status: "todo",
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();
  closeModal();
});

renderTasks();
