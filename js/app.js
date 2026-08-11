const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");

const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskCategoryInput = document.getElementById("taskCategory");
const taskPriorityInput = document.getElementById("taskPriority");

const todoList = document.getElementById("todoList");
const progressList = document.getElementById("progressList");
const doneList = document.getElementById("doneList");

let tasks = [
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

  taskTop.appendChild(categoryTag);
  taskTop.appendChild(priorityTag);

  taskCard.appendChild(taskTop);
  taskCard.appendChild(taskTitle);
  taskCard.appendChild(taskDescription);

  return taskCard;
}

function renderTasks() {
  todoList.innerHTML = "";
  progressList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach(function (task) {
    const taskCard = createTaskCard(task);
    const taskList = getTaskListByStatus(task.status);

    taskList.appendChild(taskCard);
  });
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

  renderTasks();
  closeModal();
});

renderTasks();
