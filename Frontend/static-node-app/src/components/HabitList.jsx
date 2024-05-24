import React, { useState, useEffect } from 'react';
import '../styles/HabitList.css';

const HabitList = ({ onEditHabit, onDeleteHabit }) => {
    const [habits, setHabits] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/habit/get-all-habits')
            .then(response => response.json())
            .then(data => setHabits(data))
            .catch(err => console.error('Error fetching habits:', err));
        
        const days = [];
        for (let i = 4; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }));
        }
        setDates(days);
    }, []);

    const handleCheckboxChange = (habitId, index) => {
        fetch(`http://localhost:5000/api/habit/update-habit-completion/${habitId}/${index}`, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(data => {
            setHabits(habits.map(habit => habit._id === data._id ? data : habit));
        })
        .catch(err => console.error('Error updating habit:', err));
    };

    return (
        <div className="habit-list">
            <div className="dates-row">
                <div className="habit-name">Habit / Date</div>
                {dates.map((date, index) => (
                    <div key={index} className="date-header">{date}</div>
                ))}
                <div className="actions-header">Actions</div>
            </div>
            {habits.map(habit => (
                <div key={habit._id} className="habit-row">
                    <div className="habit-name">{habit.name}</div>
                    {habit.completions.map((completed, index) => (
                        <div key={index} className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={() => handleCheckboxChange(habit._id, index)}
                            />
                        </div>
                    ))}
                    <div className="actions-container">
                        <button onClick={() => onEditHabit(habit)}>Edit</button>
                        <button onClick={() => onDeleteHabit(habit._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HabitList;
