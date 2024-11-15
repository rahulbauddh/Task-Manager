import PropTypes from "prop-types";
import "../components/TaskList.css";

const SearchList = ({
  s_title,
  tasks,
  deleteTask,
  toggleTaskCompletion,
  onEdit,
}) => {
  return (
    <div className="task-list">
      {tasks
        .filter(
          (task) => task.title.toLowerCase().includes(s_title.toLowerCase())
          // task.title.toLowerCase() === s_title.toLowerCase()
        )
        .map((task) => (
          <div key={task.id} className={`task-item`}>
            {/* Tag for Complete/Incomplete status */}
            <span
              className={`status-tag ${
                task.completed ? "complete" : "incomplete"
              }`}
            >
              {task.completed ? "Complete" : "Incomplete"}
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
        ))}
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
