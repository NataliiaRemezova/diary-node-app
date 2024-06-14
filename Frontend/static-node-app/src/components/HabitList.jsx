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
                    {habits.map(habit => {
                        const habitInRange = dates.some(date => isDateInRange(date, habit.startDate, habit.endDate));
                        if (!habitInRange) return null;

                        return (
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
                                                <div>Start Date: {dayjs(habit.startDate).format('YYYY-MM-DD')}</div>
                                                <div>End Date: {dayjs(habit.endDate).format('YYYY-MM-DD')}</div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                                {dates.map((date, index) => {
                                    const completion = habit.completions.find(c => dayjs(c.date).isSame(date, 'day'));
                                    const isInRange = isDateInRange(date, habit.startDate, habit.endDate);
                                    return (
                                        <td key={index} className="border p-2 text-center">
                                            <Checkbox
                                                isSelected={completion ? completion.completed : false}
                                                isDisabled={!isInRange}
                                                onChange={(e) => handleCheckboxChange(habit._id, date, e.target.checked)}
                                            />
                                        </td>
                                    );
                                })}
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
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HabitList;
