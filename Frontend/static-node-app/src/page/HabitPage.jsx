import React, { useState, useEffect } from 'react';
import { Button, Calendar } from "@nextui-org/react";
import {parseDate} from '@internationalized/date';
import { RangeCalendar } from '@nextui-org/react';
import {today, getLocalTimeZone} from '@internationalized/date';
import HabitList from '../components/HabitList';

const HabitPage = () => {
    const [habitForm, setHabitForm] = useState({ name: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentHabitId, setCurrentHabitId] = useState(null);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = () => {
        fetch('http://localhost:5000/api/habit/get-all-habits',
            {method: 'GET',
                credentials: 'include'
            })
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
            credentials: 'include',
            body: JSON.stringify(habitForm)
        })
        .then(response => response.json())
        .then(() => {
            setHabitForm({ name: '', description: '' });
            setEditMode(false);
            setCurrentHabitId(null);
            fetchHabits();
        })
        .catch(err => console.error('Error saving habit:', err));
    };

    const handleEditHabit = (habit) => {
        setHabitForm({ name: habit.name, description: habit.description });
        setEditMode(true);
        setCurrentHabitId(habit._id);
    };

    const handleDeleteHabit = (id) => {
        fetch(`http://localhost:5000/api/habit/delete-habit/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(() => {
            fetchHabits();
        })
        .catch(err => console.error('Error deleting habit:', err));
    };

    const handleCheckboxChange = (habitId, date) => {
        fetch(`http://localhost:5000/api/habit/update-habit-completion/${habitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify({ date, completed: !habit.completions.some(c => c.date === date && c.completed) })
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
                <RangeCalendar
                    aria-label="Date (Uncontrolled)"
                    defaultValue={{
                    start: today(getLocalTimeZone()),
                    end: today(getLocalTimeZone()).add({weeks: 1}),
                    }}
                />
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
                    <Button type="submit" color="primary" className="w-80 bg-white text-black">
                        {editMode ? 'Update Habit' : 'Create Habit'}
                    </Button>
                </form>
                <HabitList 
                    habits={habits} 
                    onEditHabit={handleEditHabit} 
                    onDeleteHabit={handleDeleteHabit} 
                    onCheckboxChange={handleCheckboxChange} 
                />
            </main>
        </div>
    );
};

export default HabitPage;
