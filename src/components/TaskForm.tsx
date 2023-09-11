import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import categories from '../categories';
import Task from './Task';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = zod.object({
  title: zod.string().min(3).max(50),
  dueDate: zod.string(),
  category: zod.enum(categories),
});

type TaskFormData = zod.infer<typeof schema>;

interface TaskFormProps {
  onSubmit: (data: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = (data: TaskFormData) => {
    const dueDate = new Date(data.dueDate);

    if (isNaN(dueDate.getTime())) {
      setErrorMessage('Invalid due date. Please enter a valid date in yyyy-mm-dd format.');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      ...data,
      dueDate: dueDate,
    };

    onSubmit(newTask);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Title</label>
        <input type="text" {...register('title')} />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" {...register('dueDate')} />
        {errors.dueDate && <span className="error">{errors.dueDate.message}</span>}
        {errorMessage && <span className="error">{errorMessage}</span>}
      </div>
      <div>
        <label>Category</label>
        <select {...register('category')}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <span className="error">{errors.category.message}</span>}
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
