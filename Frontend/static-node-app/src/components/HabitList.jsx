import React, { useEffect, useState } from 'react';
import { fetchAllHabits, deleteHabit, updateHabit } from '../api/habits';
import HabitItem from './HabitItem';
import AddHabit from './AddHabit';

function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const getHabits = async () => {
      const habitsFromServer = await fetchAllHabits();
      setHabits(habitsFromServer);
    };
    getHabits();
  }, []);

  const handleDelete = async (id) => {
    await deleteHabit(id);
    setHabits(habits.filter((habit) => habit._id !== id));
  };

  const handleToggleComplete = async (id, completed) => {
    const updatedHabit = habits.find((habit) => habit._id === id);
    updatedHabit.completed = !completed;
    await updateHabit(id, updatedHabit);
    setHabits(habits.map((habit) => (habit._id === id ? updatedHabit : habit)));
  };

  return (
    <div>
      <h2>Your Habits</h2>
      <AddHabit setHabits={setHabits} />
      <ul>
        {habits.map((habit) => (
          <HabitItem
            key={habit._id}
            habit={habit}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
