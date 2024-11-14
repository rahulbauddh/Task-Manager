import PropTypes from "prop-types";

const TaskList = ({ tasks, deleteTask, toggleTaskCompletion, onEdit }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>

          {/* Corrected Edit button */}
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>

          {/* Toggle task completion */}
          <button onClick={() => toggleTaskCompletion(task.id)}>
            {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
          </button>
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
  onEdit: PropTypes.func.isRequired, // onEdit function prop
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};

export default TaskList;
