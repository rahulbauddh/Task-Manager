import { useState, useEffect } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import EditTask from "../components/EditTask.jsx";
import Filter from "./Filter.jsx";
import "../components/styles.css";
import SearchList from "./searchList.jsx";
import AppHeader from "../components/AppHeader.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("all");
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
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
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

  const getTasksBySection = (section) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sections = {
      all: tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)), // Sort all tasks by dueDate
      upcoming: tasks.filter(
        (task) => !task.completed && new Date(task.dueDate) > today
      ),
      overdue: tasks.filter(
        (task) => !task.completed && new Date(task.dueDate) < today
      ),
      completed: tasks.filter((task) => task.completed),
    };

    return sections[section] || [];
  };

  const filteredTasks = () => {
    const filter = filters[activeSection];
    return getTasksBySection(activeSection).filter((task) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <AppHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="dashboard">
        <div className="sidebar">
          <h2>Sections</h2>
          <ul>
            {["all", "upcoming", "overdue", "completed"].map((section) => (
              <li key={section}>
                <button onClick={() => handleSectionChange(section)}>
                  {section.charAt(0).toUpperCase() + section.slice(1)} Tasks
                </button>
              </li>
            ))}
          </ul>
          <button
            className="nav-add-task"
            onClick={() => setIsTaskFormVisible(true)}
          >
            Add Task
          </button>
        </div>

        <div className="task-content">
          {isTaskFormVisible && (
            <div className="task-form-popup">
              <TaskForm
                addTask={addTask}
                onCancel={() => setIsTaskFormVisible(false)}
              />
            </div>
          )}

          <section>
            {searchTerm ? (
              <SearchList
                s_title={searchTerm}
                tasks={filteredTasks()}
                deleteTask={deleteTask}
                toggleTaskCompletion={toggleTaskCompletion}
                onEdit={(task) => setTaskBeingEdited(task)}
              />
            ) : (
              <>
                <div className="section-header">
                  <h2>
                    {activeSection.charAt(0).toUpperCase() +
                      activeSection.slice(1)}{" "}
                    Tasks
                  </h2>
                  <Filter
                    filter={filters[activeSection]}
                    setFilter={setSectionFilter}
                    section={activeSection}
                  />
                </div>

                <TaskList
                  tasks={filteredTasks()}
                  deleteTask={deleteTask}
                  toggleTaskCompletion={toggleTaskCompletion}
                  onEdit={(task) => setTaskBeingEdited(task)}
                />
              </>
            )}
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

      <div className="back-to-top">
        <button onClick={scrollToTop}>Back to Top</button>
      </div>
    </div>
  );
};

export default Dashboard;
