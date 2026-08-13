# SkillBoard

SkillBoard is a simple JavaScript task board created to track preparation for a JavaScript Developer internship.

The application helps organize learning tasks by category, priority, status, and due date. It also saves tasks in the browser, so the data is not lost after reloading the page.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Change task status
- Search tasks by title
- Filter tasks by category
- Filter tasks by priority
- Clear all filters
- Show task statistics
- Save tasks in Local Storage
- Reset board to default tasks
- Highlight tasks with close or overdue due dates
- Responsive layout for desktop and mobile screens

## Technologies

- HTML5
- CSS3
- JavaScript
- Local Storage
- Git

## Project idea

The main idea of this project is to create a small study board for preparing for an internship or junior developer position.

The default tasks are focused on:

- JavaScript theory
- Algorithms
- English preparation
- Building a personal project

## Project structure

```text
SkillBoard
│
├── css
│   └── style.css
│
├── js
│   └── app.js
│
├── assets
│
├── index.html
└── README.md
```

## How to run the project

1. Clone this repository.

```bash
git clone repository-link
```

2. Open the project folder.

3. Open `index.html` in a browser.

You can also use the Live Server extension in Visual Studio Code.

## Main functionality

### Add task

The user can create a new task with:

- title
- description
- category
- priority
- due date

### Edit task

Each task can be edited through the same form that is used for creating a task.

### Delete task

Each task has a delete button. Before deleting, the browser asks for confirmation.

### Status change

Each task can be moved between:

- To Learn
- In Progress
- Done

### Filters

The board supports filtering by:

- search text
- category
- priority

### Local Storage

All tasks are saved in Local Storage, so the data stays available after page reload.

### Due date highlight

Tasks can be highlighted depending on the due date:

- overdue tasks
- tasks that are due soon
- completed tasks

## What I practiced in this project

- DOM manipulation
- Event listeners
- Working with forms
- Arrays and objects
- `map()`
- `filter()`
- `find()`
- Local Storage
- Basic data validation
- Responsive CSS
- Git commits

## Future improvements

Possible improvements for the next version:

- Drag and drop between columns
- Dark mode
- Better date formatting
- Task sorting
- TypeScript version
- React version
- Node.js backend