import React, { useState, useEffect } from 'react';
import HabitList from "../components/HabitList";
import '../styles/HabitPage.css';

const HabitPage = () => {
    const [habitForm, setHabitForm] = useState({ name: '', description: '', frequency: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentHabitId, setCurrentHabitId] = useState(null);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = () => {
        fetch('http://localhost:5000/api/habit/get-all-habits')
            .then(response => response.json())
            .then(data => setHabits(data))
            .catch(err => console.error('Error fetching habits:', err));
    };

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
            fetchHabits();
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
            fetchHabits();
        })
        .catch(err => console.error('Error deleting habit:', err));
    };

    const handleCheckboxChange = (habitId, index) => {
        fetch(`http://localhost:5000/api/habit/update-habit-completion/${habitId}/${index}`, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(() => {
            fetchHabits();
        })
        .catch(err => console.error('Error updating habit:', err));
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-5">
            <header className="mb-5">
                <h1 className="text-2xl font-bold">Habit Tracker</h1>
            </header>
            <main className="w-full">
                <form onSubmit={handleSubmit} className="flex flex-col items-center mb-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Habit name"
                        value={habitForm.name}
                        onChange={handleChange}
                        required
                        className="mb-3 p-2 w-80 border rounded bg-white"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={habitForm.description}
                        onChange={handleChange}
                        className="mb-3 p-2 w-80 border rounded bg-white"
                    />
                    <input
                        type="text"
                        name="frequency"
                        placeholder="Frequency"
                        value={habitForm.frequency}
                        onChange={handleChange}
                        className="mb-3 p-2 w-80 border rounded bg-white"
                    />
                    <button type="submit" className="p-2 w-80 bg-blue-500 text-white rounded">
                        {editMode ? 'Update Habit' : 'Create Habit'}
                    </button>
                </form>
                <HabitList habits={habits} onEditHabit={handleEditHabit} onDeleteHabit={handleDeleteHabit} onCheckboxChange={handleCheckboxChange} />
            </main>
        </div>
    );
};

export default HabitPage;
