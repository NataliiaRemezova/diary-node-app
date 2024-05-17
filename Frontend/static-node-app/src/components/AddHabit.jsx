import React, { useState } from 'react';
import { createHabit } from '../api/habits';

function AddHabit({ setHabits }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHabit = { name, description, frequency };
    const createdHabit = await createHabit(newHabit);
    setHabits((prevHabits) => [...prevHabits, createdHabit]);
    setName('');
    setDescription('');
    setFrequency('');
  };

  return (
    <div>
      <h2>Add a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Frequency</label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
}

export default AddHabit;
