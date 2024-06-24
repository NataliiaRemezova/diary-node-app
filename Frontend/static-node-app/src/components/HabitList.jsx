import React, { useEffect, useState } from 'react';
import { Checkbox, Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const HabitList = ({ habits, onEditHabit, onDeleteHabit, onCheckboxChange, currentWeek }) => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const start = currentWeek.startOf('week');
        const end = currentWeek.endOf('week');
        const days = [];
        let currentDate = start;
        while (currentDate <= end) {
            days.push(currentDate.toDate());
            currentDate = currentDate.add(1, 'day');
        }
        setDates(days);
    }, [currentWeek]);

    const isDateInRange = (date, startDate, endDate) => {
        return dayjs(date).isSameOrAfter(dayjs(startDate), 'day') && dayjs(date).isSameOrBefore(dayjs(endDate), 'day');
    };

    const handleCheckboxChange = (habitId, date, checked) => {
        onCheckboxChange(habitId, date, checked);
    };

    return (
        <div className="habit-list w-full">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-200">Habit / Date</th>
                        {dates.map((date, index) => (
                            <th key={index} className="border p-2 bg-gray-200">{dayjs(date).format('ddd D')}</th>
                        ))}
                        <th className="border p-2 bg-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => (
                        <tr key={habit._id}>
                            <td className="border p-2 bg-white">
                                <Popover>
                                    <PopoverTrigger>
                                        <span className="cursor-pointer">{habit.name}</span>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div>
                                            <p>{habit.description}</p>
                                            <p>Start Date: {dayjs(habit.startDate).format('MMM D, YYYY')}</p>
                                            <p>End Date: {dayjs(habit.endDate).format('MMM D, YYYY')}</p>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </td>
                            {dates.map((date, index) => {
                                const completion = habit.completions.find(c => dayjs(c.date).isSame(date, 'day'));
                                const isChecked = completion ? completion.completed : false;
                                const isDisabled = !isDateInRange(date, habit.startDate, habit.endDate);
                                return (
                                    <td key={index} className="border p-2 bg-white">
                                        <Checkbox
                                            isSelected={isChecked}
                                            isDisabled={isDisabled}
                                            onChange={(e) => handleCheckboxChange(habit._id, date, e.target.checked)}
                                        />
                                    </td>
                                );
                            })}
                            <td className="border p-2 bg-white">
                                <Button color="default" onPress={() => onEditHabit(habit)}>Edit</Button>
                                <Popover placement="top">
                                    <PopoverTrigger>
                                        <Button color="default">Delete</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="p-2">
                                            <p>Are you sure you want to delete this habit?</p>
                                            <Button 
                                                style={{ backgroundColor: '#d9534f', color: '#fff' }} 
                                                onPress={() => onDeleteHabit(habit._id)}>
                                                Confirm
                                            </Button>
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
