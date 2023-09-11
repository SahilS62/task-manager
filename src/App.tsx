// App.tsx

import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import Task from './components/Task';

import './styles.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return storedTasks;
  });

  const [originalTasks, setOriginalTasks] = useState<Task[]>(tasks);

  const handleAddTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    setOriginalTasks(updatedTasks); // Update original tasks
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setOriginalTasks(updatedTasks); // Update original tasks
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleFilterTasks = (category: string) => {
    if (category === '') {
      setTasks(originalTasks); // Restore original tasks when no category is selected
    } else {
      const filteredTasks = originalTasks.filter((task) => task.category === category);
      setTasks(filteredTasks);
    }
  };

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <h1>Task Management App</h1>
      <div className="form-container">
        <TaskForm onSubmit={handleAddTask} />
        <TaskFilter onSelectCategory={handleFilterTasks} />
      </div>
      <div className="task-list">
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
};

export default App;
