import React from 'react';
import Task from './Task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Due Date</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{formatDate(task.dueDate)}</td>
            <td>{task.category}</td>
            <td>
              <button  className="button" onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function formatDate(date: Date | string | undefined): string {
  if (!date) {
    return "Invalid Date";
  }

  const formattedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(formattedDate.getTime())) {
    return "Invalid Date"; 
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return formattedDate.toLocaleDateString(undefined, options);
}



export default TaskList;
