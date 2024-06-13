import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import HabitList from '../components/HabitList';
import dayjs from 'dayjs';

const HabitPage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [habitForm, setHabitForm] = useState({ name: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentHabitId, setCurrentHabitId] = useState(null);
    const [habits, setHabits] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'));

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
            setHabitForm({ name: '', description: '' });
            setEditMode(false);
            setCurrentHabitId(null);
            onOpenChange(false);
            fetchHabits();
        })
        .catch(err => console.error('Error saving habit:', err));
    };

    const handleEditHabit = (habit) => {
        setHabitForm({ name: habit.name, description: habit.description });
        setEditMode(true);
        setCurrentHabitId(habit._id);
        onOpenChange(true);
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

    const handleCheckboxChange = (habitId, date) => {
        fetch(`http://localhost:5000/api/habit/update-habit-completion/${habitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, completed: true })
        })
        .then(response => response.json())
        .then(() => {
            fetchHabits();
        })
        .catch(err => console.error('Error updating habit:', err));
    };

    const previousWeek = () => {
        setCurrentWeek(currentWeek.subtract(1, 'week'));
    };

    const nextWeek = () => {
        setCurrentWeek(currentWeek.add(1, 'week'));
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-5">
            <header className="mb-5">
                <h1 className="text-2xl font-bold">Habit Tracker</h1>
            </header>
            <main className="w-full">
                <div className="flex justify-between items-center mb-5">
                    <Button onClick={previousWeek}>&lt; Previous Week</Button>
                    <h2>{currentWeek.format('MMM D')} - {currentWeek.endOf('week').format('MMM D')}</h2>
                    <Button onClick={nextWeek}>Next Week &gt;</Button>
                </div>
                <HabitList 
                    habits={habits} 
                    onEditHabit={handleEditHabit} 
                    onDeleteHabit={handleDeleteHabit} 
                    onCheckboxChange={handleCheckboxChange} 
                    currentWeek={currentWeek}
                />
                <Button onPress={onOpen} className="mt-5">Add Habit</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{editMode ? 'Edit Habit' : 'Add Habit'}</ModalHeader>
                                <ModalBody>
                                    <form id="habitForm" onSubmit={handleSubmit} className="flex flex-col items-center">
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Habit name"
                                            value={habitForm.name}
                                            onChange={handleChange}
                                            required
                                            className="mb-3 p-2 w-80 border rounded bg-white"
                                        />
                                        <Input
                                            type="text"
                                            name="description"
                                            placeholder="Description"
                                            value={habitForm.description}
                                            onChange={handleChange}
                                            className="mb-3 p-2 w-80 border rounded bg-white"
                                        />
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" form="habitForm" type="submit">
                                        {editMode ? 'Update Habit' : 'Create Habit'}
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </main>
        </div>
    );
};

export default HabitPage;
