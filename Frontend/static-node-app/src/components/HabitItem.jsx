import React from 'react';

function HabitItem({ habit, onDelete, onToggleComplete }) {
  return (
    <li>
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <p>{habit.frequency}</p>
      <button onClick={() => onToggleComplete(habit._id, habit.completed)}>
        {habit.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button onClick={() => onDelete(habit._id)}>Delete</button>
    </li>
  );
}

export default HabitItem;
