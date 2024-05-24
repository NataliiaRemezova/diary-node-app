import React, { useState, useEffect } from 'react';
import '../styles/HabitList.css';

const HabitList = ({ habits, onEditHabit, onDeleteHabit, onCheckboxChange }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
      const days = [];
      for (let i = 4; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          days.push(date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }));
      }
      setDates(days);
  }, []);

  return (
      <div className="habit-list w-full">
          <table className="w-full border-collapse">
              <thead>
                  <tr>
                      <th className="border p-2 bg-gray-200">Habit / Date</th>
                      {dates.map((date, index) => (
                          <th key={index} className="border p-2 bg-gray-200">{date}</th>
                      ))}
                      <th className="border p-2 bg-gray-200">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {habits.map(habit => (
                      <tr key={habit._id}>
                          <td className="border p-2">{habit.name}</td>
                          {habit.completions.map((completed, index) => (
                              <td key={index} className="border p-2 text-center">
                                  <input
                                      type="checkbox"
                                      checked={completed}
                                      onChange={() => onCheckboxChange(habit._id, index)}
                                      className="cursor-pointer"
                                  />
                              </td>
                          ))}
                          <td className="border p-2">
                              <button onClick={() => onEditHabit(habit)} className="mr-2 p-2 bg-white border rounded">Edit</button>
                              <button onClick={() => onDeleteHabit(habit._id)} className="p-2 bg-white border rounded">Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default HabitList;
