import { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    useDisclosure,
    Spacer
} from "@nextui-org/react";
import HabitList from '../components/HabitList';
import dayjs from 'dayjs';
import '../styles/Habit.css';

const HabitPage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [habitForm, setHabitForm] = useState({ name: '', description: '', startDate: '', endDate: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentHabitId, setCurrentHabitId] = useState(null);
    const [habits, setHabits] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'));

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = () => {
        fetch('http://localhost:5000/api/habit/get-all-habits', {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setHabits(data);
                } else {
                    setHabits([]);
                }
            })
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
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(habitForm)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            setHabitForm({ name: '', description: '', startDate: '', endDate: '' });
            setEditMode(false);
            setCurrentHabitId(null);
            onOpenChange(false);
            fetchHabits();
        })
        .catch(err => console.error('Error saving habit:', err));
    };

    const handleEditHabit = (habit) => {
        setHabitForm({ 
            name: habit.name, 
            description: habit.description, 
            startDate: dayjs(habit.startDate).format('YYYY-MM-DD'), 
            endDate: dayjs(habit.endDate).format('YYYY-MM-DD') 
        });
        setEditMode(true);
        setCurrentHabitId(habit._id);
        onOpenChange(true);
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

    const handleCheckboxChange = (habitId, date, checked) => {
        fetch(`http://localhost:5000/api/habit/update-habit-completion/${habitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ date, completed: checked })
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
                <h1 className="habitHeader">Habit Tracker</h1>
            </header>
            <main className="w-full">
                <div className="flex justify-between items-center mb-5">
                    <Button onClick={previousWeek} className="habitButton">&lt; Previous Week</Button>
                    <h2>{currentWeek.format('MMM D')} - {currentWeek.endOf('week').format('MMM D')}</h2>
                    <Button onClick={nextWeek} className="habitButton">Next Week &gt;</Button>
                </div>
                <HabitList 
                    habits={habits} 
                    onEditHabit={handleEditHabit} 
                    onDeleteHabit={handleDeleteHabit} 
                    onCheckboxChange={handleCheckboxChange} 
                    currentWeek={currentWeek}
                />
                <Spacer y={8}/>
                <Button onPress={onOpen} className="mt-5 habitButton">Add Habit</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
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
                                            className="mb-3 p-2 w-80  rounded "
                                        />
                                        <Input
                                            type="text"
                                            name="description"
                                            placeholder="Description"
                                            value={habitForm.description}
                                            onChange={handleChange}
                                            className="mb-3 p-2 w-80  rounded "
                                        />
                                        <Input
                                            type="date"
                                            name="startDate"
                                            placeholder="Start Date"
                                            value={habitForm.startDate}
                                            onChange={handleChange}
                                            required
                                            className="mb-3 p-2 w-80  rounded"
                                        />
                                        <Input
                                            type="date"
                                            name="endDate"
                                            placeholder="End Date"
                                            value={habitForm.endDate}
                                            onChange={handleChange}
                                            required
                                            className="mb-3 p-2 w-80  rounded "
                                        />
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose} className="habitButton">
                                        Close
                                    </Button>
                                    <Button form="habitForm" type="submit" className="habitButton">
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
