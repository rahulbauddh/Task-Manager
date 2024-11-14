import Task from "./Task";
import PropTypes from "prop-types";

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

// Define prop types for TaskList
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Ensure each task has a numeric ID
      title: PropTypes.string.isRequired, // Example of other required properties
      description: PropTypes.string,
      dueDate: PropTypes.string,
      priority: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
