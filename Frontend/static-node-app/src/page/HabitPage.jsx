import React, { useState } from 'react';
import HabitList from "../components/HabitList";
import '../styles/HabitPage.css';

function HabitPage(){
    const [habitForm, setHabitForm] = useState({ name: '', description: '', frequency: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentHabitId, setCurrentHabitId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitForm({ ...habitForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `http://localhost:5000/api/habit/update-habit/${currentHabitId}` : 'http://localhost:5000/api/habit/create-habit';
        const method = editMode ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitForm)
        })
        .then(response => response.json())
        .then(() => {
            setHabitForm({ name: '', description: '', frequency: '' });
            setEditMode(false);
            setCurrentHabitId(null);
        })
        .catch(err => console.error('Error saving habit:', err));
    };

    const handleEditHabit = (habit) => {
        setHabitForm({ name: habit.name, description: habit.description, frequency: habit.frequency });
        setEditMode(true);
        setCurrentHabitId(habit._id);
    };

    const handleDeleteHabit = (id) => {
        fetch(`http://localhost:5000/api/habit/delete-habit/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setHabitForm({ name: '', description: '', frequency: '' });
        })
        .catch(err => console.error('Error deleting habit:', err));
    };

    return (
        <div className="habit-page">
            <header className="habit-header">
                <h1>Habit Tracker</h1>
            </header>
            <main className="habit-main">
                <form onSubmit={handleSubmit} className="habit-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Habit name"
                        value={habitForm.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={habitForm.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="frequency"
                        placeholder="Frequency"
                        value={habitForm.frequency}
                        onChange={handleChange}
                    />
                    <button type="submit">{editMode ? 'Update Habit' : 'Create Habit'}</button>
                </form>
                <HabitList onEditHabit={handleEditHabit} onDeleteHabit={handleDeleteHabit} />
            </main>
        </div>
    );
};

export default HabitPage;
