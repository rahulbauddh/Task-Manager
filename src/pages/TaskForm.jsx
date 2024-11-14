import { useState } from "react";
import PropTypes from "prop-types";
import "./TaskForm.css";

const TaskForm = ({ addTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if title is empty
    if (!title) {
      setError("Task title is required.");
      return;
    }

    // Check if dueDate is empty
    if (!dueDate) {
      setError("Due date is required.");
      return;
    }

    // Clear error if all fields are valid
    setError("");

    const newTask = {
      id: Date.now(),
      title,
      description, // Description is allowed to be empty
      dueDate,
      priority,
      completed: false,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-popup">
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Task Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="form-input"
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-input"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          {/* Display error message */}
          {error && <div className="error-message">{error}</div>}{" "}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Task
            </button>
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired, // Function to add the task
  onCancel: PropTypes.func.isRequired, // Function to handle cancel action
};

export default TaskForm;
