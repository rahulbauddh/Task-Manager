## ANSWER TO TECHNICAL QUESTIONS

#### 1. How long did you spend on the coding test?

- It took me approximately 2 days to complete the task. The time was spent on implementing the core functionality, styling, and testing the application thoroughly.

#### 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

- For this project, I used Vite with React. One of the most useful features of Vite is its fast refresh and build times. This helps to speed up development significantly by providing quick feedback on code changes without the long wait times typical of older bundlers. Vite also has built-in support for features like ES modules, allowing a more modern and efficient build process.

Here’s an example of how Vite is integrated in the project:

```jsx
import { useState, useEffect } from "react";

const Dashboard = () => {
  // State for storing tasks
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div>
      <h1>Task Dashboard</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
```

#### 3. How would you track down a performance issue in production? Have you ever had to do this?

- Tracking performance issues in production involves a few strategies: - **Using performance monitoring tools:** In Vercel, we can use the built-in logs and performance monitoring tools to check for bottlenecks in the app. - **Adding custom logging:** By adding log statements at key points in the application, you can track performance, such as network request times or component render times. - **Profiling tools:** Using tools like React Profiler or Chrome DevTools to inspect rendering behavior and pinpoint slow components or unnecessary re-renders.
  This is my first time deploying a project on Vercel, and I would track performance using Vercel’s dashboard, which provides insights into build times, request handling, and logs for debugging issues in production.

#### 4. If you had more time, what additional features or improvements would you consider adding to the task management application?

- If I had more time, I would like to work on:
  - **Progress bars** for tracking the completion of tasks, which would provide a more visual representation of task statuses.
  - **Verification and validation** system for user input, ensuring that tasks are properly validated before being added (e.g., checking for duplicate tasks, missing fields).
  - Instead of relying on **local storage** to store tasks, I would integrate a **database** (such as Firebase or MongoDB) to store tasks persistently across user sessions. This would allow for better scalability, easier data management, and the ability to support multiple users.
