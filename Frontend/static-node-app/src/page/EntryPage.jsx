import Entry from "../components/Entry.jsx";
import ListOfEntries from "../components/ListOfEntries.jsx";
import {Calendar} from "@nextui-org/calendar";
import { useState, useEffect } from 'react';
import {parseDate} from "@internationalized/date";

function EntryPage(){

    function formatDate(date) {
        // Extract the year, month, and day from the date object
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days with a leading zero
    
        // Format the date as "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    }
    
    // Get the current date
    const currentDate = new Date();
    
    // Convert the current date to the "YYYY-MM-DD" format
    const formattedDate = formatDate(currentDate);

    
    const [entries, setEntries] = useState([]);
    const [entryTextfield, setEntryTextfield] = useState('');
    const [entryToEdit, setEntryToEdit] = useState(null);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [selectedDate, setSelectedDate] = useState(parseDate(formattedDate));

    useEffect(() => {
        fetch('http://localhost:5000/api/entry/get-entries')
            .then(response => response.json())
            .then(data => setEntries(data))
            .catch(error => console.error('Error fetching entries:', error));
    }, []);

    const addEntry = (newEntryText) => {
        fetch('http://localhost:5000/api/entry/create-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newEntryText, date: new Date(selectedDate).toISOString() })
        })
            .then(response => response.json())
            .then(data => setEntries([...entries, data]))
            .then(() => {
                setEntryToEdit(null);
            })
            .catch(error => console.error('Error adding entry:', error));
    };

    const setupEditEntry = (id, text, date) => {
        setEntryToEdit(id);
        setEntryTextfield(text);
        setEntryDate(date);
    };

    const editEntry = (newEntryText) => {
        fetch(`http://localhost:5000/api/entry/update-entry/${entryToEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: newEntryText, date: new Date(selectedDate).toISOString() })
        })
            .then(response => response.json())
            .then((data) => {
                // if entry is entryToEdit --> change its text
                setEntries(entries.map(entry => {
                    if (entry._id === entryToEdit) {
                        return { ...entry, text: newEntryText, date: new Date(selectedDate).toISOString() };
                    }
                    return entry;
                }));
                setEntryToEdit(null);
            })
            .catch(error => console.error('Error updating entry:', error));
    };

    const deleteEntry = (id) => {
        setEntryToDelete(id);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:5000/api/entry/delete-entry/${entryToDelete}`, {
            method: 'DELETE'
        })
            .then(() => {
                setEntries(entries.filter(entry => entry._id !== entryToDelete));
                setEntryToDelete(null);
            })
            .catch(error => console.error('Error deleting entry:', error));
    };

    const cancelDelete = () => {
        setEntryToDelete(null);
    };
    return(
        <div>
            <h1 className="text-3xl font-bold underline">Diary app</h1>
            <div>
                <Calendar 
                    aria-label="Date (Controlled)" 
                    value={selectedDate} 
                    onChange={setSelectedDate} 
                />
                <Entry addEntry={addEntry} entryTextfield={entryTextfield} setEntryTextfield={setEntryTextfield} selectedDate={selectedDate} entryToEdit={entryToEdit} editEntry={editEntry}/>
                <ListOfEntries entries={entries} setupEditEntry={setupEditEntry} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete} />
            </div>
        </div>
    );
}

export default EntryPage