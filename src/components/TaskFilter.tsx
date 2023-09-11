import React from 'react';
import categories from '../categories';

interface TaskFilterProps {
  onSelectCategory: (category: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onSelectCategory }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCategory(event.target.value);
  };

  return (
    <div>
      <label>Filter by Category:</label>
      <select onChange={handleChange}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
