// src/Task.js
import PropTypes from "prop-types";

const Task = ({ task, deleteTask }) => {
  return (
    <div className="task">
      <h3>
        {task.title} <small>({task.priority})</small>
      </h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

// Define prop types for Task component
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["high", "medium", "low"]).isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
