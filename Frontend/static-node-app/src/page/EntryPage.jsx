import Entry from "../components/Entry.jsx";
import { Calendar } from "@nextui-org/calendar";
import { useState, useEffect } from 'react';
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { Button } from "@nextui-org/react";
import { RiArrowRightSFill, RiArrowLeftSFill } from "react-icons/ri";
import "../styles/EntryPage.css";

function EntryPage() {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const [entries, setEntries] = useState([]);
    const [entryTextfield, setEntryTextfield] = useState('');
    const [entryToEdit, setEntryToEdit] = useState(null);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [selectedDate, setSelectedDate] = useState(parseDate(formattedDate));

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/entry/get-entries', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Einträge');
                }
                const data = await response.json();
                setEntries(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Einträge:', error);
            }
        };

        fetchEntries();
        console.log('Entry successfully');
    }, []);

    const addEntry = (newEntryText) => {
        fetch('http://localhost:5000/api/entry/create-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newEntryText, date: new Date(selectedDate).toISOString() }),
            credentials: 'include', // Wichtig für das Senden von Cookies
        })
            .then(response => response.json())
            .then(data => {
                setEntries([...entries, data]);
                setEntryToEdit(data._id);
            })
            .catch(error => console.error('Error adding entry:', error));
    };

    const setupEditEntry = (id, text) => {
        setEntryToEdit(id);
        setEntryTextfield(text);
    };

    const setupNewEntry = () => {
        setEntryToEdit(null);
        setEntryTextfield('');
    };

    const editEntry = (newEntryText) => {
        fetch(`http://localhost:5000/api/entry/update-entry/${entryToEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newEntryText, date: new Date(selectedDate).toISOString() }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setEntries(entries.map(entry => {
                    if (entry._id === entryToEdit) {
                        return { ...entry, text: newEntryText, date: new Date(selectedDate).toISOString() };
                    }
                    return entry;
                }));
            })
            .catch(error => console.error('Error updating entry:', error));
    };

    const deleteEntry = (id) => {
        setEntryToDelete(id);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:5000/api/entry/delete-entry/${entryToDelete}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(() => {
                setEntries(entries.filter(entry => entry._id !== entryToDelete));
                setEntryToDelete(null);
                setupNewEntry();
            })
            .catch(error => console.error('Error deleting entry:', error));
    };

    const cancelDelete = () => {
        setEntryToDelete(null);
    };

    const findEntryByDate = (newDate) => {
        setSelectedDate(() => {
            const thisDate = new Date(newDate).toISOString();
            for (const entry of entries) {
                if (entry.date === thisDate) {
                    setupEditEntry(entry._id, entry.text);
                    return newDate;
                }
            }
            setupNewEntry();
            return newDate;
        });
    };

    const changeToNextDay = () => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + 1);

        const selectedYear = selectedDate.year;
        const selectedMonth = selectedDate.month;
        const selectedDay = currentDate.getDate();

        const currentMonth = String(selectedMonth).padStart(2, '0');
        const nextDay = String(selectedDay).padStart(2, '0');

        const newSelectedDate = `${selectedYear}-${currentMonth}-${nextDay}`;

        findEntryByDate(newSelectedDate);

        const today = new Date();
        const nextDate = new Date(newSelectedDate);

        if (nextDate > today) {
            setSelectedDate(selectedDate);
        } else {
            setSelectedDate(parseDate(newSelectedDate));
        }
    };

    const changeToPreviousDay = () => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() - 1);

        const selectedYear = selectedDate.year;
        const selectedMonth = selectedDate.month;
        const selectedDay = currentDate.getDate();

        const currentMonth = String(selectedMonth).padStart(2, '0');
        const previousDay = String(selectedDay).padStart(2, '0');

        const newSelectedDate = `${selectedYear}-${currentMonth}-${previousDay}`;

        findEntryByDate(newSelectedDate);

        setSelectedDate(parseDate(newSelectedDate));
    };

    return (
        <div>
            <div className="flexContainer">
                <div>
                    <Calendar
                        aria-label="Date (Controlled)"
                        value={selectedDate}
                        onChange={findEntryByDate}
                        maxValue={today(getLocalTimeZone())}
                    />
                </div>
                <div className="entry">
                    <Entry
                        addEntry={addEntry}
                        entryTextfield={entryTextfield}
                        setEntryTextfield={setEntryTextfield}
                        selectedDate={selectedDate}
                        entryToEdit={entryToEdit}
                        editEntry={editEntry}
                        deleteEntry={deleteEntry}
                        confirmDelete={confirmDelete}
                        cancelDelete={cancelDelete}
                        entryToDelete={entryToDelete}
                    />
                    <Button isIconOnly aria-label="Next" className="arrowButton" onClick={changeToPreviousDay} style={{ backgroundColor: "#5faf4fb0", color: "#424b35c9" }}>
                        <RiArrowLeftSFill />
                    </Button>
                    <Button isIconOnly aria-label="Previous" className="arrowButton" onClick={changeToNextDay} style={{ backgroundColor: "#5faf4fb0", color: "#424b35c9" }}>
                        <RiArrowRightSFill />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EntryPage;
