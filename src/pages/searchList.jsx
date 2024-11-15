import PropTypes from "prop-types";
import "../components/TaskList.css";

const SearchList = ({
  s_title,
  tasks,
  deleteTask,
  toggleTaskCompletion,
  onEdit,
}) => {
  // Filter tasks based on search term across all tasks
  const filteredTasks = tasks.filter(
    (task) => task.title.toLowerCase().includes(s_title.toLowerCase())
    // console.log("");
  );

  return (
    <div className="task-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            {/* Tag for Complete/Incomplete status */}
            <span
              className={`status-tag ${
                task.completed ? "complete" : "incomplete"
              }`}
            >
              {task.completed ? "Completed" : "Incomplete"}
            </span>

            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>

            <div className="task-divider"></div>

            <div className="task-actions">
              <button className="edit-btn" onClick={() => onEdit(task)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
              <button
                className="toggle-btn"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>
          No tasks found matching &quot;{s_title}&quot; in current section,
          iterate through other sections
        </p>
      )}
    </div>
  );
};

SearchList.propTypes = {
  s_title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};

export default SearchList;
