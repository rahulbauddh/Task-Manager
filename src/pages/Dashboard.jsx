import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import EditTask from "./EditTask";
import Filter from "./Filter";
import "./styles.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("today");
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);

  const [filters, setFilters] = useState({
    today: "all",
    upcoming: "all",
    overdue: "all",
    completed: "all",
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setIsTaskFormVisible(false);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskBeingEdited(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const setSectionFilter = (filterValue) => {
    setFilters({ ...filters, [activeSection]: filterValue });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="dashboard">
        <div className="sidebar">
          <h2>Sections</h2>
          <ul>
            {["today", "upcoming", "overdue", "completed"].map((section) => (
              <li key={section}>
                <button onClick={() => handleSectionChange(section)}>
                  {section.charAt(0).toUpperCase() + section.slice(1)} Tasks
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsTaskFormVisible(true)}>Add Task</button>
        </div>

        <div className="task-content">
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

      {isTaskFormVisible && (
        <TaskForm
          addTask={addTask}
          onCancel={() => setIsTaskFormVisible(false)}
        />
      )}

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
