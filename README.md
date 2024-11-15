# Task Manager

A Task Manager web application that allows users to organize, prioritize, and track their tasks efficiently. Built with React, this app features a user-friendly interface, enabling users to add, edit, delete, and filter tasks to boost productivity.

## Table of Contents
- [Features](#features)
<!--- [Screenshots](#screenshots)-->
- [Installation](#Installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Task Creation**: Add new tasks with priority levels and due dates.
- **Task Management**: Edit or delete existing tasks.
- **Task Filters**: Filter tasks based on priority, due dates, or status.
- **Mark Completion**: Mark tasks as complete and keep track of progress.
- **Responsive Design**: Optimized for both desktop and mobile screens.
- **Local Storage Support**: Saves tasks in the browser's local storage for persistent data.

<!--## Screenshots-->

<!--![Task List Screenshot](./screenshots/task-list.png)-->
<!--![Add Task Screenshot](./screenshots/add-task.png)-->

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/task-manager.git


2. Install Dependencies:

    ```bash
    npm install
3. Run the Development Server:

    ```bash
    npm run dev


Open the app in your browser at http://localhost:5173.

## Build for Production
To create an optimized production build:

```bash
npm run build
```
## Preview Production Build
Preview the production build locally:

```bash
npm run preview
```

## Project Structure
```bash
src/
├── components/
│   ├── AppHeader.jsx       # Header component with search functionality
│   ├── TaskForm.jsx        # Component for adding new tasks
│   ├── TaskList.jsx        # Displays a list of tasks
│   ├── EditTask.jsx        # Task editing form
│   └── Filter.jsx          # Task filtering options
├── pages/
│   └── Dashboard.jsx       # Main dashboard view
├── styles/                 # Styling files
└── main.jsx                # Application entry point
```

## Features in Detail
 - **Dashboard**
    - **Sections:** Tasks are categorized into Today, Upcoming, Overdue, and Completed.
    - **Filters:** Filter tasks by priority (e.g., High, Medium, Low).
    - **Search:** Find tasks by title using a search bar.
Tasks
    - **Add Task:** Create a new task with a title, description, due date, and priority.
    - **Edit Task:** Update existing tasks.
    - **Delete Task:** Permanently remove a task.
    - **Mark Completion:** Toggle tasks between complete and incomplete.
## Contributing
Contributions are welcome! To contribute:

    Fork the repository.
    Create a feature branch: git checkout -b feature-name.
    Commit your changes: git commit -m "Description of changes".
    Push to your branch: git push origin feature-name.
    Submit a pull request for review.
## License
This project is licensed under the [MIT License](https://www.google.com). See the LICENSE file for details.