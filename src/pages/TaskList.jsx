import PropTypes from "prop-types";
import "../components/TaskList.css";

const TaskList = ({ tasks, deleteTask, toggleTaskCompletion, onEdit }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>

          <div className="task-divider"></div>

          <div className="task-actions">
            <button className="edit-btn" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
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

// Define PropTypes for TaskList component
TaskList.propTypes = {
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

export default TaskList;
