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

function createTaskCard(title, description, category, priority) {
  const taskCard = document.createElement("article");
  taskCard.classList.add("task-card");

  const taskTop = document.createElement("div");
  taskTop.classList.add("task-top");

  const categoryTag = document.createElement("span");
  categoryTag.classList.add("tag", category);
  categoryTag.textContent = capitalizeText(category);

  const priorityTag = document.createElement("span");
  priorityTag.classList.add("priority", priority);
  priorityTag.textContent = capitalizeText(priority);

  const taskTitle = document.createElement("h3");
  taskTitle.textContent = title;

  const taskDescription = document.createElement("p");
  taskDescription.textContent = description;

  taskTop.appendChild(categoryTag);
  taskTop.appendChild(priorityTag);

  taskCard.appendChild(taskTop);
  taskCard.appendChild(taskTitle);
  taskCard.appendChild(taskDescription);

  return taskCard;
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

  const newTask = createTaskCard(
    title,
    description || "No description added.",
    category,
    priority,
  );

  todoList.appendChild(newTask);

  closeModal();
});
