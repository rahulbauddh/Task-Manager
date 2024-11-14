import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Filter from "./Filter";
import "./styles.css";

const Dashboard = () => {
  // Initialize tasks with a default sample task
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Sample Task",
      description: "This is a sample task description",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "medium",
      completed: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("today");

  // Separate filter states for each section
  const [upcomingFilter, setUpcomingFilter] = useState("all");
  const [overdueFilter, setOverdueFilter] = useState("all");
  const [completedFilter, setCompletedFilter] = useState("all");
  const [todayFilter, setTodayFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Set today's date to midnight (12:00 AM)
  const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  // Filter tasks by section
  const todayTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate).setHours(0, 0, 0, 0) === today.getTime() &&
      !task.completed
  );
  const upcomingTasks = tasks.filter(
    (task) => new Date(task.dueDate) > today && !task.completed
  );
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < today && !task.completed
  );
  const completedTasks = tasks.filter((task) => task.completed);

  // Apply section-specific filters
  const filteredTasks = (taskList, filter) =>
    taskList.filter(
      (task) =>
        (filter === "all" || task.priority === filter) &&
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Display tasks based on active section
  const getActiveTasks = () => {
    switch (activeSection) {
      case "today":
        return filteredTasks(todayTasks, todayFilter);
      case "upcoming":
        return filteredTasks(upcomingTasks, upcomingFilter);
      case "overdue":
        return filteredTasks(overdueTasks, overdueFilter);
      case "completed":
        return filteredTasks(completedTasks, completedFilter);
      default:
        return [];
    }
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
            <li>
              <button onClick={() => handleSectionChange("today")}>
                Today's Tasks
              </button>
            </li>
            <li>
              <button onClick={() => handleSectionChange("upcoming")}>
                Upcoming Tasks
              </button>
            </li>
            <li>
              <button onClick={() => handleSectionChange("overdue")}>
                Overdue Tasks
              </button>
            </li>
            <li>
              <button onClick={() => handleSectionChange("completed")}>
                Completed Tasks
              </button>
            </li>
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

            {/* Filter buttons for each section */}
            {activeSection !== "completed" && (
              <Filter
                filter={
                  activeSection === "upcoming"
                    ? upcomingFilter
                    : activeSection === "overdue"
                    ? overdueFilter
                    : todayFilter
                }
                setFilter={
                  activeSection === "upcoming"
                    ? setUpcomingFilter
                    : activeSection === "overdue"
                    ? setOverdueFilter
                    : setTodayFilter
                }
                section={activeSection}
              />
            )}

            <TaskList
              tasks={getActiveTasks()}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

// import { useState, useEffect } from "react";
// import TaskForm from "./TaskForm";
// import TaskList from "./TaskList";
// import Filter from "./Filter";
// import "./styles.css";

// const Dashboard = () => {
//   // Initialize tasks with a default sample task
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: "Sample Task",
//       description: "This is a sample task description",
//       dueDate: new Date().toISOString().split("T")[0],
//       priority: "medium",
//       completed: false,
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");

//   // Separate filter states for each section
//   const [upcomingFilter, setUpcomingFilter] = useState("all");
//   const [overdueFilter, setOverdueFilter] = useState("all");
//   const [completedFilter, setCompletedFilter] = useState("all");

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks"));
//     if (storedTasks) setTasks(storedTasks);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = (task) => {
//     setTasks([...tasks, { ...task, id: Date.now() }]);
//   };

//   const editTask = (updatedTask) => {
//     setTasks(
//       tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
//     );
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   // Set today's date to midnight (12:00 AM)
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   // Filter tasks by section
//   const upcomingTasks = tasks.filter(
//     (task) => new Date(task.dueDate) > today && !task.completed
//   );
//   const overdueTasks = tasks.filter(
//     (task) => new Date(task.dueDate) < today && !task.completed
//   );
//   const completedTasks = tasks.filter((task) => task.completed);

//   // Apply section-specific filters
//   const filteredTasks = (taskList, filter) =>
//     taskList.filter(
//       (task) =>
//         (filter === "all" || task.priority === filter) &&
//         task.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>Task Manager</h1>
//         <TaskForm addTask={addTask} />
//       </header>
//       <main className="task-sections">
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <section>
//           <h2>Upcoming Tasks</h2>
//           <Filter
//             filter={upcomingFilter}
//             setFilter={setUpcomingFilter}
//             section="upcoming"
//           />
//           <TaskList
//             tasks={filteredTasks(upcomingTasks, upcomingFilter)}
//             editTask={editTask}
//             deleteTask={deleteTask}
//           />
//         </section>
//         <section>
//           <h2>Overdue Tasks</h2>
//           <Filter
//             filter={overdueFilter}
//             setFilter={setOverdueFilter}
//             section="overdue"
//           />
//           <TaskList
//             tasks={filteredTasks(overdueTasks, overdueFilter)}
//             editTask={editTask}
//             deleteTask={deleteTask}
//           />
//         </section>
//         <section>
//           <h2>Completed Tasks</h2>
//           <Filter
//             filter={completedFilter}
//             setFilter={setCompletedFilter}
//             section="completed"
//           />
//           <TaskList
//             tasks={filteredTasks(completedTasks, completedFilter)}
//             editTask={editTask}
//             deleteTask={deleteTask}
//           />
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
