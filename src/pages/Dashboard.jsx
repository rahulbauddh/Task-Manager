import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import EditTask from "./EditTask";
import Filter from "./Filter";
import "./styles.css";

const Dashboard = () => {
  // State for managing tasks, search term, active section, filters, and edit modal
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("today");
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  // Separate filters for each task section
  const [filters, setFilters] = useState({
    today: "all",
    upcoming: "all",
    overdue: "all",
    completed: "all",
  });

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  // Edit an existing task
  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskBeingEdited(null); // Close the edit modal after saving
  };

  // Delete a task by ID
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Date setup for filtering tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get filtered task lists for each section
  const getTasksBySection = () => {
    const sections = {
      today: tasks.filter(
        (task) =>
          new Date(task.dueDate).setHours(0, 0, 0, 0) === today.getTime() &&
          !task.completed
      ),
      upcoming: tasks.filter(
        (task) =>
          new Date(task.dueDate).setHours(0, 0, 0, 0) > today && !task.completed
      ),
      overdue: tasks.filter(
        (task) => new Date(task.dueDate) < today && !task.completed
      ),
      completed: tasks.filter((task) => task.completed),
    };
    return sections[activeSection] || [];
  };

  // Filter tasks by priority and search term
  const filteredTasks = () => {
    const sectionTasks = getTasksBySection();
    const filter = filters[activeSection];
    return sectionTasks.filter((task) => {
      const matchesFilter = filter === "all" || task.priority === filter;
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  // Update the active section and reset filters
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Update filters dynamically based on section
  const setSectionFilter = (filterValue) => {
    setFilters({ ...filters, [activeSection]: filterValue });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <TaskForm addTask={addTask} />
      </header>

      <main className="dashboard">
        <div className="sidebar">
          <h2>Sections</h2>
          <ul>
            {["today", "upcoming", "overdue", "completed"].map((section) => (
              <li key={section}>
                <button onClick={() => handleSectionChange(section)}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}'s Tasks
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="task-content">
          <div className="search">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <section>
            <h2>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
              Tasks
            </h2>
            <Filter
              filter={filters[activeSection]}
              setFilter={setSectionFilter}
              section={activeSection}
            />
            <TaskList
              tasks={filteredTasks()}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              onEdit={(task) => setTaskBeingEdited(task)}
            />
          </section>
        </div>
      </main>

      {taskBeingEdited && (
        <EditTask
          task={taskBeingEdited}
          onSave={editTask}
          onCancel={() => setTaskBeingEdited(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
