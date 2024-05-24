import React, { useEffect, useState } from 'react';
import { Checkbox } from "@nextui-org/react";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const HabitList = ({ habits, onEditHabit, onDeleteHabit, onCheckboxChange }) => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
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
                        <tr key={habit._id} className="bg-white">
                            <td className="border p-2">
                                <Popover placement="right">
                                    <PopoverTrigger>
                                        <button className="text-blue-500 underline bg-white">{habit.name}</button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="p-2">
                                            <div className="font-bold">{habit.name}</div>
                                            <div>{habit.description}</div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </td>
                            {habit.completions.map((completed, index) => (
                                <td key={index} className="border p-2 text-center">
                                    <Checkbox
                                        isSelected={completed}
                                        onChange={() => onCheckboxChange(habit._id, index)}
                                    />
                                </td>
                            ))}
                            <td className="border p-2">
                                <Button onClick={() => onEditHabit(habit)} className="mr-2 bg-white text-black">Edit</Button>
                                <Popover placement="right">
                                    <PopoverTrigger>
                                        <Button className="bg-white text-black">Delete</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="p-2">
                                            <div className="font-bold">Are you sure?</div>
                                            <Button onClick={() => onDeleteHabit(habit._id)} className="bg-red-500 text-white mt-2">Confirm</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HabitList;
